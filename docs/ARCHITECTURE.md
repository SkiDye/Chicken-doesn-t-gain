# 시스템 아키텍처 설계서

## 📐 전체 아키텍처

### 시스템 구성도

```
┌─────────────────────────────────────────────────────────────┐
│                        사용자 (Browser)                       │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      │ HTTPS
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                    Frontend (React)                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   검색/필터   │  │  영양 분석   │  │  시각화 UI   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ 건강 점수    │  │  브랜드 비교  │  │  반응형 레이아웃│    │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      │ REST API
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                  Backend (Node.js + Express)                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Menu API    │  │  Brand API   │  │  Health API  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Nutrition   │  │ Search API   │  │  Analytics   │      │
│  │  Calculator  │  └──────────────┘  │  API         │      │
│  └──────────────┘                     └──────────────┘      │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      │ Prisma ORM
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                   Database (PostgreSQL)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Brands     │  │  MenuItems   │  │  Nutrition   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │   Reviews    │  │  Analytics   │                        │
│  └──────────────┘  └──────────────┘                        │
└─────────────────────────────────────────────────────────────┘
```

## 🎨 Frontend 아키텍처

### 기술 스택

| 구분 | 기술 | 버전 | 목적 |
|------|------|------|------|
| 프레임워크 | React | 18.x | UI 라이브러리 |
| 언어 | TypeScript | 5.x | 타입 안정성 |
| 빌드 도구 | Vite | 5.x | 빠른 개발 환경 |
| 스타일링 | Tailwind CSS | 3.x | 유틸리티 기반 CSS |
| 상태 관리 | Zustand | 4.x | 경량 상태 관리 |
| 라우팅 | React Router | 6.x | SPA 라우팅 |
| HTTP 클라이언트 | Axios | 1.x | API 통신 |
| 데이터 시각화 | Recharts | 2.x | 차트 라이브러리 |
| 폼 관리 | React Hook Form | 7.x | 폼 처리 |
| UI 컴포넌트 | shadcn/ui | - | 재사용 가능한 컴포넌트 |

---

### 기술 스택 선정 이유 및 비교

#### 1. 프레임워크: React vs Vue vs Svelte

**선택: React 18**

| 기준 | React | Vue | Svelte |
|------|-------|-----|--------|
| 생태계 | ⭐⭐⭐⭐⭐ 매우 풍부 | ⭐⭐⭐⭐ 풍부 | ⭐⭐⭐ 성장 중 |
| 학습 곡선 | ⭐⭐⭐ 중간 | ⭐⭐⭐⭐ 쉬움 | ⭐⭐⭐⭐ 쉬움 |
| 타입스크립트 | ⭐⭐⭐⭐⭐ 완벽 | ⭐⭐⭐⭐ 좋음 | ⭐⭐⭐⭐ 좋음 |
| 커뮤니티 | ⭐⭐⭐⭐⭐ 최대 | ⭐⭐⭐⭐ 큼 | ⭐⭐⭐ 중간 |
| 성능 | ⭐⭐⭐⭐ 좋음 | ⭐⭐⭐⭐ 좋음 | ⭐⭐⭐⭐⭐ 매우 좋음 |

**선택 이유**:
- ✅ 가장 많은 라이브러리 생태계 (Recharts, shadcn/ui 등)
- ✅ TypeScript 완벽 지원
- ✅ 차트/시각화 라이브러리 다양
- ✅ 대규모 커뮤니티 (문제 해결 용이)
- ✅ 취업 시장에서 가장 수요 높음

**장점**:
- 📦 풍부한 서드파티 라이브러리
- 📚 방대한 학습 자료 및 커뮤니티
- 🔄 컴포넌트 재사용성 뛰어남
- 🎯 선언형 UI로 직관적

**단점**:
- 🐌 초기 번들 크기 큼 (Vite로 완화)
- 📖 학습 곡선 (Hooks, 리렌더링 최적화)
- 🔧 보일러플레이트 코드

---

#### 2. 언어: TypeScript vs JavaScript

**선택: TypeScript 5**

| 기준 | TypeScript | JavaScript |
|------|------------|------------|
| 타입 안정성 | ⭐⭐⭐⭐⭐ 완벽 | ❌ 없음 |
| 개발 경험 | ⭐⭐⭐⭐⭐ 자동완성 | ⭐⭐⭐ 보통 |
| 러닝커브 | ⭐⭐⭐ 중간 | ⭐⭐⭐⭐⭐ 쉬움 |
| 빌드 시간 | ⭐⭐⭐⭐ 빠름 | ⭐⭐⭐⭐⭐ 매우 빠름 |
| 유지보수 | ⭐⭐⭐⭐⭐ 우수 | ⭐⭐⭐ 보통 |

**선택 이유**:
- ✅ 영양소 데이터 타입이 복잡함 (38가지 필드)
- ✅ API 응답 타입 검증 필수
- ✅ 장기 개발 및 인수인계 시 타입이 문서 역할
- ✅ IDE 자동완성으로 개발 속도 향상

**장점**:
- 🛡️ 런타임 에러 사전 방지
- 💡 IntelliSense 지원 (자동완성)
- 📝 타입이 문서화 역할
- 🔍 리팩토링 안전

**단점**:
- 📚 학습 시간 필요
- ⏱️ 초기 설정 시간
- 📄 코드량 증가

---

#### 3. 빌드 도구: Vite vs Webpack vs Create React App

**선택: Vite 5**

