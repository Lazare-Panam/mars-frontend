/** The message ContactForm pre-fills for a quote request (see useQuoteStore). */
export function quoteMessage(sku: string, productName?: string): string {
  const item = productName ? `${sku} (${productName})` : sku;
  return `Hello,\n\nI'd like a quote for part number ${item}.\n\nQuantity: \nDelivery location: \n\nThank you.`;
}
