export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
export type PaymentMethod = 'CREDIT_CARD' | 'DEBIT_CARD' | 'PAYPAL' | 'APPLE_PAY' | 'GOOGLE_PAY';

export interface PaymentTransactionEntity {
  id: string;
  orderId: string;
  customerId: string;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  providerTransactionId: string;
  failureReason?: string;
  refundId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceEntity {
  invoiceNumber: string;
  transactionId: string;
  orderId: string;
  amount: number;
  taxAmount: number;
  pdfUrl: string;
  issuedAt: string;
}
