/** Helpers shared by the checkout page (server) and the checkout form (client). */

/** URL-encode a UPI parameter value. "@" is kept as-is (valid in a URL query) because some UPI apps don't decode %40 in the VPA. */
function enc(value: string) {
  return encodeURIComponent(value).replace(/%40/g, "@");
}

export function buildUpiUrl({
  upiId,
  payeeName,
  amount,
  note,
}: {
  upiId: string;
  payeeName: string;
  amount: number;
  note: string;
}) {
  const params: [string, string][] = [
    ["pa", upiId],
    ["pn", payeeName],
    ["am", amount.toFixed(2)],
    ["cu", "INR"],
    ["tn", note.slice(0, 50)],
  ];
  return `upi://pay?${params.map(([k, v]) => `${k}=${enc(v)}`).join("&")}`;
}

/** Order reference like AA-7K3QXP (no 0/O/1/I to avoid confusion when read aloud) */
const REF_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
export function makeOrderRef(random: (n: number) => Uint8Array = (n) => crypto.getRandomValues(new Uint8Array(n))) {
  const bytes = random(6);
  let out = "";
  for (const b of bytes) out += REF_CHARS[b % REF_CHARS.length];
  return `AA-${out}`;
}

export const ORDER_REF_PATTERN = /^AA-[A-HJ-NP-Z2-9]{6}$/;
export const MAX_ORDER_QTY = 10;

/** Normalise an Indian mobile number: strips spaces, dashes, +91/91/0 prefix. Returns 10 digits or null. */
export function normaliseIndianMobile(input: string): string | null {
  let d = input.replace(/[\s\-()]/g, "");
  if (d.startsWith("+91")) d = d.slice(3);
  else if (d.length === 12 && d.startsWith("91")) d = d.slice(2);
  else if (d.length === 11 && d.startsWith("0")) d = d.slice(1);
  return /^[6-9]\d{9}$/.test(d) ? d : null;
}

export const PINCODE_PATTERN = /^[1-9]\d{5}$/;
export const UTR_PATTERN = /^\d{12}$/;
