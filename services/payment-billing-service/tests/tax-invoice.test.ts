import { taxInvoiceService } from '../src/services/tax-invoice.service';

describe('Tax Invoice Service Unit Tests (PR #20)', () => {
  test('Generates tax compliance invoice and calculates 8% tax accurately', () => {
    const inv = taxInvoiceService.generateTaxInvoice('ord-tax-501', 100.00, 8);
    expect(inv.taxAmount).toBe(8.00);
    expect(inv.totalAmount).toBe(108.00);
    expect(inv.pdfDownloadUrl).toContain('pdf/inv-tax-');
  });
});
