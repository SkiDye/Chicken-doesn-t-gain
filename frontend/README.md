# 치킨은 살 안 쪄 - Frontend

React + TypeScript + Vite 기반 프론트엔드 애플리케이션

## 🚀 Quick Start

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프리뷰
npm run preview
```

## 📁 프로젝트 구조

```
src/
├── components/     # 재사용 가능한 컴포넌트
├── pages/          # 페이지 컴포넌트
│   └── HomePage.tsx
├── data/           # Mock 데이터
│   └── mockData.ts
├── types/          # TypeScript 타입 정의
│   └── nutrition.ts
├── stores/         # Zustand 상태 관리
├── utils/          # 유틸리티 함수
├── App.tsx
├── main.tsx
└── index.css       # 전역 스타일 (Glass-morphism)
```

## 🎨 디자인 시스템

### Glass-morphism 디자인
- 반투명 배경 효과
- Backdrop blur 적용
- Dark mode 기본 지원

### CSS 변수
```css
--bg-primary: #0f0f0f;
--bg-secondary: #1a1a1a;
--text-primary: #ffffff;
--text-secondary: #b3b3b3;
--accent-primary: #fbbf24;
--accent-secondary: #f59e0b;
--glass-bg: rgba(255, 255, 255, 0.05);
--glass-border: rgba(255, 255, 255, 0.1);
```

## 📊 Mock 데이터

현재 7개의 치킨 메뉴 데이터 포함:
- BHC 뿌링클 (1마리)
- 교촌 레드오리지널 (1마리)
- 푸라닭 후라이드 (1마리)
- 푸라닭 양념치킨 (반마리)
- 호식이 후라이드 (1마리)
- 호식이 양념치킨 (1마리)
- 60계 순살치킨 (300g)

각 메뉴에는 38가지 필수 영양소 데이터가 포함되어 있습니다.

## 🔧 기술 스택

- **React 18** - UI 프레임워크
- **TypeScript 5** - 타입 안전성
- **Vite 5** - 빌드 도구
- **Tailwind CSS 3** - 유틸리티 CSS
- **React Router 6** - 라우팅 (준비됨)
- **Zustand 4** - 상태 관리 (준비됨)
- **Axios 1** - HTTP 클라이언트 (준비됨)
- **Recharts 2** - 차트 라이브러리 (준비됨)

## 🎯 현재 구현된 기능

### HomePage
- ✅ 치킨 메뉴 카드 그리드 레이아웃
- ✅ 브랜드별 필터링 (전체, BHC, 교촌, 푸라닭, 호식이, 60계)
- ✅ 검색 기능
- ✅ 건강 점수 표시 (0-100점)
- ✅ 칼로리/단백질/지방 요약
- ✅ 데이터 등급 배지 (A/B/C)
- ✅ Glass-morphism 디자인 적용
- ✅ 반응형 그리드 (1열/2열/3열)

## 🚧 다음 단계

Phase 2-6 구현 예정:
1. 상세 페이지 (영양소 38종 시각화)
2. 건강 점수 알고리즘 구현
3. 비교 기능
4. 백엔드 API 연동
5. 실제 브랜드 데이터 수집

## 📝 참고

이 프로젝트는 `nutrition-checker` 프로젝트의 영양소 분석 로직과 디자인 패턴을 참고하여 제작되었습니다.
