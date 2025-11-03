import type { NutritionData } from '../types/nutrition';

/**
 * 건강 점수 계산 알고리즘
 * 100점 만점 기준
 *
 * 감점 요소 (나쁜 영양소 - 적을수록 좋음):
 * - 포화지방, 트랜스지방, 콜레스테롤, 나트륨, 설탕, 탄수화물
 *
 * 가점 요소 (좋은 영양소 - 많을수록 좋음):
 * - 단백질, 식이섬유, 비타민, 미네랄, 필수지방산, 필수아미노산
 */
export function calculateHealthScore(nutrition: NutritionData): number {
  let score = 100;

  // === 감점 요소 (최대 -60점) ===

  // 1. 포화지방 (1g당 -0.3점, 최대 -15점)
  const saturatedFatPenalty = Math.min(nutrition.saturatedFat * 0.3, 15);
  score -= saturatedFatPenalty;

  // 2. 트랜스지방 (1g당 -5점, 최대 -10점)
  const transFatPenalty = Math.min(nutrition.transFat * 5, 10);
  score -= transFatPenalty;

  // 3. 콜레스테롤 (100mg당 -2점, 최대 -10점)
  const cholesterolPenalty = Math.min((nutrition.cholesterol / 100) * 2, 10);
  score -= cholesterolPenalty;

  // 4. 나트륨 (1000mg당 -1.5점, 최대 -15점)
  const sodiumPenalty = Math.min((nutrition.sodium / 1000) * 1.5, 15);
  score -= sodiumPenalty;

  // 5. 설탕 (10g당 -1점, 최대 -5점)
  const sugarsPenalty = Math.min((nutrition.sugars / 10) * 1, 5);
  score -= sugarsPenalty;

  // 6. 탄수화물 (50g당 -0.5점, 최대 -5점)
  const carbsPenalty = Math.min((nutrition.carbs / 50) * 0.5, 5);
  score -= carbsPenalty;

  // === 가점 요소 (최대 +30점) ===

  // 1. 단백질 (10g당 +0.5점, 최대 +10점)
  const proteinBonus = Math.min((nutrition.protein / 10) * 0.5, 10);
  score += proteinBonus;

  // 2. 식이섬유 (1g당 +1점, 최대 +5점)
  const fiberBonus = Math.min(nutrition.fiber * 1, 5);
  score += fiberBonus;

  // 3. 비타민 총합 점수 (최대 +8점)
  const vitaminScore = calculateVitaminScore(nutrition);
  score += Math.min(vitaminScore, 8);

  // 4. 미네랄 총합 점수 (최대 +7점)
  const mineralScore = calculateMineralScore(nutrition);
  score += Math.min(mineralScore, 7);

  // 최종 점수를 0-100 사이로 제한
  return Math.max(0, Math.min(100, Math.round(score)));
}

/**
 * 비타민 점수 계산 (성인 1일 권장량 대비)
 */
function calculateVitaminScore(nutrition: NutritionData): number {
  let score = 0;

  // 비타민 A (700-900 μg)
  if (nutrition.vitaminA > 0) score += Math.min(nutrition.vitaminA / 800, 1);

  // 비타민 D (10-15 μg)
  if (nutrition.vitaminD > 0) score += Math.min(nutrition.vitaminD / 12, 1);

  // 비타민 E (12-15 mg)
  if (nutrition.vitaminE > 0) score += Math.min(nutrition.vitaminE / 13, 1);

  // 비타민 B1 (1.1-1.2 mg)
  if (nutrition.vitaminB1 > 0) score += Math.min(nutrition.vitaminB1 / 1.15, 1);

  // 비타민 B2 (1.3-1.5 mg)
  if (nutrition.vitaminB2 > 0) score += Math.min(nutrition.vitaminB2 / 1.4, 1);

  // 비타민 B3 (14-16 mg)
  if (nutrition.vitaminB3 > 0) score += Math.min(nutrition.vitaminB3 / 15, 1);

  // 비타민 B6 (1.4-1.5 mg)
  if (nutrition.vitaminB6 > 0) score += Math.min(nutrition.vitaminB6 / 1.45, 1);

  // 비타민 B12 (2.4 μg)
  if (nutrition.vitaminB12 > 0) score += Math.min(nutrition.vitaminB12 / 2.4, 1);

  // 비타민 C (100 mg)
  if (nutrition.vitaminC > 0) score += Math.min(nutrition.vitaminC / 100, 1);

  return score;
}

