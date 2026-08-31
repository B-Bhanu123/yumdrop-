import { PaymentTransactionEntity, InvoiceEntity } from '../models/payment.model';

export class PaymentRepository {
  private transactions: Map<string, PaymentTransactionEntity> = new Map();
  private invoices: Map<string, InvoiceEntity> = new Map();

  async findById(id: string): Promise<PaymentTransactionEntity | null> {
    return this.transactions.get(id) || null;
  }

  async findByOrderId(orderId: string): Promise<PaymentTransactionEntity | null> {
    for (const tx of this.transactions.values()) {
      if (tx.orderId === orderId) return tx;
    }
    return null;
  }

  async save(tx: PaymentTransactionEntity): Promise<PaymentTransactionEntity> {
    this.transactions.set(tx.id, tx);
    return tx;
  }

  async update(id: string, updates: Partial<PaymentTransactionEntity>): Promise<PaymentTransactionEntity | null> {
    const existing = await this.findById(id);
    if (!existing) return null;

    const updated = { ...existing, ...updates, updatedAt: new Date().toISOString() };
    this.transactions.set(id, updated);
    return updated;
  }

  async saveInvoice(invoice: InvoiceEntity): Promise<InvoiceEntity> {
    this.invoices.set(invoice.invoiceNumber, invoice);
    return invoice;
  }

  async clear(): Promise<void> {
    this.transactions.clear();
    this.invoices.clear();
  }
}

export const paymentRepository = new PaymentRepository();
