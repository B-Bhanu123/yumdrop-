import { cryptoPaymentService } from '../src/services/crypto-payment.service';

describe('Crypto Payment Service Unit Tests (Sub-Branch 4)', () => {
  test('Processes Web3 crypto transaction and generates transaction hash', () => {
    const res = cryptoPaymentService.processCryptoTransaction({
      orderId: 'ord-crypto-771',
      cryptoCurrency: 'ETH',
      amountCrypto: 0.015,
      walletAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'
    });

    expect(res.success).toBe(true);
    expect(res.status).toBe('CONFIRMED_ON_CHAIN');
    expect(res.txHash).toContain('0x');
  });
});
