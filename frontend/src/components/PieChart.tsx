interface PieChartProps {
  protein: number;
  carbs: number;
  fat: number;
  size?: number;
}

const PieChart = ({ protein, carbs, fat, size = 120 }: PieChartProps) => {
  const total = protein * 4 + carbs * 4 + fat * 9; // 칼로리 계산

  const proteinCal = protein * 4;
  const carbsCal = carbs * 4;
  const fatCal = fat * 9;

  const proteinPercent = (proteinCal / total) * 100;
  const carbsPercent = (carbsCal / total) * 100;
  const fatPercent = (fatCal / total) * 100;

  // SVG 도넛 차트 계산
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  const proteinLength = (proteinPercent / 100) * circumference;
  const carbsLength = (carbsPercent / 100) * circumference;
  const fatLength = (fatPercent / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 100 100" className="transform -rotate-90">
        {/* 배경 원 */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="var(--bg-primary)"
          strokeWidth="12"
        />

        {/* 단백질 (테라코타) */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#e76f51"
          strokeWidth="12"
          strokeDasharray={`${proteinLength} ${circumference}`}
          strokeDashoffset="0"
          strokeLinecap="round"
        />

        {/* 탄수화물 (살구색) */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#f4a261"
          strokeWidth="12"
          strokeDasharray={`${carbsLength} ${circumference}`}
          strokeDashoffset={-proteinLength}
          strokeLinecap="round"
        />

        {/* 지방 (부드러운 초록) */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#52b788"
          strokeWidth="12"
          strokeDasharray={`${fatLength} ${circumference}`}
          strokeDashoffset={-(proteinLength + carbsLength)}
          strokeLinecap="round"
        />
      </svg>

      {/* 중앙 텍스트 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xs text-[var(--text-muted)]">구성비</span>
      </div>
    </div>
  );
};

export default PieChart;
