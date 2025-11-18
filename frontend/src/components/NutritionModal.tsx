import type { MenuItem } from '../types/nutrition';
import { getNegativeNutrientColor, getPositiveNutrientColor } from '../utils/healthScore';

interface NutritionModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

const NutritionModal = ({ item, onClose }: NutritionModalProps) => {
  if (!item) return null;

  const nutrition = item.nutrition;

  const getNutrientPercentage = (value: number, max: number) => {
    return Math.min((value / max) * 100, 100);
  };

  const NutrientRow = ({
    label,
    value,
    unit,
    max,
    isNegative = false
  }: {
    label: string;
    value: number;
    unit: string;
    max: number;
    isNegative?: boolean;
  }) => {
    const percentage = getNutrientPercentage(value, max);
    const color = isNegative
      ? getNegativeNutrientColor(value, max)
      : getPositiveNutrientColor(value, max);

    return (
      <div className="flex items-center justify-between py-2 px-3 border-b border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 flex-1">{label}</span>
        <span className="text-xs font-bold text-slate-900 dark:text-white w-24 text-right">
          {value < 1 ? value.toFixed(2) : value < 10 ? value.toFixed(1) : Math.round(value)} {unit}
        </span>
        <span className="text-xs font-bold w-14 text-right px-2 py-0.5 rounded"
              style={{
                color: color,
                backgroundColor: color + '20'
              }}>
          {percentage.toFixed(0)}%
        </span>
      </div>
    );
  };

  const MacroCard = ({ label, value, unit }: { label: string; value: number; unit: string }) => (
    <div className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 p-3 text-center rounded-lg shadow-sm">
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">{label}</p>
      <p className="text-xl font-bold text-slate-900 dark:text-white mb-0.5">
        {value >= 1000 ? value.toLocaleString() : value}
      </p>
      <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">{unit}</p>
    </div>
  );

  return (
    <div
      className="fixed inset-0 bg-black/60 dark:bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 max-w-7xl w-full max-h-[92vh] overflow-hidden rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 px-6 py-4 bg-white dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-baseline gap-3 mb-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {nutrition.name}
                </h2>
                <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                  {nutrition.brand}
                </span>
              </div>
              <div className="flex gap-2 flex-wrap">
                <span
                  className="px-2.5 py-1 rounded text-xs font-semibold border-2"
                  style={{
                    borderColor: nutrition.dataQuality === 'A' ? '#10b981' :
                               nutrition.dataQuality === 'B' ? '#f59e0b' : '#ef4444',
                    color: nutrition.dataQuality === 'A' ? '#10b981' :
                           nutrition.dataQuality === 'B' ? '#f59e0b' : '#ef4444',
                    background: nutrition.dataQuality === 'A' ? '#10b98120' :
                               nutrition.dataQuality === 'B' ? '#f59e0b20' : '#ef444420'
                  }}
                >
                  데이터 {nutrition.dataQuality}등급
                </span>
                <span className="px-2.5 py-1 rounded text-xs font-semibold border-2 border-slate-300 dark:border-slate-500 text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700">
                  {nutrition.foodType === 'animal' ? '동물성' : '식물성'}
                </span>
                {item.healthScore && (
                  <span className="px-2.5 py-1 rounded text-xs font-semibold border-2 border-orange-500 dark:border-blue-500 text-orange-600 dark:text-blue-400 bg-orange-50 dark:bg-blue-950">
                    건강점수 {item.healthScore}/100
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-2xl text-slate-400 dark:text-slate-500 hover:text-orange-600 dark:hover:text-slate-200 transition-colors w-9 h-9 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(92vh-140px)] px-6 py-4 bg-slate-50 dark:bg-black">
          {/* Macro Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-5">
            <MacroCard label="총 칼로리" value={nutrition.calories} unit="kcal" />
            <MacroCard label="단백질" value={nutrition.protein} unit="g" />
            <MacroCard label="탄수화물" value={nutrition.carbs} unit="g" />
            <MacroCard label="지방" value={nutrition.fat} unit="g" />
          </div>

          {/* Korean Standard Nutrition Labels */}
          <div className="mb-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 rounded-lg overflow-hidden shadow-sm">
            <div className="bg-slate-100 dark:bg-slate-700 px-3 py-2.5 border-b-2 border-slate-200 dark:border-slate-600">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                한국 식품 영양성분 표시
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">식품의약품안전처 기준 필수 표시항목</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="border-r-2 border-slate-200 dark:border-slate-600">
                <NutrientRow label="나트륨" value={nutrition.sodium} unit="mg" max={2300} isNegative={true} />
                <NutrientRow label="당류" value={nutrition.sugars} unit="g" max={50} isNegative={true} />
                <NutrientRow label="포화지방" value={nutrition.saturatedFat} unit="g" max={15} isNegative={true} />
              </div>
              <div className="border-r-2 border-slate-200 dark:border-slate-600">
                <NutrientRow label="트랜스지방" value={nutrition.transFat} unit="g" max={2} isNegative={true} />
                <NutrientRow label="콜레스테롤" value={nutrition.cholesterol} unit="mg" max={300} isNegative={true} />
                {nutrition.fiber && (
                  <NutrientRow label="식이섬유" value={nutrition.fiber} unit="g" max={25} isNegative={false} />
                )}
              </div>
              <div>
                {nutrition.unsaturatedFat && (
                  <NutrientRow label="불포화지방" value={nutrition.unsaturatedFat} unit="g" max={30} isNegative={false} />
                )}
                {nutrition.omega3 && (
                  <NutrientRow label="오메가-3" value={nutrition.omega3} unit="g" max={2} isNegative={false} />
                )}
                {nutrition.caffeine && (
                  <NutrientRow label="카페인" value={nutrition.caffeine} unit="mg" max={400} isNegative={true} />
                )}
              </div>
            </div>
          </div>

          {/* Essential Amino Acids */}
          <div className="mb-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 rounded-lg overflow-hidden shadow-sm">
            <div className="bg-slate-100 dark:bg-slate-700 px-3 py-2.5 border-b-2 border-slate-200 dark:border-slate-600">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                필수 아미노산 (Essential Amino Acids)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">체내에서 합성되지 않아 반드시 섭취해야 하는 9종</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="border-r-2 border-slate-200 dark:border-slate-600">
                <NutrientRow label="이소류신" value={nutrition.isoleucine} unit="mg" max={3000} />
                <NutrientRow label="류신" value={nutrition.leucine} unit="mg" max={6000} />
                <NutrientRow label="발린" value={nutrition.valine} unit="mg" max={4000} />
              </div>
              <div className="border-r-2 border-slate-200 dark:border-slate-600">
                <NutrientRow label="라이신" value={nutrition.lysine} unit="mg" max={3000} />
                <NutrientRow label="메티오닌" value={nutrition.methionine} unit="mg" max={2000} />
                <NutrientRow label="페닐알라닌" value={nutrition.phenylalanine} unit="mg" max={3500} />
              </div>
              <div>
                <NutrientRow label="트레오닌" value={nutrition.threonine} unit="mg" max={2500} />
                <NutrientRow label="트립토판" value={nutrition.tryptophan} unit="mg" max={1000} />
                <NutrientRow label="히스티딘" value={nutrition.histidine} unit="mg" max={2000} />
              </div>
            </div>
          </div>

          {/* Essential Fatty Acids */}
          <div className="mb-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 rounded-lg overflow-hidden shadow-sm">
            <div className="bg-slate-100 dark:bg-slate-700 px-3 py-2.5 border-b-2 border-slate-200 dark:border-slate-600">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                필수 지방산 (Essential Fatty Acids)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">오메가-3, 오메가-6 등 체내 합성 불가능</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="border-r-2 border-slate-200 dark:border-slate-600">
                <NutrientRow label="리놀레산 (ω-6)" value={nutrition.linoleicAcid} unit="g" max={15} />
                <NutrientRow label="알파리놀렌산 (ω-3)" value={nutrition.alphaLinolenicAcid} unit="g" max={2} />
              </div>
              <div>
                <NutrientRow label="EPA" value={nutrition.epa} unit="g" max={1} />
                <NutrientRow label="DHA" value={nutrition.dha} unit="g" max={1} />
              </div>
            </div>
          </div>

          {/* Vitamins */}
          <div className="mb-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 rounded-lg overflow-hidden shadow-sm">
            <div className="bg-slate-100 dark:bg-slate-700 px-3 py-2.5 border-b-2 border-slate-200 dark:border-slate-600">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                비타민 (Vitamins)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">에너지 대사, 면역, 항산화 등 필수 13종</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="border-r-2 border-slate-200 dark:border-slate-600">
                <NutrientRow label="비타민 A" value={nutrition.vitaminA} unit="μg" max={900} />
                <NutrientRow label="비타민 D" value={nutrition.vitaminD} unit="μg" max={20} />
                <NutrientRow label="비타민 E" value={nutrition.vitaminE} unit="mg" max={15} />
                <NutrientRow label="비타민 K" value={nutrition.vitaminK} unit="μg" max={120} />
                <NutrientRow label="비타민 C" value={nutrition.vitaminC} unit="mg" max={90} />
              </div>
              <div className="border-r-2 border-slate-200 dark:border-slate-600">
                <NutrientRow label="비타민 B1" value={nutrition.vitaminB1} unit="mg" max={1.2} />
                <NutrientRow label="비타민 B2" value={nutrition.vitaminB2} unit="mg" max={1.3} />
                <NutrientRow label="비타민 B3" value={nutrition.vitaminB3} unit="mg" max={16} />
                <NutrientRow label="비타민 B5" value={nutrition.vitaminB5} unit="mg" max={5} />
                <NutrientRow label="비타민 B6" value={nutrition.vitaminB6} unit="mg" max={1.7} />
              </div>
              <div>
                <NutrientRow label="비타민 B7" value={nutrition.vitaminB7} unit="μg" max={30} />
                <NutrientRow label="비타민 B9" value={nutrition.vitaminB9} unit="μg" max={400} />
                <NutrientRow label="비타민 B12" value={nutrition.vitaminB12} unit="μg" max={2.4} />
              </div>
            </div>
          </div>

          {/* Minerals */}
          <div className="mb-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 rounded-lg overflow-hidden shadow-sm">
            <div className="bg-slate-100 dark:bg-slate-700 px-3 py-2.5 border-b-2 border-slate-200 dark:border-slate-600">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                미네랄 (Minerals)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">뼈 건강, 신경전달, 혈액 생성 등 필수 16종</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="border-r-2 border-slate-200 dark:border-slate-600">
                <NutrientRow label="칼슘" value={nutrition.calcium} unit="mg" max={1000} />
                <NutrientRow label="인" value={nutrition.phosphorus} unit="mg" max={700} />
                <NutrientRow label="칼륨" value={nutrition.potassium} unit="mg" max={3500} />
                <NutrientRow label="마그네슘" value={nutrition.magnesium} unit="mg" max={400} />
                <NutrientRow label="염소" value={nutrition.chlorine} unit="mg" max={2300} />
                <NutrientRow label="철분" value={nutrition.iron} unit="mg" max={18} />
              </div>
              <div className="border-r-2 border-slate-200 dark:border-slate-600">
                <NutrientRow label="아연" value={nutrition.zinc} unit="mg" max={11} />
                <NutrientRow label="구리" value={nutrition.copper} unit="mg" max={0.9} />
                <NutrientRow label="망간" value={nutrition.manganese} unit="mg" max={2.3} />
                <NutrientRow label="셀레늄" value={nutrition.selenium} unit="μg" max={55} />
                <NutrientRow label="요오드" value={nutrition.iodine} unit="μg" max={150} />
              </div>
              <div>
                <NutrientRow label="크롬" value={nutrition.chromium} unit="μg" max={35} />
                <NutrientRow label="몰리브덴" value={nutrition.molybdenum} unit="μg" max={45} />
                <NutrientRow label="불소" value={nutrition.fluorine} unit="mg" max={4} />
                <NutrientRow label="코발트" value={nutrition.cobalt} unit="mg" max={0.01} />
              </div>
            </div>
          </div>

          {/* Data Source */}
          <div className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 rounded-lg p-3 shadow-sm">
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">데이터 출처</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{nutrition.sources}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionModal;