| 기준 | Vite | Webpack | CRA |
|------|------|---------|-----|
| 개발 서버 속도 | ⭐⭐⭐⭐⭐ 매우 빠름 | ⭐⭐⭐ 보통 | ⭐⭐⭐ 보통 |
| HMR 속도 | ⭐⭐⭐⭐⭐ 즉시 | ⭐⭐⭐⭐ 빠름 | ⭐⭐⭐⭐ 빠름 |
| 빌드 속도 | ⭐⭐⭐⭐⭐ 빠름 | ⭐⭐⭐ 보통 | ⭐⭐⭐ 보통 |
| 설정 난이도 | ⭐⭐⭐⭐⭐ 쉬움 | ⭐⭐ 어려움 | ⭐⭐⭐⭐⭐ 매우 쉬움 |
| 커뮤니티 | ⭐⭐⭐⭐ 성장 중 | ⭐⭐⭐⭐⭐ 최대 | ⭐⭐⭐⭐ 큼 |

**선택 이유**:
- ✅ 개발 서버 시작 속도 10배 이상 빠름
- ✅ HMR(Hot Module Replacement) 즉각 반영
- ✅ 설정이 거의 필요 없음 (Zero-config)
- ✅ React 공식 권장 도구

**장점**:
- ⚡ 번개같이 빠른 개발 경험
- 🎯 ESM 기반 최적화
- 🔧 설정이 간단함
- 📦 Rollup 기반 프로덕션 빌드

**단점**:
- 🆕 상대적으로 최신 (2020년 출시)
- 🔌 일부 레거시 플러그인 미지원
- 📚 Webpack 대비 자료 적음

---

#### 4. 스타일링: Tailwind CSS vs CSS Modules vs Styled Components

**선택: Tailwind CSS 3**

| 기준 | Tailwind | CSS Modules | Styled Components |
|------|----------|-------------|-------------------|
| 개발 속도 | ⭐⭐⭐⭐⭐ 매우 빠름 | ⭐⭐⭐ 보통 | ⭐⭐⭐⭐ 빠름 |
| 번들 크기 | ⭐⭐⭐⭐⭐ 작음 (PurgeCSS) | ⭐⭐⭐⭐ 작음 | ⭐⭐⭐ 보통 |
| 유지보수 | ⭐⭐⭐⭐⭐ 우수 | ⭐⭐⭐⭐ 좋음 | ⭐⭐⭐ 보통 |
| 다크모드 | ⭐⭐⭐⭐⭐ 내장 | ⭐⭐⭐ 직접 구현 | ⭐⭐⭐⭐ 가능 |
| 반응형 | ⭐⭐⭐⭐⭐ 간편 | ⭐⭐⭐ 보통 | ⭐⭐⭐ 보통 |

**선택 이유**:
- ✅ 유틸리티 클래스로 빠른 프로토타이핑
- ✅ 다크모드 내장 (`dark:` prefix)
- ✅ 반응형 디자인 간편 (`md:`, `lg:` 등)
- ✅ shadcn/ui와 완벽 호환

**장점**:
- 🚀 매우 빠른 개발 속도
- 🎨 일관된 디자인 시스템
- 📱 반응형 디자인 간편
- 🌓 다크모드 쉽게 구현
- 📦 사용하지 않는 CSS 자동 제거

**단점**:
- 📖 초기 학습 필요 (클래스명 암기)
- 📄 HTML이 길어짐
- 🎨 디자인 제약 (커스터마이징 필요 시)

---

#### 5. 상태 관리: Zustand vs Redux vs Recoil

**선택: Zustand 4**

| 기준 | Zustand | Redux Toolkit | Recoil |
|------|---------|---------------|--------|
| 코드량 | ⭐⭐⭐⭐⭐ 매우 적음 | ⭐⭐⭐ 보통 | ⭐⭐⭐⭐ 적음 |
| 학습 곡선 | ⭐⭐⭐⭐⭐ 쉬움 | ⭐⭐ 어려움 | ⭐⭐⭐ 보통 |
| 번들 크기 | ⭐⭐⭐⭐⭐ 1KB | ⭐⭐⭐ 10KB | ⭐⭐⭐⭐ 5KB |
| 개발 도구 | ⭐⭐⭐ 기본 | ⭐⭐⭐⭐⭐ 매우 강력 | ⭐⭐⭐⭐ 강력 |
| 성능 | ⭐⭐⭐⭐⭐ 우수 | ⭐⭐⭐⭐ 좋음 | ⭐⭐⭐⭐⭐ 우수 |

**선택 이유**:
- ✅ 프로젝트 규모가 중소형 (복잡한 상태관리 불필요)
- ✅ 보일러플레이트 거의 없음
- ✅ 매우 가벼움 (1KB)
- ✅ React Hooks와 자연스럽게 통합

**장점**:
- 🪶 초경량 라이브러리
- 📝 간단한 API (3개 함수만 알면 됨)
- ⚡ 빠른 성능
- 🎯 필요한 부분만 리렌더링
- 🧪 테스트 용이

**단점**:
- 🔍 Redux DevTools 연동 약함
- 📚 대규모 앱에는 Redux가 나을 수도
- 🔌 미들웨어 생태계 작음

---

#### 6. HTTP 클라이언트: Axios vs Fetch API vs React Query

**선택: Axios 1**

| 기준 | Axios | Fetch API | React Query + Fetch |
|------|-------|-----------|---------------------|
| 편의성 | ⭐⭐⭐⭐⭐ 매우 편함 | ⭐⭐⭐ 보통 | ⭐⭐⭐⭐⭐ 매우 편함 |
| 브라우저 지원 | ⭐⭐⭐⭐⭐ 완벽 | ⭐⭐⭐⭐ 좋음 (IE 제외) | ⭐⭐⭐⭐ 좋음 |
| 인터셉터 | ⭐⭐⭐⭐⭐ 내장 | ❌ 직접 구현 | ⭐⭐⭐⭐ 미들웨어 |
| 에러 처리 | ⭐⭐⭐⭐⭐ 우수 | ⭐⭐⭐ 보통 | ⭐⭐⭐⭐⭐ 우수 |
| 번들 크기 | ⭐⭐⭐⭐ 13KB | ⭐⭐⭐⭐⭐ 0KB (내장) | ⭐⭐⭐ 40KB |

