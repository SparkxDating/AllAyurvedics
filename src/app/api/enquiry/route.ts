import { enquirySchema, fieldErrors, looksLikeSpam, orderSchema, type OrderInput } from "@/lib/validation";
import { getStore, type EnquiryRecord } from "@/lib/server/store";
import { getMailer } from "@/lib/server/email";
import { json, readBody } from "@/lib/server/respond";
import { apiError, beginApi, enforceLimits, internalError, isApiResponse } from "@/lib/server/api";
import { logEvent } from "@/lib/server/log";
import { LIMITS } from "@/lib/server/rate-limit";
import { getBuyMode, getProduct } from "@/content/products";

async function deliver(record: EnquiryRecord) {
  const store = getStore();
  const mailer = getMailer();
  await Promise.all([store.saveEnquiry(record), mailer.notifyEnquiry(record)]);
  return store.configured || mailer.transactional;
}

/**
 * Stored order. Monetary fields come from the catalogue, never the request.
 * Payment status stays UNVERIFIED until a person checks the bank/UPI app.
 */
function orderRecord(data: OrderInput, productName: string, unitPrice: number): EnquiryRecord {
  const amount = (unitPrice * data.quantity).toFixed(2);
  const message = [
    `UPI ORDER ${data.orderRef}`,
    `Product: ${productName} (${data.product})`,
    `Quantity: ${data.quantity} × ₹${unitPrice} = ₹${amount}`,
    "Payment status: UNVERIFIED",
    `UPI transaction ID / UTR: ${data.utr}  (verify this payment in your bank/UPI app before shipping)`,
    "",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email || "-"}`,
    "Delivery address:",
    data.address,
    `${data.city}, ${data.state} – ${data.pincode}`,
    ...(data.source ? ["", `Source: ${data.source}`] : []),
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

function catalogueUnitPrice(price: number | undefined): number | null {
  if (!Number.isSafeInteger(price) || price === undefined || price < 1 || price > 500_000) return null;
  return price;
}

export async function POST(request: Request) {
  const route = "/api/enquiry";
  const opened = await beginApi(request, route, [{ name: "ENQUIRY_ROUTE_IP", limit: 40, windowMs: 60 * 60 * 1000 }]);
  if (isApiResponse(opened)) return opened;

  const body = await readBody(request);
  if (!body) {
    logEvent({ requestId: opened.requestId, route, event: "VALIDATION_ERROR", errorType: "bad_request" });
    return apiError(400, "bad_request", opened.requestId);
  }

  if (body.type === "order") {
    const limited = await enforceLimits(request, opened, [LIMITS.orderIp]);
    if (limited) return limited;
    const parsed = orderSchema.safeParse(body);
    if (!parsed.success) {
      logEvent({ requestId: opened.requestId, route, event: "VALIDATION_ERROR", errorType: "order" });
      return json({ ok: false, errors: fieldErrors(parsed.error) }, 400, opened.requestId);
    }
    const data = parsed.data;
    if (looksLikeSpam(data)) return json({ ok: true, status: "sent", orderRef: data.orderRef }, 200, opened.requestId);
    const product = getProduct(data.product);
    const unitPrice = catalogueUnitPrice(product?.price);
    if (!product || unitPrice === null || getBuyMode(product).kind !== "upi") {
      return apiError(400, "not_available", opened.requestId);
    }
    try {
      const delivered = await deliver(orderRecord(data, product.en.name, unitPrice));
      logEvent({
        requestId: opened.requestId,
        route,
        event: "ORDER_SUBMISSION",
        detail: `ref=${data.orderRef} qty=${data.quantity} inr=${unitPrice * data.quantity} status=UNVERIFIED`,
      });
      return json(
        { ok: true, status: delivered ? "sent" : "pending", orderRef: data.orderRef, amount: unitPrice * data.quantity },
        200,
        opened.requestId,
      );
    } catch (err) {
      return internalError(opened, err);
    }
  }

  const limited = await enforceLimits(request, opened, [LIMITS.enquiryIp]);
  if (limited) return limited;

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    logEvent({ requestId: opened.requestId, route, event: "VALIDATION_ERROR", errorType: "enquiry" });
    return json({ ok: false, errors: fieldErrors(parsed.error) }, 400, opened.requestId);
  }

  const data = parsed.data;
  if (looksLikeSpam(data)) return json({ ok: true, status: "sent" }, 200, opened.requestId);

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
    logEvent({ requestId: opened.requestId, route, event: "ENQUIRY_CREATED", detail: `subject=${data.subject}` });
    return json({ ok: true, status: delivered ? "sent" : "pending" }, 200, opened.requestId);
  } catch (err) {
    return internalError(opened, err);
  }
}
