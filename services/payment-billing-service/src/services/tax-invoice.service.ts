export interface TaxInvoice {
  invoiceId: string;
  orderId: string;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  taxRatePercent: number;
  pdfDownloadUrl: string;
}

export class TaxInvoiceService {
  generateTaxInvoice(orderId: string, subtotal: number, taxRatePercent: number = 8): TaxInvoice {
    const taxAmount = parseFloat(((subtotal * taxRatePercent) / 100).toFixed(2));
    const totalAmount = parseFloat((subtotal + taxAmount).toFixed(2));
    const invoiceId = `inv-tax-${Math.random().toString(36).substr(2, 8)}`;

    return {
      invoiceId,
      orderId,
      subtotal,
      taxAmount,
      totalAmount,
      taxRatePercent,
      pdfDownloadUrl: `https://invoices.yumdrop.com/pdf/${invoiceId}.pdf`
    };
  }
}

export const taxInvoiceService = new TaxInvoiceService();