**선택 이유**:
- ✅ JSON 자동 변환
- ✅ 요청/응답 인터셉터 (토큰 자동 추가 등)
- ✅ 에러 핸들링 간편
- ✅ 진행 상황 추적 가능

**장점**:
- 📦 JSON 자동 변환
- 🔐 인터셉터로 인증 토큰 관리
- ⏱️ 타임아웃 설정 간편
- 🌐 구형 브라우저 지원
- 🛡️ CSRF 보호 내장

**단점**:
- 📦 추가 번들 크기 (13KB)
- 🔄 Fetch API로도 충분할 수 있음

**대안 고려사항**:
- **React Query**: 캐싱, 자동 재시도 필요 시 추천 (Phase 6 고도화 시 고려)

---

#### 7. 데이터 시각화: Recharts vs Chart.js vs D3.js

**선택: Recharts 2**

| 기준 | Recharts | Chart.js | D3.js |
|------|----------|----------|-------|
| React 통합 | ⭐⭐⭐⭐⭐ 완벽 | ⭐⭐⭐ 보통 | ⭐⭐ 어려움 |
| 사용 편의성 | ⭐⭐⭐⭐⭐ 쉬움 | ⭐⭐⭐⭐ 쉬움 | ⭐⭐ 어려움 |
| 커스터마이징 | ⭐⭐⭐⭐ 좋음 | ⭐⭐⭐⭐ 좋음 | ⭐⭐⭐⭐⭐ 완벽 |
| 차트 종류 | ⭐⭐⭐⭐ 다양 | ⭐⭐⭐⭐⭐ 매우 다양 | ⭐⭐⭐⭐⭐ 무제한 |
| 성능 | ⭐⭐⭐⭐ 좋음 | ⭐⭐⭐⭐⭐ 매우 좋음 | ⭐⭐⭐⭐⭐ 우수 |

**선택 이유**:
- ✅ React 컴포넌트 방식으로 사용
- ✅ 필요한 차트 종류 모두 지원 (Pie, Bar, Radar)
- ✅ 반응형 차트 기본 제공
- ✅ TypeScript 타입 지원

**장점**:
- 🧩 React 컴포넌트로 선언적 사용
- 📱 반응형 차트 자동
- 🎨 커스터마이징 충분
- 📊 필요한 차트 모두 제공

**단점**:
- 📦 번들 크기 큼 (150KB)
- 🎨 매우 복잡한 차트는 D3.js가 나음
- ⚡ 대량 데이터 시 성능 이슈 가능

---

#### 8. UI 컴포넌트: shadcn/ui vs Material-UI vs Ant Design

**선택: shadcn/ui**

| 기준 | shadcn/ui | Material-UI | Ant Design |
|------|-----------|-------------|------------|
| 커스터마이징 | ⭐⭐⭐⭐⭐ 완전 자유 | ⭐⭐⭐ 제한적 | ⭐⭐⭐ 제한적 |
| 번들 크기 | ⭐⭐⭐⭐⭐ 최소 (필요한 것만) | ⭐⭐⭐ 큼 | ⭐⭐ 매우 큼 |
| 디자인 | ⭐⭐⭐⭐⭐ 모던 | ⭐⭐⭐⭐ Material Design | ⭐⭐⭐⭐ 기업형 |
| Tailwind 통합 | ⭐⭐⭐⭐⭐ 완벽 | ⭐⭐ 어려움 | ⭐⭐ 어려움 |
| 타입스크립트 | ⭐⭐⭐⭐⭐ 완벽 | ⭐⭐⭐⭐⭐ 완벽 | ⭐⭐⭐⭐⭐ 완벽 |

**선택 이유**:
- ✅ 코드를 직접 프로젝트에 복사 (의존성 최소화)
- ✅ Tailwind CSS와 완벽 통합
- ✅ Radix UI 기반 (접근성 우수)
- ✅ 완전한 커스터마이징 가능

**장점**:
- 🎨 완전한 스타일 제어
- 📦 필요한 컴포넌트만 설치
- ♿ 접근성 우수 (Radix UI 기반)
- 🌓 다크모드 기본 지원
- 📝 코드가 내 프로젝트에 있음

**단점**:
- 📋 컴포넌트 수가 적음 (직접 추가 필요)
- 🆕 상대적으로 최신 (2023년)
- 📚 학습 자료 적음

### 폴더 구조

```
frontend/
├── src/
│   ├── components/           # 재사용 가능한 컴포넌트
│   │   ├── common/          # 공통 컴포넌트
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Card.tsx
│   │   ├── layout/          # 레이아웃 컴포넌트
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── menu/            # 메뉴 관련 컴포넌트
│   │   │   ├── MenuCard.tsx
│   │   │   ├── MenuList.tsx
│   │   │   └── MenuFilter.tsx
│   │   ├── nutrition/       # 영양 분석 컴포넌트
│   │   │   ├── NutritionChart.tsx
│   │   │   ├── NutritionTable.tsx
│   │   │   └── HealthScore.tsx
│   │   └── brand/           # 브랜드 관련 컴포넌트
│   │       ├── BrandCard.tsx
│   │       └── BrandList.tsx
│   ├── pages/               # 페이지 컴포넌트
│   │   ├── Home.tsx
│   │   ├── MenuDetail.tsx
│   │   ├── BrandList.tsx
│   │   ├── Compare.tsx
│   │   └── About.tsx
│   ├── hooks/               # 커스텀 훅
│   │   ├── useMenu.ts
│   │   ├── useBrand.ts
│   │   └── useNutrition.ts
│   ├── stores/              # Zustand 스토어
│   │   ├── menuStore.ts
│   │   ├── brandStore.ts
│   │   └── filterStore.ts
│   ├── services/            # API 서비스
│   │   ├── api.ts
│   │   ├── menuService.ts
│   │   ├── brandService.ts
│   │   └── nutritionService.ts
│   ├── types/               # TypeScript 타입 정의
│   │   ├── menu.ts
│   │   ├── brand.ts
│   │   └── nutrition.ts
│   ├── utils/               # 유틸리티 함수
│   │   ├── nutrition.ts
│   │   ├── healthScore.ts
│   │   └── format.ts
│   ├── constants/           # 상수
│   │   ├── nutrition.ts
│   │   └── config.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
│   ├── images/
│   └── favicon.ico
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

### 주요 컴포넌트 설계

#### 1. MenuCard 컴포넌트

```typescript
interface MenuCardProps {
  id: string;
  name: string;
  brand: string;
  image: string;
  calories: number;
  healthScore: number;
  nutrition: NutritionInfo;
  onClick?: () => void;
}