/**
 * 미네랄 점수 계산 (성인 1일 권장량 대비)
 */
function calculateMineralScore(nutrition: NutritionData): number {
  let score = 0;

  // 칼슘 (700-800 mg)
  if (nutrition.calcium > 0) score += Math.min(nutrition.calcium / 750, 1);

  // 철분 (8-14 mg)
  if (nutrition.iron > 0) score += Math.min(nutrition.iron / 11, 1);

  // 아연 (8-10 mg)
  if (nutrition.zinc > 0) score += Math.min(nutrition.zinc / 9, 1);

  // 마그네슘 (280-350 mg)
  if (nutrition.magnesium > 0) score += Math.min(nutrition.magnesium / 315, 1);

  // 인 (700 mg)
  if (nutrition.phosphorus > 0) score += Math.min(nutrition.phosphorus / 700, 1);

  // 칼륨 (3500 mg)
  if (nutrition.potassium > 0) score += Math.min(nutrition.potassium / 3500, 1);

  // 셀레늄 (55-60 μg)
  if (nutrition.selenium > 0) score += Math.min(nutrition.selenium / 57, 1);

  return score;
}

/**
 * 영양소 타입 판별
 * negative: 적을수록 좋은 영양소 (빨간색 계열)
 * positive: 많을수록 좋은 영양소 (초록색 계열)
 * neutral: 중립 (기본색)
 */
export type NutrientType = 'negative' | 'positive' | 'neutral';

export function getNutrientType(nutrientName: string): NutrientType {
  const negativeName = nutrientName.toLowerCase();

  // 감점 요소 (적을수록 좋음)
  const negativeNutrients = [
    '포화지방', 'saturatedfat', 'saturated',
    '트랜스지방', 'transfat', 'trans',
    '콜레스테롤', 'cholesterol',
    '나트륨', 'sodium',
    '설탕', '당류', 'sugars', 'sugar',
    '탄수화물', 'carbs', 'carbohydrate',
  ];

  // 가점 요소 (많을수록 좋음)
  const positiveNutrients = [
    '단백질', 'protein',
    '식이섬유', 'fiber',
    '비타민', 'vitamin',
    '미네랄', 'mineral',
    '칼슘', 'calcium',
    '철분', 'iron',
    '아연', 'zinc',
    '마그네슘', 'magnesium',
    '칼륨', 'potassium',
    '인', 'phosphorus',
    '셀레늄', 'selenium',
    '불포화지방', 'unsaturatedfat',
    '오메가', 'omega',
    '필수아미노산', 'amino',
  ];

  for (const neg of negativeNutrients) {
    if (negativeName.includes(neg)) return 'negative';
  }

  for (const pos of positiveNutrients) {
    if (negativeName.includes(pos)) return 'positive';
  }

  return 'neutral';
}

/**
 * 감점 영양소에 대한 색상 계산 (값이 클수록 빨강)
 * @param value 현재 값
 * @param maxBad 빨간색이 되는 기준값
 * @returns 색상 문자열
 */
export function getNegativeNutrientColor(value: number, maxBad: number): string {
  const ratio = Math.min(value / maxBad, 1);

  if (ratio < 0.3) return '#2d6a4f'; // 짙은 초록 (적음 - 좋음)
  if (ratio < 0.5) return '#52b788'; // 부드러운 초록
  if (ratio < 0.7) return '#e9c46a'; // 골드
  if (ratio < 0.85) return '#e76f51'; // 테라코타
  return '#d62828'; // 차분한 빨강 (많음 - 나쁨)
}

/**
 * 가점 영양소에 대한 색상 계산 (값이 클수록 초록)
 * @param value 현재 값
 * @param target 권장량
 * @returns 색상 문자열
 */
export function getPositiveNutrientColor(value: number, target: number): string {
  const ratio = value / target;

  if (ratio >= 1.0) return '#2d6a4f'; // 짙은 초록 (충분)
  if (ratio >= 0.7) return '#52b788'; // 부드러운 초록
  if (ratio >= 0.5) return '#e9c46a'; // 골드
  if (ratio >= 0.3) return '#e76f51'; // 테라코타
  return '#d62828'; // 차분한 빨강 (부족)
}
