export interface ItemAllergenAnalysis {
  itemName: string;
  detectedAllergens: string[];
  isGlutenFree: boolean;
  isVegan: boolean;
}

export class AllergenScannerService {
  scanDishes(itemName: string, ingredients: string[]): ItemAllergenAnalysis {
    const lower = ingredients.map(i => i.toLowerCase());
    const allergens: string[] = [];

    if (lower.some(i => i.includes('peanut') || i.includes('walnut') || i.includes('almond'))) allergens.push('NUTS');
    if (lower.some(i => i.includes('wheat') || i.includes('flour') || i.includes('barley'))) allergens.push('GLUTEN');
    if (lower.some(i => i.includes('milk') || i.includes('cheese') || i.includes('cream'))) allergens.push('DAIRY');

    const isGlutenFree = !allergens.includes('GLUTEN');
    const isVegan = !allergens.includes('DAIRY') && !lower.some(i => i.includes('beef') || i.includes('chicken') || i.includes('pork'));

    return {
      itemName,
      detectedAllergens: allergens,
      isGlutenFree,
      isVegan
    };
  }
}

export const allergenScannerService = new AllergenScannerService();