// 메뉴 카드 - 검색 결과, 브랜드별 메뉴 리스트에서 사용
```

#### 2. NutritionChart 컴포넌트

```typescript
interface NutritionChartProps {
  nutrition: NutritionInfo;
  type: 'pie' | 'bar' | 'radar';
  showLabels?: boolean;
}

// 영양 성분을 시각화하는 차트 컴포넌트
```

#### 3. HealthScore 컴포넌트

```typescript
interface HealthScoreProps {
  score: number; // 0-100
  breakdown: ScoreBreakdown;
  showDetails?: boolean;
}

// 건강 점수 표시 컴포넌트
```

### 상태 관리 전략

#### Zustand Store 구조

```typescript
// menuStore.ts
interface MenuStore {
  menus: MenuItem[];
  selectedMenu: MenuItem | null;
  filters: MenuFilters;
  setMenus: (menus: MenuItem[]) => void;
  setSelectedMenu: (menu: MenuItem) => void;
  updateFilters: (filters: Partial<MenuFilters>) => void;
}

// filterStore.ts
interface FilterStore {
  brands: string[];
  calorieRange: [number, number];
  healthScoreMin: number;
  sortBy: 'healthScore' | 'calories' | 'name';
  resetFilters: () => void;
}
```

## 🔧 Backend 아키텍처

### 기술 스택

| 구분 | 기술 | 버전 | 목적 |
|------|------|------|------|
| 런타임 | Node.js | 20.x | JavaScript 런타임 |
| 프레임워크 | Express | 4.x | 웹 프레임워크 |
| 언어 | TypeScript | 5.x | 타입 안정성 |
| ORM | Prisma | 5.x | 데이터베이스 ORM |
| 인증 | JWT | 9.x | 토큰 기반 인증 (추후) |
| 유효성 검사 | Zod | 3.x | 스키마 검증 |
| 로깅 | Winston | 3.x | 로그 관리 |

---

### 기술 스택 선정 이유 및 비교

#### 1. 런타임: Node.js vs Deno vs Bun

**선택: Node.js 20**

| 기준 | Node.js | Deno | Bun |
|------|---------|------|-----|
| 성숙도 | ⭐⭐⭐⭐⭐ 매우 성숙 | ⭐⭐⭐ 성장 중 | ⭐⭐ 초기 단계 |
| 생태계 | ⭐⭐⭐⭐⭐ 방대한 npm | ⭐⭐⭐ 성장 중 | ⭐⭐ 제한적 |
| 성능 | ⭐⭐⭐⭐ 좋음 | ⭐⭐⭐⭐ 좋음 | ⭐⭐⭐⭐⭐ 매우 빠름 |
| 타입스크립트 | ⭐⭐⭐⭐ ts-node 필요 | ⭐⭐⭐⭐⭐ 네이티브 지원 | ⭐⭐⭐⭐⭐ 네이티브 지원 |
| 배포 지원 | ⭐⭐⭐⭐⭐ 모든 플랫폼 | ⭐⭐⭐ 제한적 | ⭐⭐ 매우 제한적 |

**선택 이유**:
- ✅ 가장 안정적이고 검증된 플랫폼
- ✅ Railway, Render 등 무료 배포 지원
- ✅ Prisma, Express 등 모든 라이브러리 완벽 지원
- ✅ 방대한 커뮤니티 및 학습 자료

**장점**:
- 🏆 가장 많은 패키지 생태계 (npm)
- 📚 풍부한 학습 자료 및 커뮤니티
- 🚀 모든 호스팅 플랫폼 지원
- 🔧 성숙한 도구 및 디버깅

**단점**:
- 🐌 Bun보다 느림
- 📦 TypeScript 네이티브 지원 안 됨
- 🔒 보안 모델이 Deno보다 약함

---

#### 2. 프레임워크: Express vs Fastify vs NestJS

**선택: Express 4**

| 기준 | Express | Fastify | NestJS |
|------|---------|---------|--------|
| 간결성 | ⭐⭐⭐⭐⭐ 매우 간단 | ⭐⭐⭐⭐ 간단 | ⭐⭐ 복잡 |
| 성능 | ⭐⭐⭐⭐ 좋음 | ⭐⭐⭐⭐⭐ 매우 빠름 | ⭐⭐⭐⭐ 좋음 |
| 생태계 | ⭐⭐⭐⭐⭐ 최대 | ⭐⭐⭐⭐ 성장 중 | ⭐⭐⭐⭐ 풍부 |
| 학습 곡선 | ⭐⭐⭐⭐⭐ 쉬움 | ⭐⭐⭐⭐ 쉬움 | ⭐⭐ 어려움 |
| TypeScript | ⭐⭐⭐⭐ 좋음 | ⭐⭐⭐⭐⭐ 완벽 | ⭐⭐⭐⭐⭐ 완벽 |

**선택 이유**:
- ✅ 가장 간단하고 직관적
- ✅ 프로젝트 규모에 맞는 가벼운 프레임워크
- ✅ 방대한 미들웨어 생태계
- ✅ 빠른 프로토타이핑

**장점**:
- 🪶 미니멀한 구조
- 📦 수많은 미들웨어
- 📚 가장 많은 학습 자료
- 🔧 자유로운 구조 설계

**단점**:
- 🐌 Fastify보다 느림 (하지만 충분히 빠름)
- 🏗️ 구조가 자유로워 일관성 필요
- 🔌 콜백 기반 (async/await 수동 처리)

**대안 고려사항**:
- **Fastify**: 성능 최우선 시
- **NestJS**: 대규모 엔터프라이즈급 구조 필요 시

---

#### 3. ORM: Prisma vs TypeORM vs Sequelize

**선택: Prisma 5**

| 기준 | Prisma | TypeORM | Sequelize |
|------|--------|---------|-----------|
| 타입 안정성 | ⭐⭐⭐⭐⭐ 완벽 | ⭐⭐⭐⭐ 좋음 | ⭐⭐⭐ 보통 |
| 개발 경험 | ⭐⭐⭐⭐⭐ 우수 | ⭐⭐⭐ 보통 | ⭐⭐⭐ 보통 |
| 마이그레이션 | ⭐⭐⭐⭐⭐ 자동화 | ⭐⭐⭐⭐ 좋음 | ⭐⭐⭐ 수동 |
| 쿼리 빌더 | ⭐⭐⭐⭐⭐ 직관적 | ⭐⭐⭐⭐ 좋음 | ⭐⭐⭐ 보통 |
| 성능 | ⭐⭐⭐⭐ 좋음 | ⭐⭐⭐⭐ 좋음 | ⭐⭐⭐⭐ 좋음 |

**선택 이유**:
- ✅ TypeScript 완벽 지원 (자동 타입 생성)
- ✅ Prisma Studio (GUI 데이터 관리)
- ✅ 마이그레이션 자동화
- ✅ 직관적인 스키마 문법

**장점**:
- 🎯 스키마 기반 타입 자동 생성
- 🖥️ Prisma Studio (GUI)
- ⚡ 자동 마이그레이션
- 📝 깔끔한 쿼리 문법
- 🛡️ SQL Injection 자동 방지

**단점**:
- 🆕 상대적으로 최신 (2019년)
- 🔌 일부 고급 쿼리는 Raw SQL 필요
- 📦 번들 크기 큼

**대안 고려사항**:
- **TypeORM**: 레거시 프로젝트 호환 필요 시
- **Drizzle ORM**: 더 가벼운 대안 (2023년 등장)

---

#### 4. 유효성 검사: Zod vs Joi vs Yup

**선택: Zod 3**

| 기준 | Zod | Joi | Yup |
|------|-----|-----|-----|
| TypeScript | ⭐⭐⭐⭐⭐ 완벽 | ⭐⭐⭐ 보통 | ⭐⭐⭐⭐ 좋음 |
| 타입 추론 | ⭐⭐⭐⭐⭐ 자동 | ❌ 수동 | ⭐⭐⭐ 제한적 |
| API | ⭐⭐⭐⭐⭐ 체이닝 | ⭐⭐⭐⭐ 좋음 | ⭐⭐⭐⭐ 좋음 |
| 번들 크기 | ⭐⭐⭐⭐ 9KB | ⭐⭐⭐ 145KB | ⭐⭐⭐⭐ 41KB |
| 에러 메시지 | ⭐⭐⭐⭐⭐ 상세 | ⭐⭐⭐⭐ 좋음 | ⭐⭐⭐⭐ 좋음 |

**선택 이유**:
- ✅ TypeScript 타입 자동 추론
- ✅ Prisma와 궁합 좋음
- ✅ React Hook Form과 완벽 통합
- ✅ 작은 번들 크기

**장점**:
- 🎯 스키마에서 TypeScript 타입 자동 생성
- 📦 작은 번들 크기
- 🔗 체이닝 API
- 🛡️ 런타임 검증 + 타입 안정성

**단점**:
- 🆕 Joi/Yup보다 최신
- 📚 학습 자료 상대적으로 적음

---

#### 5. 로깅: Winston vs Pino vs Morgan

**선택: Winston 3**

| 기준 | Winston | Pino | Morgan |
|------|---------|------|--------|
| 기능 | ⭐⭐⭐⭐⭐ 풍부 | ⭐⭐⭐⭐ 좋음 | ⭐⭐⭐ 기본 |
| 성능 | ⭐⭐⭐⭐ 좋음 | ⭐⭐⭐⭐⭐ 매우 빠름 | ⭐⭐⭐⭐ 좋음 |
| 트랜스포트 | ⭐⭐⭐⭐⭐ 다양 | ⭐⭐⭐⭐ 좋음 | ⭐⭐ 제한적 |
| 설정 | ⭐⭐⭐⭐ 유연 | ⭐⭐⭐⭐⭐ 간단 | ⭐⭐⭐⭐⭐ 매우 간단 |
| 커뮤니티 | ⭐⭐⭐⭐⭐ 최대 | ⭐⭐⭐⭐ 성장 중 | ⭐⭐⭐⭐ 큼 |

**선택 이유**:
- ✅ 다양한 로그 레벨 (error, warn, info, debug)
- ✅ 여러 트랜스포트 (콘솔, 파일, 외부 서비스)
- ✅ 커스터마이징 자유로움
- ✅ 가장 널리 사용됨

**장점**:
- 📊 다양한 로그 레벨
- 📤 여러 출력 대상 (파일, DB, 외부 서비스)
- 🎨 포맷 커스터마이징
- 🔧 풍부한 플러그인

**단점**:
- 🐌 Pino보다 느림
- 🔧 설정이 복잡할 수 있음

**대안 고려사항**:
- **Pino**: 성능 최우선 시
- **Morgan**: HTTP 로그만 필요 시

---

### 폴더 구조

```
backend/
├── src/
│   ├── controllers/         # 컨트롤러
│   │   ├── menuController.ts
│   │   ├── brandController.ts
│   │   └── nutritionController.ts
│   ├── services/            # 비즈니스 로직
│   │   ├── menuService.ts
│   │   ├── brandService.ts
│   │   ├── nutritionService.ts
│   │   └── healthScoreService.ts
│   ├── routes/              # 라우트 정의
│   │   ├── menuRoutes.ts
│   │   ├── brandRoutes.ts
│   │   └── nutritionRoutes.ts
│   ├── middleware/          # 미들웨어
│   │   ├── errorHandler.ts
│   │   ├── validator.ts
│   │   └── logger.ts
│   ├── utils/               # 유틸리티
│   │   ├── nutrition.ts
│   │   └── healthScore.ts
│   ├── types/               # 타입 정의
│   │   ├── menu.ts
│   │   ├── brand.ts
│   │   └── nutrition.ts
│   ├── config/              # 설정
│   │   ├── database.ts
│   │   └── env.ts
│   ├── prisma/              # Prisma 설정
│   │   └── schema.prisma
│   ├── app.ts               # Express 앱 설정
│   └── server.ts            # 서버 진입점
├── tests/                   # 테스트
│   ├── unit/
│   └── integration/
├── package.json
├── tsconfig.json
└── .env.example
```

### API 설계

#### REST API 엔드포인트

```
GET    /api/brands                    # 브랜드 목록
GET    /api/brands/:id                # 브랜드 상세
GET    /api/brands/:id/menus          # 브랜드별 메뉴

