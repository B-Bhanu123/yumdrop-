import { allergenScannerService } from '../src/services/allergen-scanner.service';

describe('Allergen Scanner Service Unit Tests (PR 2)', () => {
  test('Detects gluten and dairy allergens correctly in menu dish', () => {
    const analysis = allergenScannerService.scanDishes('Margherita Pizza', ['wheat flour', 'mozzarella cheese', 'tomato sauce']);
    expect(analysis.detectedAllergens).toContain('GLUTEN');
    expect(analysis.detectedAllergens).toContain('DAIRY');
    expect(analysis.isVegan).toBe(false);
  });
});
