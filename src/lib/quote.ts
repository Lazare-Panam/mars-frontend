/** The message ContactForm pre-fills for a quote request (see useQuoteStore). */
export function quoteMessage(sku: string, productName?: string): string {
  const item = productName ? `${sku} (${productName})` : sku;
  return `Hello,\n\nI'd like a quote for part number ${item}.\n\nQuantity: \nDelivery location: \n\nThank you.`;
}

export interface QuoteLineInput {
  sku: string;
  product?: string;
  quantity: number;
}

/**
 * The message ContactForm pre-fills when a whole cart is handed over from the
 * saved cart — one line per item, so the enquiry email carries every part
 * number and quantity. The user can still edit it before sending.
 */
export function cartQuoteMessage(lines: QuoteLineInput[]): string {
  const list = lines
    .map((l) => `- ${l.quantity} x ${l.sku}${l.product ? ` (${l.product})` : ""}`)
    .join("\n");
  return `Hello,\n\nI'd like a quote for the following items:\n\n${list}\n\nDelivery location: \n\nThank you.`;
}