GET    /api/menus                     # 메뉴 목록 (필터링, 정렬)
GET    /api/menus/:id                 # 메뉴 상세
POST   /api/menus/compare             # 메뉴 비교
GET    /api/menus/search              # 메뉴 검색

GET    /api/nutrition/:menuId         # 영양 정보
POST   /api/nutrition/analyze         # 영양 분석

GET    /api/health-score/:menuId      # 건강 점수
POST   /api/health-score/calculate    # 건강 점수 계산
```

#### API 응답 형식

```typescript
// 성공 응답
{
  success: true,
  data: { ... },
  message: "Success"
}

// 에러 응답
{
  success: false,
  error: {
    code: "ERROR_CODE",
    message: "Error message",
    details: { ... }
  }
}
```

### 건강 점수 알고리즘

nutrition-checker 프로젝트의 영양소 분석 로직을 참고하여 설계:

```typescript
interface HealthScoreCalculation {
  // 기본 점수 (40점)
  calorieScore: number;      // 칼로리 적정성 (15점)
  macroBalance: number;       // 탄단지 균형 (15점)
  sodiumScore: number;        // 나트륨 점수 (10점)

  // 영양소 점수 (40점)
  proteinQuality: number;     // 단백질 품질 (10점)
  vitaminScore: number;       // 비타민 (10점)
  mineralScore: number;       // 미네랄 (10점)
  fiberScore: number;         // 식이섬유 (10점)

