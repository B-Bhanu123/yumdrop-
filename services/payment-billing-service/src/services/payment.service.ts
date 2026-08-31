import { CryptoUtils, BadRequestError, NotFoundError, ConflictError } from '@yumdrop/shared-core';
import { PaymentTransactionEntity, PaymentMethod, InvoiceEntity } from '../models/payment.model';
import { paymentRepository } from '../repositories/payment.repository';

export class PaymentService {
  async processPayment(params: {
    orderId: string;
    customerId: string;
    amount: number;
    currency?: string;
    paymentMethod: PaymentMethod;
    cardNumber?: string;
  }): Promise<{ transaction: PaymentTransactionEntity; invoice: InvoiceEntity }> {
    if (!params.amount || params.amount <= 0) {
      throw new BadRequestError('Payment amount must be greater than zero', 'amount');
    }

    const existing = await paymentRepository.findByOrderId(params.orderId);
    if (existing && existing.status === 'SUCCESS') {
      throw new ConflictError('Payment has already been processed for this order');
    }

    const isCardDeclined = params.cardNumber === '4000000000000002'; // Mock declined card number
    const status = isCardDeclined ? 'FAILED' : 'SUCCESS';
    const providerTxId = `ch_${CryptoUtils.generateRandomToken(12)}`;

    const transaction: PaymentTransactionEntity = {
      id: `tx_${CryptoUtils.generateRandomToken(8)}`,
      orderId: params.orderId,
      customerId: params.customerId,
      amount: params.amount,
      currency: params.currency || 'USD',
      paymentMethod: params.paymentMethod,
      status,
      providerTransactionId: providerTxId,
      failureReason: isCardDeclined ? 'Card declined by issuing bank' : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await paymentRepository.save(transaction);

    if (isCardDeclined) {
      throw new BadRequestError('Payment transaction declined by issuing bank', 'paymentMethod');
    }

    const invoice: InvoiceEntity = {
      invoiceNumber: `INV-${Math.floor(100000 + Math.random() * 900000)}`,
      transactionId: transaction.id,
      orderId: params.orderId,
      amount: params.amount,
      taxAmount: parseFloat((params.amount * 0.08).toFixed(2)),
      pdfUrl: `https://cdn.yumdrop.com/invoices/${transaction.id}.pdf`,
      issuedAt: new Date().toISOString()
    };

    await paymentRepository.saveInvoice(invoice);

    return { transaction, invoice };
  }

  async refundPayment(transactionId: string, reason?: string): Promise<PaymentTransactionEntity> {
    const tx = await paymentRepository.findById(transactionId);
    if (!tx) {
      throw new NotFoundError('Transaction');
    }
    if (tx.status !== 'SUCCESS') {
      throw new BadRequestError('Only successful transactions can be refunded');
    }

    const refundId = `re_${CryptoUtils.generateRandomToken(10)}`;
    const updated = await paymentRepository.update(transactionId, {
      status: 'REFUNDED',
      refundId
    });

    return updated!;
  }

  async getTransactionById(id: string): Promise<PaymentTransactionEntity> {
    const tx = await paymentRepository.findById(id);
    if (!tx) {
      throw new NotFoundError('Transaction');
    }
    return tx;
  }
}

export const paymentService = new PaymentService();
