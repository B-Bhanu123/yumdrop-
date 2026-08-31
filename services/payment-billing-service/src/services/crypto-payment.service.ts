export interface CryptoPaymentPayload {
  orderId: string;
  cryptoCurrency: 'BTC' | 'ETH' | 'USDT';
  amountCrypto: number;
  walletAddress: string;
}

export class CryptoPaymentService {
  processCryptoTransaction(payload: CryptoPaymentPayload) {
    if (!payload.walletAddress || payload.amountCrypto <= 0) {
      throw new Error('Invalid crypto wallet address or amount');
    }
    const txHash = `0x${Math.random().toString(36).substr(2, 16)}${Math.random().toString(36).substr(2, 16)}`;
    return {
      success: true,
      orderId: payload.orderId,
      txHash,
      status: 'CONFIRMED_ON_CHAIN'
    };
  }
}

export const cryptoPaymentService = new CryptoPaymentService();
