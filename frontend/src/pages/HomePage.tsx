import { useState } from 'react';
import { menuItems, brands } from '../data/mockData';
import type { MenuItem } from '../types/nutrition';
import NutritionModal from '../components/NutritionModal';
import PieChart from '../components/PieChart';
import ThemeToggle from '../components/ThemeToggle';
import MenuImage from '../components/MenuImage';

const HomePage = () => {
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const filteredItems = menuItems.filter((item) => {
    const matchesBrand = selectedBrand === 'all' || item.brandId === selectedBrand;
    const matchesSearch = item.nutrition.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBrand && matchesSearch;
  });

  const getHealthScoreColor = (score?: number) => {
    if (!score) return '#8a7d71';
    if (score >= 80) return '#2d6a4f';  // 짙은 초록
    if (score >= 70) return '#52b788';  // 부드러운 초록
    if (score >= 60) return '#f4a261';  // 살구색
    if (score >= 50) return '#e76f51';  // 테라코타
    return '#d62828';                   // 차분한 빨강
  };

  const getDataQualityColor = (quality: string) => {
    const colors = {
      A: '#2d6a4f',  // 짙은 초록
      B: '#e9c46a',  // 골드
      C: '#e76f51',  // 테라코타
    };
    return colors[quality as keyof typeof colors] || '#8a7d71';
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]">
      {/* Animated Background pattern - Full Page */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 animate-pulse" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, var(--accent-primary) 35px, var(--accent-primary) 36px)`
        }}></div>
      </div>

      {/* Decorative circles - Full Page */}
      <div className="fixed top-10 right-20 w-72 h-72 rounded-full opacity-20 blur-3xl animate-pulse pointer-events-none"
           style={{ background: 'var(--gradient-primary)' }}></div>
      <div className="fixed bottom-10 left-20 w-96 h-96 rounded-full opacity-15 blur-3xl animate-pulse pointer-events-none"
           style={{ background: 'var(--gradient-secondary)', animationDelay: '1s' }}></div>
      <div className="fixed top-1/2 left-1/2 w-80 h-80 rounded-full opacity-10 blur-3xl animate-pulse pointer-events-none"
           style={{ background: 'var(--gradient-primary)', animationDelay: '2s' }}></div>

      {/* Hero Header */}
      <header className="relative">

        <div className="relative max-w-7xl mx-auto px-6 py-16">
          {/* Main Hero Section */}
          <div className="flex flex-col items-center text-center mb-12">
            {/* Main Title with Gradient */}
            <h1 className="relative mb-4 mt-8">
              <span className="text-7xl font-black tracking-tight bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 dark:from-orange-300 dark:via-red-400 dark:to-pink-400 bg-clip-text text-transparent drop-shadow-lg animate-gradient">
                치킨은 살 안 쪄
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-2xl font-bold text-[var(--text-secondary)] mb-3 tracking-wide">
              대한민국 치킨 영양 분석 데이터베이스
            </p>

            {/* Catchphrase */}
            <div className="flex items-center gap-3 px-6 py-3 rounded-full glass mb-8">
              <span className="text-lg font-semibold text-[var(--accent-primary)]">
                💪 건강하게 치킨 먹는 방법
              </span>
              <span className="text-sm text-[var(--text-muted)]">|</span>
              <span className="text-lg font-semibold text-[var(--accent-primary)]">
                📊 38종 영양소 완벽 분석
              </span>
            </div>

            {/* Theme Toggle - repositioned */}
            <div className="absolute top-6 right-6">
              <ThemeToggle />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="glass p-4">
              <p className="text-[var(--text-muted)] text-xs font-medium mb-1">총 메뉴</p>
              <p className="text-2xl font-bold text-[var(--text-primary)]">{menuItems.length}</p>
            </div>
            <div className="glass p-4">
              <p className="text-[var(--text-muted)] text-xs font-medium mb-1">브랜드</p>
              <p className="text-2xl font-bold text-[var(--text-primary)]">{brands.length}</p>
            </div>
            <div className="glass p-4">
              <p className="text-[var(--text-muted)] text-xs font-medium mb-1">영양소 분석</p>
              <p className="text-2xl font-bold text-[var(--text-primary)]">38종</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="메뉴 검색 (예: 뿌링클, 후라이드)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 rounded-xl bg-[var(--bg-card)] border-2 border-[var(--glass-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors text-lg"
            />
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl">🔍</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-6 pb-12">
        {/* Brand Filter */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">브랜드별 보기</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedBrand('all')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedBrand === 'all'
                  ? 'text-white shadow-lg'
                  : 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
              }`}
              style={selectedBrand === 'all' ? { background: 'var(--gradient-primary)' } : {}}
            >
              전체 ({menuItems.length})
            </button>
            {brands.map((brand) => {
              const count = menuItems.filter(item => item.brandId === brand.id).length;
              return (
                <button
                  key={brand.id}
                  onClick={() => setSelectedBrand(brand.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    selectedBrand === brand.id
                      ? 'text-white shadow-lg'
                      : 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                  }`}
                  style={selectedBrand === brand.id ? { background: 'var(--gradient-primary)' } : {}}
                >
                  {brand.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item: MenuItem) => (
            <div
              key={item.id}
              className="glass card-hover cursor-pointer overflow-hidden"
              onClick={() => setSelectedItem(item)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden"
                   style={{ background: 'var(--gradient-primary)' }}>
                <MenuImage
                  imageUrl={item.imageUrl}
                  imageUrls={item.imageUrls}
                  menuId={item.id}
                  brandId={item.brandId}
                  alt={item.nutrition.name}
                />
                {/* Health Score Badge */}
                <div className="absolute top-4 right-4 px-4 py-2 rounded-full backdrop-blur-md"
                     style={{
                       background: 'rgba(0, 0, 0, 0.5)',
                       border: `2px solid ${getHealthScoreColor(item.healthScore)}`
                     }}>
                  <span className="text-sm font-bold" style={{ color: getHealthScoreColor(item.healthScore) }}>
                    {item.healthScore}점
                  </span>
                </div>
                {/* Data Quality */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold"
                     style={{
                       background: getDataQualityColor(item.nutrition.dataQuality),
                       color: 'white'
                     }}>
                  {item.nutrition.dataQuality}등급
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">
                    {item.nutrition.name}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] font-medium">
                    {item.nutrition.brand}
                  </p>
                </div>

                {/* Pie Chart & Macros */}
                <div className="flex gap-4 mb-4">
                  {/* Pie Chart */}
                  <div className="flex-shrink-0">
                    <PieChart
                      protein={item.nutrition.protein}
                      carbs={item.nutrition.carbs}
                      fat={item.nutrition.fat}
                      size={110}
                    />
                  </div>

                  {/* Nutrition Stats */}
                  <div className="flex-1 grid grid-cols-1 gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ background: '#e76f51' }}></div>
                        <span className="text-xs text-[var(--text-secondary)]">단백질</span>
                      </div>
                      <span className="text-sm font-bold text-[var(--text-primary)]">
                        {item.nutrition.protein}g
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ background: '#f4a261' }}></div>
                        <span className="text-xs text-[var(--text-secondary)]">탄수화물</span>
                      </div>
                      <span className="text-sm font-bold text-[var(--text-primary)]">
                        {item.nutrition.carbs}g
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ background: '#52b788' }}></div>
                        <span className="text-xs text-[var(--text-secondary)]">지방</span>
                      </div>
                      <span className="text-sm font-bold text-[var(--text-primary)]">
                        {item.nutrition.fat}g
                      </span>
                    </div>
                    <div className="pt-1 border-t border-[var(--glass-border)]">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[var(--text-muted)]">총 칼로리</span>
                        <span className="text-lg font-bold text-[var(--accent-primary)]">
                          {item.nutrition.calories.toLocaleString()}
                          <span className="text-xs font-normal ml-1">kcal</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="text-center pt-2 border-t border-[var(--glass-border)]">
                  <span className="text-sm font-semibold text-[var(--accent-primary)]">
                    상세 영양 정보 보기 →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <div className="glass p-16 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl font-bold text-[var(--text-primary)] mb-2">검색 결과가 없습니다</p>
            <p className="text-[var(--text-secondary)]">다른 검색어를 입력해보세요</p>
          </div>
        )}
      </main>

      {/* Modal */}
      <NutritionModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
};

export default HomePage;
