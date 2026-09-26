/** WhatsApp click-to-chat helpers (no API, just wa.me links). */

export function waLink(number: string, text?: string) {
  const n = number.replace(/\D/g, "");
  return text ? `https://wa.me/${n}?text=${encodeURIComponent(text)}` : `https://wa.me/${n}`;
}

/** "919560814623" → "+91 95608 14623" */
export function formatWhatsappDisplay(number: string) {
  const n = number.replace(/\D/g, "");
  if (n.length === 12 && n.startsWith("91")) return `+91 ${n.slice(2, 7)} ${n.slice(7)}`;
  return `+${n}`;
}

export function fillTemplate(template: string, values: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => values[k] ?? "");
}

export type OrderMessageLabels = {
  heading: string;
  ref: string;
  product: string;
  quantity: string;
  total: string;
  utr: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  source: string;
  screenshot: string;
};

export type OrderMessageData = {
  orderRef: string;
  product: string;
  quantity: number;
  total: string;
  utr: string;
  name: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  /** Campaign source (utm_*), shown as a "Source" line when present */
  source?: string;
};

/** Plain-text order message, built on the client from the form data (works even if the server submit failed). */
export function buildOrderWhatsappMessage(l: OrderMessageLabels, d: OrderMessageData) {
  const address = [d.address.replace(/\s*\n\s*/g, ", ").trim(), d.city.trim(), `${d.state.trim()} – ${d.pincode.trim()}`]
    .filter(Boolean)
    .join(", ");
  const lines = [
    `*${l.heading}*`,
    `${l.ref}: ${d.orderRef}`,
    `${l.product}: ${d.product}`,
    `${l.quantity}: ${d.quantity}`,
    `${l.total}: ${d.total}`,
    `${l.utr}: ${d.utr}`,
    "",
    `${l.name}: ${d.name.trim()}`,
    `${l.phone}: ${d.phone}`,
    ...(d.email?.trim() ? [`${l.email}: ${d.email.trim()}`] : []),
    `${l.address}: ${address}`,
    ...(d.source ? [`${l.source}: ${d.source}`] : []),
    "",
    l.screenshot,
  ];
  return lines.join("\n");
}

/** Button colours: WhatsApp-style green with enough contrast for white text */
export const whatsappButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-[#15803d] font-medium text-white shadow-sm transition-colors hover:bg-[#166534] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#15803d]/40";
