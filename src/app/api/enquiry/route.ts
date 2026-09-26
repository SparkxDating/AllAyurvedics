import { enquirySchema, fieldErrors, looksLikeSpam, orderSchema, type OrderInput } from "@/lib/validation";
import { getStore, type EnquiryRecord } from "@/lib/server/store";
import { getMailer } from "@/lib/server/email";
import { json, readBody } from "@/lib/server/respond";
import { getBuyMode, getProduct } from "@/content/products";

async function deliver(record: EnquiryRecord) {
  const store = getStore();
  const mailer = getMailer();
  await Promise.all([store.saveEnquiry(record), mailer.notifyEnquiry(record)]);
  return store.configured || mailer.transactional;
}

/** Build the stored/emailed record for a UPI order. The amount is recalculated on the server. */
function orderRecord(data: OrderInput, productName: string, unitPrice: number): EnquiryRecord {
  const amount = (unitPrice * data.quantity).toFixed(2);
  const message = [
    `UPI ORDER ${data.orderRef}`,
    `Product: ${productName} (${data.product})`,
    `Quantity: ${data.quantity} × ₹${unitPrice} = ₹${amount}`,
    `UPI transaction ID / UTR: ${data.utr}  (verify this payment in your bank/UPI app before shipping)`,
    "",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email || "-"}`,
    "Delivery address:",
    data.address,
    `${data.city}, ${data.state} – ${data.pincode}`,
  ].join("\n");
  return {
    name: data.name,
    email: data.email || "",
    phone: data.phone,
    subject: "order",
    message,
    product: `${productName} ×${data.quantity} – ${data.orderRef}`.slice(0, 200),
    locale: data.locale,
  };
}

export async function POST(request: Request) {
  const body = await readBody(request);
  if (!body) return json({ ok: false, error: "bad_request" }, 400);

  if (body.type === "order") {
    const parsed = orderSchema.safeParse(body);
    if (!parsed.success) return json({ ok: false, errors: fieldErrors(parsed.error) }, 422);
    const data = parsed.data;
    if (looksLikeSpam(data)) return json({ ok: true, status: "sent", orderRef: data.orderRef });
    const product = getProduct(data.product);
    if (!product || !product.price || getBuyMode(product).kind !== "upi") {
      return json({ ok: false, error: "not_available" }, 400);
    }
    try {
      const delivered = await deliver(orderRecord(data, product.en.name, product.price));
      return json({ ok: true, status: delivered ? "sent" : "pending", orderRef: data.orderRef });
    } catch (err) {
      console.error("[order] failed", err);
      return json({ ok: false, error: "server_error" }, 500);
    }
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) return json({ ok: false, errors: fieldErrors(parsed.error) }, 422);

  const data = parsed.data;
  // Silently accept spam so bots don't learn anything.
  if (looksLikeSpam(data)) return json({ ok: true, status: "sent" });

  try {
    const delivered = await deliver({
      name: data.name,
      email: data.email,
      phone: data.phone || undefined,
      subject: data.subject,
      message: data.message,
      product: data.product || undefined,
      locale: data.locale,
    });
    return json({ ok: true, status: delivered ? "sent" : "pending" });
  } catch (err) {
    console.error("[enquiry] failed", err);
    return json({ ok: false, error: "server_error" }, 500);
  }
}
