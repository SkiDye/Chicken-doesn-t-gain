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

  const NutrientCard = ({
    label,
    value,
    unit,
    max,
    emoji,
    isNegative = false // 감점 영양소인지 (적을수록 좋음)
  }: {
    label: string;
    value: number;
    unit: string;
    max: number;
    emoji?: string;
    isNegative?: boolean;
  }) => {
    const percentage = getNutrientPercentage(value, max);

    // 감점 영양소는 반대 색상 (적을수록 녹색, 많을수록 빨강)
    // 가점 영양소는 기본 색상 (많을수록 녹색, 적을수록 빨강)
    const color = isNegative
      ? getNegativeNutrientColor(value, max)
      : getPositiveNutrientColor(value, max);

    const barWidth = percentage;

    return (
      <div className="bg-[var(--bg-secondary)] rounded-lg p-4 hover:bg-[var(--bg-card)] transition-all">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {emoji && <span className="text-lg">{emoji}</span>}
            <span className="text-sm font-medium text-[var(--text-primary)]">{label}</span>
          </div>
          <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: color + '30', color }}>
            {percentage.toFixed(0)}%
          </span>
        </div>
        <div className="flex items-end gap-2 mb-2">
          <span className="text-2xl font-bold text-[var(--text-primary)]">
            {value < 1 ? value.toFixed(2) : value < 10 ? value.toFixed(1) : Math.round(value)}
          </span>
          <span className="text-sm text-[var(--text-muted)] pb-1">{unit}</span>
        </div>
        <div className="w-full h-2 bg-[var(--bg-primary)] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${barWidth}%`, backgroundColor: color }}
          />
        </div>
      </div>
    );
  };

  const MacroCard = ({ label, value, unit, color, icon }: { label: string; value: number; unit: string; color: string; icon: string }) => (
    <div className="rounded-xl p-5 text-center relative overflow-hidden" style={{ background: color + '15' }}>
      <div className="absolute top-2 right-2 text-4xl opacity-20">{icon}</div>
      <p className="text-xs font-medium text-[var(--text-muted)] mb-2">{label}</p>
      <p className="text-3xl font-bold mb-1" style={{ color }}>
        {value >= 1000 ? value.toLocaleString() : value}
      </p>
      <p className="text-xs text-[var(--text-muted)]">{unit}</p>
    </div>
  );

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[var(--bg-card)] border border-[var(--glass-border)] max-w-7xl w-full max-h-[92vh] overflow-hidden rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 px-8 py-6 border-b border-[var(--glass-border)]"
             style={{ background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%)' }}>
          <div className="flex justify-between items-start">
            <div className="flex gap-4 items-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-lg"
                   style={{ background: 'var(--gradient-primary)' }}>
                🍗
              </div>
              <div>
                <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-1">
                  {nutrition.name}
                </h2>
                <p className="text-[var(--text-secondary)] font-medium mb-3">
                  {nutrition.brand}
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span
                    className="px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm"
                    style={{
                      background: nutrition.dataQuality === 'A' ? '#10b981' :
                                 nutrition.dataQuality === 'B' ? '#f59e0b' : '#ef4444',
                      color: 'white'
                    }}
                  >
                    📊 {nutrition.dataQuality}등급 데이터
                  </span>
                  <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[var(--bg-secondary)] text-[var(--text-primary)] shadow-sm">
                    {nutrition.foodType === 'animal' ? '🥩 동물성' : '🌱 식물성'}
                  </span>
                  {item.healthScore && (
                    <span className="px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm"
                          style={{ background: 'var(--gradient-primary)', color: 'white' }}>
                      ⭐ 건강점수 {item.healthScore}/100
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-5xl text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors leading-none w-12 h-12 flex items-center justify-center rounded-lg hover:bg-[var(--bg-secondary)]"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(92vh-160px)] px-8 py-6">
          {/* Macro Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <MacroCard label="총 칼로리" value={nutrition.calories} unit="kcal" color="#f59e0b" icon="🔥" />
            <MacroCard label="단백질" value={nutrition.protein} unit="g" color="#ff6b6b" icon="💪" />
            <MacroCard label="탄수화물" value={nutrition.carbs} unit="g" color="#ffd93d" icon="🌾" />
            <MacroCard label="지방" value={nutrition.fat} unit="g" color="#6bcf7f" icon="🥑" />
          </div>

          {/* Korean Standard Nutrition Labels */}
          <div className="mb-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl p-6 border border-blue-500/30">
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1 flex items-center gap-2">
              <span>🇰🇷</span>
              <span>한국 식품 영양성분 표시</span>
            </h3>
            <p className="text-sm text-[var(--text-muted)] mb-4">식품의약품안전처 기준 필수 표시항목</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <NutrientCard label="나트륨" value={nutrition.sodium} unit="mg" max={2300} emoji="🧂" isNegative={true} />
              <NutrientCard label="당류" value={nutrition.sugars} unit="g" max={50} emoji="🍬" isNegative={true} />
              <NutrientCard label="포화지방" value={nutrition.saturatedFat} unit="g" max={15} emoji="🥓" isNegative={true} />
              <NutrientCard label="트랜스지방" value={nutrition.transFat} unit="g" max={2} emoji="⚠️" isNegative={true} />
              <NutrientCard label="콜레스테롤" value={nutrition.cholesterol} unit="mg" max={300} emoji="💊" isNegative={true} />
              {nutrition.unsaturatedFat && (
                <NutrientCard label="불포화지방" value={nutrition.unsaturatedFat} unit="g" max={30} emoji="🥜" isNegative={false} />
              )}
              {nutrition.omega3 && (
                <NutrientCard label="오메가-3" value={nutrition.omega3} unit="g" max={2} emoji="🐟" isNegative={false} />
              )}
              {nutrition.caffeine && (
                <NutrientCard label="카페인" value={nutrition.caffeine} unit="mg" max={400} emoji="☕" isNegative={true} />
              )}
            </div>
          </div>

          {/* Essential Amino Acids */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1 flex items-center gap-2">
              <span>💊</span>
              <span>필수 아미노산</span>
            </h3>
            <p className="text-sm text-[var(--text-muted)] mb-4">Essential Amino Acids - 체내에서 합성되지 않아 반드시 섭취해야 하는 9종의 아미노산</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <NutrientCard label="이소류신" value={nutrition.isoleucine} unit="mg" max={3000} emoji="🔵" />
              <NutrientCard label="류신" value={nutrition.leucine} unit="mg" max={6000} emoji="🔵" />
              <NutrientCard label="발린" value={nutrition.valine} unit="mg" max={4000} emoji="🔵" />
              <NutrientCard label="라이신" value={nutrition.lysine} unit="mg" max={3000} emoji="🔵" />
              <NutrientCard label="메티오닌" value={nutrition.methionine} unit="mg" max={2000} emoji="🔵" />
              <NutrientCard label="페닐알라닌" value={nutrition.phenylalanine} unit="mg" max={3500} emoji="🔵" />
              <NutrientCard label="트레오닌" value={nutrition.threonine} unit="mg" max={2500} emoji="🔵" />
              <NutrientCard label="트립토판" value={nutrition.tryptophan} unit="mg" max={1000} emoji="🔵" />
              <NutrientCard label="히스티딘" value={nutrition.histidine} unit="mg" max={2000} emoji="🔵" />
            </div>
          </div>

          {/* Essential Fatty Acids */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1 flex items-center gap-2">
              <span>🥑</span>
              <span>필수 지방산</span>
            </h3>
            <p className="text-sm text-[var(--text-muted)] mb-4">Essential Fatty Acids - 오메가-3, 오메가-6 등 체내 합성 불가능한 필수 지방산</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <NutrientCard label="리놀레산 (ω-6)" value={nutrition.linoleicAcid} unit="g" max={15} emoji="🟡" />
              <NutrientCard label="알파리놀렌산 (ω-3)" value={nutrition.alphaLinolenicAcid} unit="g" max={2} emoji="🟡" />
              <NutrientCard label="EPA" value={nutrition.epa} unit="g" max={1} emoji="🟡" />
              <NutrientCard label="DHA" value={nutrition.dha} unit="g" max={1} emoji="🟡" />
            </div>
          </div>

          {/* Vitamins */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1 flex items-center gap-2">
              <span>🍊</span>
              <span>비타민</span>
            </h3>
            <p className="text-sm text-[var(--text-muted)] mb-4">Vitamins - 에너지 대사, 면역, 항산화 등 생명 유지에 필수적인 13종 비타민</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <NutrientCard label="비타민 A" value={nutrition.vitaminA} unit="μg" max={900} emoji="🟠" />
              <NutrientCard label="비타민 D" value={nutrition.vitaminD} unit="μg" max={20} emoji="🟠" />
              <NutrientCard label="비타민 E" value={nutrition.vitaminE} unit="mg" max={15} emoji="🟠" />
              <NutrientCard label="비타민 K" value={nutrition.vitaminK} unit="μg" max={120} emoji="🟠" />
              <NutrientCard label="비타민 B1" value={nutrition.vitaminB1} unit="mg" max={1.2} emoji="🔴" />
              <NutrientCard label="비타민 B2" value={nutrition.vitaminB2} unit="mg" max={1.3} emoji="🔴" />
              <NutrientCard label="비타민 B3" value={nutrition.vitaminB3} unit="mg" max={16} emoji="🔴" />
              <NutrientCard label="비타민 B5" value={nutrition.vitaminB5} unit="mg" max={5} emoji="🔴" />
              <NutrientCard label="비타민 B6" value={nutrition.vitaminB6} unit="mg" max={1.7} emoji="🔴" />
              <NutrientCard label="비타민 B7" value={nutrition.vitaminB7} unit="μg" max={30} emoji="🔴" />
              <NutrientCard label="비타민 B9" value={nutrition.vitaminB9} unit="μg" max={400} emoji="🔴" />
              <NutrientCard label="비타민 B12" value={nutrition.vitaminB12} unit="μg" max={2.4} emoji="🔴" />
              <NutrientCard label="비타민 C" value={nutrition.vitaminC} unit="mg" max={90} emoji="🟢" />
            </div>
          </div>

          {/* Minerals */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1 flex items-center gap-2">
              <span>⚡</span>
              <span>미네랄</span>
            </h3>
            <p className="text-sm text-[var(--text-muted)] mb-4">Minerals - 뼈 건강, 신경전달, 혈액 생성 등에 필수적인 16종 미네랄</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <NutrientCard label="칼슘" value={nutrition.calcium} unit="mg" max={1000} emoji="⚪" />
              <NutrientCard label="인" value={nutrition.phosphorus} unit="mg" max={700} emoji="⚪" />
              <NutrientCard label="칼륨" value={nutrition.potassium} unit="mg" max={3500} emoji="🟤" />
              <NutrientCard label="나트륨" value={nutrition.sodium} unit="mg" max={2300} emoji="🟤" />
              <NutrientCard label="염소" value={nutrition.chlorine} unit="mg" max={2300} emoji="🟤" />
              <NutrientCard label="마그네슘" value={nutrition.magnesium} unit="mg" max={400} emoji="🟤" />
              <NutrientCard label="철분" value={nutrition.iron} unit="mg" max={18} emoji="🔴" />
              <NutrientCard label="아연" value={nutrition.zinc} unit="mg" max={11} emoji="⚪" />
              <NutrientCard label="구리" value={nutrition.copper} unit="mg" max={0.9} emoji="🟠" />
              <NutrientCard label="망간" value={nutrition.manganese} unit="mg" max={2.3} emoji="🟣" />
              <NutrientCard label="요오드" value={nutrition.iodine} unit="μg" max={150} emoji="🔵" />
              <NutrientCard label="셀레늄" value={nutrition.selenium} unit="μg" max={55} emoji="⚪" />
              <NutrientCard label="크롬" value={nutrition.chromium} unit="μg" max={35} emoji="⚪" />
              <NutrientCard label="몰리브덴" value={nutrition.molybdenum} unit="μg" max={45} emoji="⚪" />
              <NutrientCard label="불소" value={nutrition.fluorine} unit="mg" max={4} emoji="🔵" />
              <NutrientCard label="코발트" value={nutrition.cobalt} unit="mg" max={0.01} emoji="🔵" />
            </div>
          </div>

          {/* Data Source */}
          <div className="bg-[var(--bg-secondary)] rounded-xl p-5 border-l-4 border-[var(--accent-primary)]">
            <p className="text-xs font-bold text-[var(--accent-primary)] mb-2">📚 데이터 출처</p>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{nutrition.sources}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionModal;
