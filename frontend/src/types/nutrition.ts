export type DataQuality = 'A' | 'B' | 'C';

export type FoodType = 'animal' | 'plant';

export interface NutritionData {
  // Basic info
  name: string;
  brand: string;
  category: string;

  // Macronutrients (g)
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  fiber: number;

  // Korean Standard Nutrition Labels (한국 표준 영양성분)
  sugars: number; // 당류 (g)
  transFat: number; // 트랜스지방 (g)
  saturatedFat: number; // 포화지방 (g)
  cholesterol: number; // 콜레스테롤 (mg)
  unsaturatedFat?: number; // 불포화지방 (g) - optional
  omega3?: number; // 오메가-3 지방산 (g) - optional
  caffeine?: number; // 카페인 (mg) - optional

  // Essential Amino Acids (mg)
  isoleucine: number;
  leucine: number;
  valine: number;
  lysine: number;
  methionine: number;
  phenylalanine: number;
  threonine: number;
  tryptophan: number;
  histidine: number;

  // Essential Fatty Acids (g)
  linoleicAcid: number;
  alphaLinolenicAcid: number;
  epa: number;
  dha: number;

  // Vitamins
  vitaminA: number; // μg
  vitaminD: number; // μg
  vitaminE: number; // mg
  vitaminK: number; // μg
  vitaminB1: number; // mg
  vitaminB2: number; // mg
  vitaminB3: number; // mg
  vitaminB5: number; // mg
  vitaminB6: number; // mg
  vitaminB7: number; // μg
  vitaminB9: number; // μg
  vitaminB12: number; // μg
  vitaminC: number; // mg

  // Minerals (mg unless specified)
  calcium: number;
  phosphorus: number;
  potassium: number;
  sodium: number;
  chlorine: number;
  magnesium: number;
  iron: number;
  zinc: number;
  copper: number;
  manganese: number;
  iodine: number; // μg
  selenium: number; // μg
  chromium: number; // μg
  molybdenum: number; // μg
  fluorine: number; // mg
  cobalt: number; // mg

  // Metadata
  dataQuality: DataQuality;
  sources: string;
  foodType: FoodType;
}

export interface Brand {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  logo?: string;
}

export interface MenuItem {
  id: string;
  brandId: string;
  nutrition: NutritionData;
  healthScore?: number;
  imageUrl?: string;
  imageUrls?: string[]; // 다중 이미지 URL (폴백용)
}
