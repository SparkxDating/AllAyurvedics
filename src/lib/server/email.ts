import "server-only";
import { serverConfig } from "./config";
import type { EnquiryRecord, SubscriberRecord } from "./store";

/**
 * Email adapter. Supports Resend or Brevo via plain HTTPS calls (no SDK needed).
 * - Transactional mail (enquiry notification, welcome email): RESEND_API_KEY or BREVO_API_KEY + EMAIL_FROM
 * - Marketing list (newsletter contacts): BREVO_API_KEY + BREVO_LIST_ID, or RESEND_API_KEY (+ optional RESEND_SEGMENT_ID)
 */
export interface Mailer {
  readonly transactional: boolean;
  readonly marketing: boolean;
  notifyEnquiry(e: EnquiryRecord): Promise<void>;
  addToList(s: SubscriberRecord): Promise<void>;
  sendWelcome(s: SubscriberRecord): Promise<void>;
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

async function sendMail(to: string, subject: string, html: string, replyTo?: string) {
  const { resendApiKey, brevoApiKey, emailFrom } = serverConfig;
  if (!emailFrom) return;
  if (resendApiKey) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendApiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: emailFrom, to: [to], subject, html, ...(replyTo ? { reply_to: replyTo } : {}) }),
    });
    if (!res.ok) throw new Error(`Resend error ${res.status}`);
    return;
  }
  if (brevoApiKey) {
    const match = emailFrom.match(/^(.*)<(.+)>$/);
    const sender = match ? { name: match[1].trim(), email: match[2].trim() } : { email: emailFrom };
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": brevoApiKey, "Content-Type": "application/json", accept: "application/json" },
      body: JSON.stringify({ sender, to: [{ email: to }], subject, htmlContent: html, ...(replyTo ? { replyTo: { email: replyTo } } : {}) }),
    });
    if (!res.ok) throw new Error(`Brevo error ${res.status}`);
  }
}

export function getMailer(): Mailer {
  const { resendApiKey, brevoApiKey, brevoListId, resendSegmentId, emailFrom, enquiryToEmail } = serverConfig;
  const transactional = Boolean((resendApiKey || brevoApiKey) && emailFrom);
  const marketing = Boolean((brevoApiKey && brevoListId) || resendApiKey);

  return {
    transactional,
    marketing,
    async notifyEnquiry(e) {
      if (!transactional || !enquiryToEmail) return;
      const rows = [
        ["Name", e.name],
        ["Email", e.email],
        ["Phone", e.phone || "-"],
        ["Subject", e.subject],
        ["Product", e.product || "-"],
        ["Language", e.locale],
      ]
        .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#555">${k}</td><td>${escapeHtml(v)}</td></tr>`)
        .join("");
      await sendMail(
        enquiryToEmail,
        `New enquiry: ${e.subject}${e.product ? ` – ${e.product}` : ""}`,
        `<h2>New website enquiry</h2><table>${rows}</table><p style="white-space:pre-wrap">${escapeHtml(e.message)}</p>`,
        e.email
      );
    },
    async addToList(s) {
      if (brevoApiKey && brevoListId) {
        const res = await fetch("https://api.brevo.com/v3/contacts", {
          method: "POST",
          headers: { "api-key": brevoApiKey, "Content-Type": "application/json", accept: "application/json" },
          body: JSON.stringify({
            email: s.email,
            attributes: { FIRSTNAME: s.name || undefined, SOURCE: s.source, LANGUAGE: s.locale },
            listIds: [brevoListId],
            updateEnabled: true,
          }),
        });
        if (!res.ok && res.status !== 204) throw new Error(`Brevo contacts error ${res.status}`);
        return;
      }
      if (resendApiKey) {
        const res = await fetch("https://api.resend.com/contacts", {
          method: "POST",
          headers: { Authorization: `Bearer ${resendApiKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            email: s.email,
            first_name: s.name || undefined,
            unsubscribed: false,
            ...(resendSegmentId ? { segments: [{ id: resendSegmentId }] } : {}),
          }),
        });
        // 409/422 usually means the contact already exists — treat as success.
        if (!res.ok && res.status !== 409 && res.status !== 422) throw new Error(`Resend contacts error ${res.status}`);
      }
    },
    async sendWelcome(s) {
      if (!transactional) return;
      const hi = s.locale === "hi";
      await sendMail(
        s.email,
        hi ? "ऑल आयुर्वेदिक्स में आपका स्वागत है" : "Welcome to All Ayurvedics",
        hi
          ? `<p>नमस्ते${s.name ? ` ${escapeHtml(s.name)}` : ""},</p><p>ऑल आयुर्वेदिक्स न्यूज़लेटर की सदस्यता लेने के लिए धन्यवाद। हर हफ़्ते हम आपको एक मौसमी सुझाव, एक नुस्खा और एक आसान आदत भेजेंगे।</p><p>— ऑल आयुर्वेदिक्स</p>`
          : `<p>Namaste${s.name ? ` ${escapeHtml(s.name)}` : ""},</p><p>Thank you for subscribing to the All Ayurvedics newsletter. Each week we'll send you one seasonal tip, one remedy and one simple habit.</p><p>— All Ayurvedics</p>`
      );
    },
  };
}