  // 가산점 (20점)
  essentialNutrients: number; // 필수영양소 (10점)
  healthyFats: number;        // 건강한 지방 (5점)
  lowSugar: number;           // 저당 (5점)

  total: number;              // 총점 (100점)
}

// 점수 계산 로직
function calculateHealthScore(nutrition: NutritionInfo): number {
  // 1. 칼로리 점수 (권장 섭취량 대비)
  const calorieScore = calculateCalorieScore(nutrition.calories);

  // 2. 영양소 균형 점수
  const macroBalance = calculateMacroBalance(
    nutrition.carbs,
    nutrition.protein,
    nutrition.fat
  );

  // 3. 나트륨 점수 (낮을수록 좋음)
  const sodiumScore = calculateSodiumScore(nutrition.sodium);

  // 4. 필수영양소 점수
  const nutrientScore = calculateNutrientScore(nutrition);

  return Math.round(
    calorieScore + macroBalance + sodiumScore + nutrientScore
  );
}
```

## 💾 데이터베이스 아키텍처

### 데이터베이스: PostgreSQL vs MySQL vs MongoDB

**선택: PostgreSQL 14+**

| 기준 | PostgreSQL | MySQL | MongoDB |
|------|------------|-------|---------|
| 데이터 모델 | ⭐⭐⭐⭐⭐ 관계형 | ⭐⭐⭐⭐⭐ 관계형 | ⭐⭐⭐ NoSQL |
| JSON 지원 | ⭐⭐⭐⭐⭐ 완벽 | ⭐⭐⭐⭐ 좋음 | ⭐⭐⭐⭐⭐ 네이티브 |
| 복잡한 쿼리 | ⭐⭐⭐⭐⭐ 매우 강력 | ⭐⭐⭐⭐ 강력 | ⭐⭐⭐ 제한적 |
| 무료 호스팅 | ⭐⭐⭐⭐⭐ 많음 | ⭐⭐⭐⭐ 많음 | ⭐⭐⭐⭐ 많음 |
| Prisma 지원 | ⭐⭐⭐⭐⭐ 완벽 | ⭐⭐⭐⭐⭐ 완벽 | ⭐⭐⭐⭐ 좋음 |
| 성능 | ⭐⭐⭐⭐⭐ 우수 | ⭐⭐⭐⭐⭐ 우수 | ⭐⭐⭐⭐⭐ 매우 빠름 |

**선택 이유**:
- ✅ 브랜드-메뉴-영양소 간 명확한 관계형 구조
- ✅ ACID 보장으로 데이터 정합성 유지
- ✅ 복잡한 조인 쿼리 최적화 (브랜드별 메뉴, 영양소 필터링)
- ✅ JSON/JSONB로 유연한 영양소 데이터 저장 가능
- ✅ Railway, Render, Supabase 무료 호스팅

**장점**:
- 🏗️ 강력한 관계형 데이터 모델
- 🔍 복잡한 쿼리 및 집계 함수
- 📊 JSONB로 반구조화 데이터 지원
- 🛡️ 트랜잭션 및 ACID 보장
- 🚀 전문 검색 (Full-text search)
- 📈 확장성 우수

**단점**:
- 🔧 초기 설정이 MySQL보다 복잡할 수 있음
- 📚 MongoDB보다 스키마 변경 까다로움
- 💾 작은 데이터셋에서 MongoDB보다 느릴 수 있음

**대안 고려사항**:
- **MySQL**: 단순한 관계형 DB만 필요 시
- **MongoDB**: 스키마가 자주 변경되거나 비정형 데이터 많을 시
- **SQLite**: 로컬 개발 및 초소형 프로젝트 (배포 불가)

---

### PostgreSQL 선택 세부 이유

1. **관계형 데이터**: 브랜드-메뉴-영양소 간 명확한 관계
2. **ACID 보장**: 데이터 정합성 중요
3. **확장성**: 향후 대용량 데이터 처리
4. **JSON 지원**: 영양소 데이터 유연하게 저장
5. **무료 호스팅**: Railway, Render 등 무료 옵션

### 주요 테이블 (간략 버전)

자세한 스키마는 [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) 참고

```
Brands           # 브랜드
  └── MenuItems  # 메뉴
        └── NutritionInfo  # 영양 정보
```

## 🚀 배포 아키텍처

### 배포 플랫폼 선택

#### Frontend 배포: Vercel vs Netlify vs GitHub Pages

**선택: Vercel**

| 기준 | Vercel | Netlify | GitHub Pages |
|------|--------|---------|--------------|
| React 지원 | ⭐⭐⭐⭐⭐ 완벽 | ⭐⭐⭐⭐⭐ 완벽 | ⭐⭐⭐⭐ 좋음 |
| 배포 속도 | ⭐⭐⭐⭐⭐ 매우 빠름 | ⭐⭐⭐⭐⭐ 매우 빠름 | ⭐⭐⭐ 보통 |
| CDN | ⭐⭐⭐⭐⭐ 글로벌 | ⭐⭐⭐⭐⭐ 글로벌 | ⭐⭐⭐ 기본 |
| 무료 플랜 | ⭐⭐⭐⭐⭐ 충분함 | ⭐⭐⭐⭐⭐ 충분함 | ⭐⭐⭐⭐⭐ 무제한 |
| 설정 | ⭐⭐⭐⭐⭐ 자동 | ⭐⭐⭐⭐⭐ 자동 | ⭐⭐⭐⭐ 간단 |
| 프리뷰 배포 | ⭐⭐⭐⭐⭐ 자동 PR | ⭐⭐⭐⭐⭐ 자동 PR | ❌ 없음 |

**선택 이유**:
- ✅ Vite/React에 최적화
- ✅ 자동 HTTPS
- ✅ PR별 프리뷰 배포
- ✅ Edge Functions (필요 시)

**장점**:
- ⚡ 세계에서 가장 빠른 CDN
- 🔄 GitHub 자동 연동
- 🔒 자동 SSL 인증서
- 📊 분석 대시보드

**단점**:
- 💰 트래픽 제한 (무료: 100GB/월)
- 🔧 백엔드는 별도 필요

---

#### Backend 배포: Railway vs Render vs Heroku

**선택: Railway (또는 Render)**

| 기준 | Railway | Render | Heroku |
|------|---------|--------|--------|
| 무료 플랜 | ⭐⭐⭐⭐ $5 크레딧/월 | ⭐⭐⭐⭐⭐ 무료 (제한적) | ❌ 없어짐 (2022년) |
| PostgreSQL | ⭐⭐⭐⭐⭐ 내장 | ⭐⭐⭐⭐⭐ 내장 | ⭐⭐⭐⭐ 애드온 |
| 배포 속도 | ⭐⭐⭐⭐⭐ 매우 빠름 | ⭐⭐⭐⭐ 빠름 | ⭐⭐⭐ 보통 |
| 설정 | ⭐⭐⭐⭐⭐ 간단 | ⭐⭐⭐⭐ 간단 | ⭐⭐⭐⭐ 간단 |
| 개발 경험 | ⭐⭐⭐⭐⭐ 우수 | ⭐⭐⭐⭐ 좋음 | ⭐⭐⭐⭐ 좋음 |

**선택 이유 (Railway)**:
- ✅ PostgreSQL + Backend를 하나의 프로젝트에서 관리
- ✅ 직관적인 대시보드
- ✅ GitHub 자동 배포
- ✅ 환경 변수 관리 편리

**선택 이유 (Render - 대안)**:
- ✅ 완전 무료 플랜 (단, 비활성 시 스핀다운)
- ✅ PostgreSQL 무료 제공
- ✅ 설정이 간단

**장점**:
- 🎁 무료로 시작 가능
- 🗄️ PostgreSQL 포함
- 🔄 자동 배포
- 📊 로그 및 모니터링

**단점**:
- 💤 Render 무료 플랜은 비활성 시 sleep (15분)
- 💰 Railway는 $5 크레딧 소진 후 유료

---

### 배포 환경 구성도

```
┌──────────────────────────────────────────────────────────┐
│                     Vercel (Frontend)                     │
│  - React 빌드 파일 호스팅                                 │
│  - CDN을 통한 빠른 전송                                   │
│  - 자동 HTTPS                                             │
└─────────────────────┬────────────────────────────────────┘
                      │
                      │ API 호출
                      │
┌─────────────────────▼────────────────────────────────────┐
│                 Railway/Render (Backend)                  │
│  - Node.js 서버 실행                                      │
│  - 환경 변수 관리                                         │
│  - 자동 배포 (GitHub 연동)                                │
└─────────────────────┬────────────────────────────────────┘
                      │
                      │ DB 연결
                      │
┌─────────────────────▼────────────────────────────────────┐
│              PostgreSQL (Railway/Render)                  │
│  - 관계형 데이터베이스                                    │
│  - 자동 백업                                              │
└──────────────────────────────────────────────────────────┘
```

### CI/CD 파이프라인

```
GitHub Push
    ↓
GitHub Actions
    ↓
┌───────────────┬───────────────┐
│   Frontend    │    Backend    │
│   (Vercel)    │  (Railway)    │
└───────────────┴───────────────┘
    ↓                 ↓
자동 빌드        자동 배포
자동 배포        DB 마이그레이션
```

## 🔒 보안 고려사항

1. **환경 변수**: 민감 정보는 .env 파일로 관리
2. **CORS**: 허용된 도메인만 API 접근
3. **Rate Limiting**: API 요청 제한
4. **Input Validation**: Zod를 통한 입력 검증
5. **SQL Injection 방지**: Prisma ORM 사용
6. **XSS 방지**: React의 기본 보호 + sanitization

## 📊 성능 최적화

### Frontend

1. **코드 스플리팅**: React.lazy() 사용
2. **이미지 최적화**: WebP 형식, lazy loading
3. **메모이제이션**: React.memo, useMemo
4. **번들 크기 최적화**: Tree shaking
5. **캐싱**: React Query 또는 SWR 고려

### Backend

1. **데이터베이스 인덱싱**: 자주 조회하는 컬럼
2. **쿼리 최적화**: N+1 문제 방지
3. **응답 캐싱**: Redis (선택사항)
4. **페이지네이션**: 대량 데이터 처리
5. **압축**: gzip 응답 압축

## 🔄 개발 워크플로우

```
1. 로컬 개발
   - Frontend: npm run dev (Vite)
   - Backend: npm run dev (nodemon)
   - Database: Docker PostgreSQL

2. 테스트
   - Unit Tests (Jest)
   - Integration Tests
   - E2E Tests (Playwright - 선택)

3. 빌드
   - Frontend: npm run build
   - Backend: tsc

4. 배포
   - Git push → 자동 배포
   - 환경별 설정 (dev, staging, prod)
```

## 📚 참고 자료

- nutrition-checker의 영양소 계산 로직: `../nutrition-checker/script.js`
- nutrition-checker의 영양소 설정: `../nutrition-checker/nutritionConfig.js`
- React 공식 문서: https://react.dev
- Prisma 공식 문서: https://www.prisma.io/docs

---

## 📊 기술 스택 선정 요약

### 왜 이 조합을 선택했는가?

**핵심 원칙**:
1. ⚡ **빠른 개발**: Vite, Tailwind, Prisma로 프로토타이핑 속도 극대화
2. 🛡️ **타입 안정성**: TypeScript로 프론트-백엔드 전체 타입 보장
3. 🪶 **경량화**: Zustand, shadcn/ui로 번들 크기 최소화
4. 💰 **무료 시작**: Vercel, Railway/Render 무료 플랫폼
5. 📚 **학습 용이**: 가장 대중적인 기술 스택으로 자료 풍부

### 조합의 강점

**생산성**:
- Vite + React = 즉각적인 HMR
- Tailwind = CSS 작성 시간 80% 단축
- Prisma = DB 스키마를 코드로 관리
- Zod = 타입 + 검증을 한 번에

**안정성**:
- TypeScript = 런타임 에러 사전 차단
- Prisma = SQL Injection 자동 방지
- React + TypeScript = 타입 안전한 UI

**확장성**:
- React 컴포넌트 재사용
- PostgreSQL 복잡한 쿼리 지원
- Vercel/Railway 자동 스케일링

### 프로젝트 특성에 최적화

**영양 데이터 분석 서비스**:
- ✅ 38가지 영양소 → TypeScript 타입으로 안전하게 관리
- ✅ 복잡한 관계 (브랜드-메뉴-영양소) → PostgreSQL 관계형 DB
- ✅ 차트/시각화 → Recharts React 컴포넌트
- ✅ 건강 점수 계산 → TypeScript 함수로 재사용

**중소규모 프로젝트**:
- ✅ 복잡한 상태관리 불필요 → Zustand (1KB)
- ✅ 빠른 배포 필요 → Vercel + Railway (자동 배포)
- ✅ 비용 최소화 → 무료 플랜 활용

### 대안이 더 나을 수 있는 경우

**다른 선택지 고려 상황**:

| 상황 | 현재 스택 | 대안 | 이유 |
|------|----------|------|------|
| 초고성능 필요 | Express | Fastify | 2배 빠른 처리 속도 |
| 대규모 엔터프라이즈 | Express + Zustand | NestJS + Redux | 구조화된 아키텍처 |
| 최신 기술 선호 | Node.js + Axios | Bun + Fetch | 더 빠른 런타임 |
| 스키마 자주 변경 | PostgreSQL | MongoDB | 유연한 NoSQL |
| 매우 복잡한 차트 | Recharts | D3.js | 무제한 커스터마이징 |
| 완전 무료 호스팅 | Railway | Render | 완전 무료 (sleep 감수) |

### 핵심 의사결정 기준

**기술 선택 시 고려 사항**:
1. 📖 **학습 곡선**: 다음 개발자도 쉽게 이해할 수 있는가?
2. 🎯 **프로젝트 적합성**: 영양 데이터 분석에 적합한가?
3. 🌍 **커뮤니티**: 문제 발생 시 해결책을 찾기 쉬운가?
4. 💰 **비용**: 무료로 시작하고 확장 가능한가?
5. 🚀 **성능**: 사용자 경험을 해치지 않는가?

---

**Last Updated**: 2025-10-15

**기술 스택 비교 추가됨** ✅
