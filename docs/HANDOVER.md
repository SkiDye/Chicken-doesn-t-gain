# 인수인계 가이드

## 📋 개요

이 문서는 **치킨은 살 안 쪄** 프로젝트를 다른 개발자 또는 에이전트에게 인계할 때 필요한 모든 정보를 담고 있습니다.

**프로젝트 상태**: Phase 1 (기획 및 설계) 완료 ✅

---

## 🎯 프로젝트 핵심 정보

### 프로젝트 목적
전국 치킨 프랜차이즈 메뉴의 영양 정보를 분석하고, 사용자가 건강한 치킨을 선택할 수 있도록 돕는 웹 애플리케이션

### 주요 특징
1. **영양 분석**: 38가지 필수영양소 기반 상세 분석
2. **건강 점수**: 자체 알고리즘으로 0-100점 건강 점수 제공
3. **브랜드/메뉴 비교**: 여러 메뉴의 영양소 비교 기능
4. **데이터 기반**: PostgreSQL 데이터베이스에 저장된 검증된 영양 정보

### 기술 스택
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Deployment**: Vercel (Frontend) + Railway (Backend)

---

## 📂 프로젝트 구조

```
C:\Claude\치킨은 살 안 쪄\
├── README.md                  # 프로젝트 개요
├── docs/                      # 📖 문서 모음
│   ├── ARCHITECTURE.md        # 시스템 아키텍처 설계
│   ├── FEATURES.md            # 기능 명세서
│   ├── DATABASE_SCHEMA.md     # 데이터베이스 스키마
│   ├── ROADMAP.md             # 개발 로드맵
│   └── HANDOVER.md            # 이 문서
├── src/                       # (추후 생성) 소스 코드
└── public/                    # (추후 생성) 정적 파일
```

---

## 📖 필수 문서

### 1. README.md
- **목적**: 프로젝트 전체 개요
- **내용**:
  - 프로젝트 소개
  - 주요 기능
  - 기술 스택
  - 시작하기
  - nutrition-checker와의 비교

### 2. ARCHITECTURE.md
- **목적**: 시스템 설계 및 구조
- **내용**:
  - 전체 시스템 아키텍처
  - Frontend 설계 (컴포넌트, 폴더 구조, 상태 관리)
  - Backend 설계 (API, 서비스, 라우팅)
  - 데이터베이스 설계 개요
  - 건강 점수 알고리즘
  - 배포 전략

**핵심 참고 사항**:
```typescript
// 건강 점수 계산 로직 (총 100점)
- 칼로리 점수: 15점
- 탄단지 균형: 15점
- 나트륨 점수: 10점
- 단백질 품질: 10점
- 비타민 점수: 10점
- 미네랄 점수: 10점
- 식이섬유: 10점
- 필수영양소: 10점
- 건강한 지방: 5점
- 저당 점수: 5점
```

### 3. FEATURES.md
- **목적**: 상세 기능 명세
- **내용**:
  - 페이지별 기능 상세 설명
  - UI/UX 요구사항
  - 우선순위 정의 (Phase 1-4)
  - 향후 고도화 기능

**Phase별 우선순위**:
- **Phase 1 (MVP)**: 메뉴 목록, 상세, 검색, 브랜드 페이지
- **Phase 2**: 메뉴 비교, 고급 필터, 즐겨찾기
- **Phase 3**: 관리자 기능
- **Phase 4**: 사용자 계정, 리뷰

### 4. DATABASE_SCHEMA.md
- **목적**: 데이터베이스 스키마 설계
- **내용**:
  - ERD 다이어그램
  - 테이블 상세 (Brands, MenuItems, NutritionInfo, HealthScoreLog)
  - Prisma 스키마
  - 인덱스 전략
  - 샘플 데이터

**핵심 테이블**:
```
Brands (브랜드)
  └─ MenuItems (메뉴)
       ├─ NutritionInfo (영양 정보)
       └─ HealthScoreLog (건강 점수 로그)
```

### 5. ROADMAP.md
- **목적**: 단계별 개발 계획
- **내용**:
  - Phase 1-6 개발 단계
  - 각 단계별 작업 항목 체크리스트
  - 예상 소요 기간
  - 마일스톤
  - 리스크 관리

**현재 진행 상황**: Phase 1 완료, Phase 2 준비 단계

---

## 🔑 핵심 개념

### 1. 영양소 분석 시스템

nutrition-checker 프로젝트의 38가지 필수영양소 구조를 참고합니다.

**영양소 카테고리**:
1. 기본 영양소 (10가지): 칼로리, 탄수화물, 단백질, 지방, 포화지방, 트랜스지방, 당류, 식이섬유, 콜레스테롤, 나트륨
2. 필수 아미노산 (9가지): 이소류신, 류신, 발린, 라이신, 메티오닌, 페닐알라닌, 트레오닌, 트립토판, 히스티딘
3. 필수 지방산 (2가지): 리놀레산(ω-6), 알파-리놀렌산(ω-3)
4. 지용성 비타민 (4가지): A, D, E, K
5. 수용성 비타민 (9가지): B1~B12, C
6. 다량 무기질 (6가지): 칼슘, 인, 칼륨, 나트륨, 염소, 마그네슘
7. 미량 무기질 (8가지): 철, 아연, 구리, 망간, 요오드, 셀레늄, 몰리브덴, 크롬

### 2. 데이터 품질 등급

nutrition-checker의 검증 시스템을 따릅니다.

- **Grade A**: 공식 검증된 데이터 (브랜드 공식 영양성분표, 식약처 데이터)
- **Grade B**: 추정 데이터 (신뢰도 높음, 유사 메뉴 기반)
- **Grade C**: 미검증 추정 데이터 (AI 추정, 평균값)

**목표**:
- Grade A: 최소 50개 메뉴
- Grade B: 최소 100개 메뉴
- 전체: 200개 이상 메뉴

### 3. 건강 점수 알고리즘

nutrition-checker의 영양소 분석 로직을 참고하여 설계:

```typescript
function calculateHealthScore(nutrition: NutritionInfo): HealthScore {
  // 1. 칼로리 점수 (15점)
  // - 권장 칼로리(2000kcal) 대비 적정성
  // - 1인분 기준 500-800kcal: 만점

  // 2. 탄단지 균형 (15점)
  // - 이상적인 비율: 탄수화물 50%, 단백질 30%, 지방 20%
  // - 치킨 특성 고려: 단백질 40%, 지방 30%, 탄수화물 30%

  // 3. 나트륨 점수 (10점)
  // - 1일 권장량(2300mg) 대비
  // - 낮을수록 높은 점수

  // 4-10. 영양소 점수 (각 5-10점)
  // - 필수영양소 일일 권장량 대비 충족률

  return {
    totalScore: 0-100,
    breakdown: { ... }
  };
}
```

---

## 🚀 다음 개발자를 위한 가이드

### Phase 2 시작 방법

#### Step 1: 프로젝트 초기화

```bash
# 1. 프로젝트 폴더로 이동
cd "C:\Claude\치킨은 살 안 쪄"

# 2. Frontend 프로젝트 생성
npm create vite@latest frontend -- --template react-ts

# 3. 필수 패키지 설치
cd frontend
npm install

# 4. 추가 라이브러리 설치
npm install tailwindcss postcss autoprefixer
npm install react-router-dom zustand axios recharts
npm install react-hook-form zod @hookform/resolvers

# 5. Tailwind CSS 초기화
npx tailwindcss init -p
```

#### Step 2: 폴더 구조 생성

ARCHITECTURE.md의 폴더 구조를 참고하여 생성:

```bash
cd src
mkdir components pages hooks stores services types utils constants
cd components
mkdir common layout menu nutrition brand
```

#### Step 3: 기본 설정 파일 작성

**tailwind.config.js**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: 'class',
}
```

**tsconfig.json** (경로 별칭 추가)
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

#### Step 4: 첫 번째 컴포넌트 작성

ROADMAP.md의 Phase 2.2를 참고하여 Header 컴포넌트부터 시작하세요.

```typescript
// src/components/layout/Header.tsx
export const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold">치킨은 살 안 쪄</h1>
      </div>
    </header>
  );
};
```

---

## 🔧 참고할 프로젝트

### nutrition-checker

**위치**: `C:\Claude\nutrition-checker`

**참고할 파일**:

1. **영양소 설정** (`nutritionConfig.js`)
   - 38가지 필수영양소 정의
   - 일일 권장량
   - 카테고리별 분류

   ```javascript
   // 복사해서 사용할 수 있는 영양소 설정
   const nutritionConfig = {
     essentialAminoAcids: { ... },
     essentialFattyAcids: { ... },
     fatSolubleVitamins: { ... },
     // ...
   };
   ```

2. **영양소 계산 로직** (`script.js`)
   - `updateNutrients()`: 영양소 업데이트
   - `updateNutrientDisplays()`: 영양소 표시
   - `calculateHealthScore()`: 건강 점수 계산 (참고용)
   - `updateCompletionStatus()`: 완성도 계산

3. **UI/UX 패턴** (`index.html`, `styles.css`)
   - 영양소 프로그레스 바
   - 탭 네비게이션
   - 검색 UI
   - 다크모드 토글

**활용 방법**:
```typescript
// nutrition-checker의 로직을 TypeScript로 변환
// src/utils/nutrition.ts

import { nutritionConfig } from '../constants/nutrition';

export function calculateNutrientPercentage(
  value: number,
  nutrientKey: string
): number {
  const nutrient = nutritionConfig[nutrientKey];
  return (value / nutrient.dailyRecommended) * 100;
}
```

---

## 📊 데이터 수집 가이드

### 브랜드 데이터

**수집 방법**:
1. 각 브랜드 공식 웹사이트 방문
2. 로고 이미지 다운로드 또는 URL 저장
3. 브랜드 정보 정리

**주요 브랜드 목록** (우선순위):
1. BBQ - https://www.bbq.co.kr
2. 교촌치킨 - https://www.kyochon.com
3. BHC - https://www.bhc.co.kr
4. 네네치킨 - https://www.nenechicken.com
5. 굽네치킨 - https://www.goobne.co.kr
6. 처갓집양념치킨 - http://www.cheogajip.co.kr
7. 페리카나 - https://www.pelicana.co.kr
8. 호식이두마리치킨 - https://www.2mari.co.kr
9. 맘스터치 - https://www.momstouch.co.kr
10. 멕시카나 - http://www.mexicana.co.kr

### 메뉴 데이터

**수집 소스**:
1. **브랜드 공식 사이트** - 메뉴판
2. **배달앱** - 배달의민족, 쿠팡이츠, 요기요
3. **검색** - 네이버, 구글 이미지 검색

**수집 항목**:
```json
{
  "name": "황금올리브치킨",
  "brand": "BBQ",
  "category": "FRIED",
  "servingSize": 1000,
  "description": "100% 스페인산 올리브유로 튀긴 바삭한 치킨"
}
```

### 영양 정보 데이터

**수집 우선순위**:

**1단계 (필수)**: 기본 영양소
- 칼로리, 탄수화물, 단백질, 지방, 나트륨

**2단계 (중요)**: 추가 영양소
- 포화지방, 트랜스지방, 당류, 식이섬유
- 주요 비타민 (A, B군, C, D)
- 주요 미네랄 (칼슘, 철, 마그네슘)

**3단계 (선택)**: 상세 영양소
- 필수 아미노산 9종
- 필수 지방산
- 미량 무기질

**데이터 소스**:
1. **공식 영양성분표** (Grade A)
   - 브랜드 공식 홈페이지
   - 매장 내 영양성분표

2. **식품안전나라** (Grade A)
   - https://www.foodsafetykorea.go.kr
   - 식품영양성분 DB

3. **추정 계산** (Grade B/C)
   - 유사 메뉴 평균
   - 영양학적 계산

---

## 🛠 개발 팁

### 1. TypeScript 타입 정의

```typescript
// src/types/menu.ts
export interface MenuItem {
  id: string;
  brandId: string;
  name: string;
  nameEng?: string;
  category: MenuCategory;
  description?: string;
  image?: string;
  servingSize: number;
  healthScore?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// src/types/nutrition.ts
export interface NutritionInfo {
  // 기본 영양소
  calories: number;
  carbs?: number;
  protein?: number;
  fat?: number;
  sodium?: number;
  // ... 38가지 영양소

  // 메타 정보
  dataQuality: 'A' | 'B' | 'C';
  source?: string;
  verifiedAt?: Date;
}

// src/types/health.ts
export interface HealthScore {
  totalScore: number;
  breakdown: {
    calorieScore: number;
    macroBalance: number;
    sodiumScore: number;
    // ... 나머지 점수
  };
}
```

### 2. Zustand Store 예시

```typescript
// src/stores/menuStore.ts
import { create } from 'zustand';

interface MenuStore {
  menus: MenuItem[];
  selectedMenu: MenuItem | null;
  filters: MenuFilters;

  setMenus: (menus: MenuItem[]) => void;
  setSelectedMenu: (menu: MenuItem) => void;
  updateFilters: (filters: Partial<MenuFilters>) => void;
}

export const useMenuStore = create<MenuStore>((set) => ({
  menus: [],
  selectedMenu: null,
  filters: {},

  setMenus: (menus) => set({ menus }),
  setSelectedMenu: (menu) => set({ selectedMenu: menu }),
  updateFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
}));
```

### 3. API 서비스 예시

```typescript
// src/services/menuService.ts
import axios from './api';

export const menuService = {
  getMenus: async (filters?: MenuFilters) => {
    const { data } = await axios.get('/menus', { params: filters });
    return data;
  },

  getMenuById: async (id: string) => {
    const { data } = await axios.get(`/menus/${id}`);
    return data;
  },

  searchMenus: async (query: string) => {
    const { data } = await axios.get('/menus/search', { params: { q: query } });
    return data;
  },
};
```

---

## 🔍 주의사항

### 1. nutrition-checker와의 차이점

| 구분 | nutrition-checker | 치킨은 살 안 쪄 |
|------|-------------------|----------------|
| 기술 | 바닐라 JS | React + TypeScript |
| 구조 | 클라이언트 전용 | Full-stack |
| 데이터 | 로컬 파일 (JS) | PostgreSQL DB |
| 범위 | 범용 음식 | 치킨 전문 |
| 배포 | 정적 호스팅 | Vercel + Railway |

### 2. 반드시 참고해야 할 부분

- ✅ **영양소 계산 로직**: nutrition-checker의 `nutritionConfig.js`와 계산 로직
- ✅ **데이터 검증**: nutrition-checker의 Grade A/B/C 시스템
- ✅ **UI/UX 패턴**: 영양소 표시, 프로그레스 바, 차트

### 3. 새롭게 구현해야 할 부분

- 🆕 **React 컴포넌트**: 재사용 가능한 컴포넌트 설계
- 🆕 **Backend API**: RESTful API 설계 및 구현
- 🆕 **데이터베이스**: Prisma 스키마 및 마이그레이션
- 🆕 **건강 점수 알고리즘**: nutrition-checker 참고하여 재구현

---

## 📞 문제 해결

### 자주 발생할 수 있는 문제

**1. Vite 프로젝트 생성 실패**
```bash
# 해결: npm 버전 업데이트
npm install -g npm@latest
npm create vite@latest frontend -- --template react-ts
```

**2. Tailwind CSS 적용 안 됨**
```javascript
// tailwind.config.js 확인
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
```

```css
/* index.css 확인 */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**3. Prisma 스키마 에러**
```bash
# Prisma 재생성
npx prisma generate
npx prisma migrate dev
```

**4. TypeScript 타입 에러**
```bash
# 타입 정의 파일 확인
# src/types/ 폴더의 파일들이 제대로 import되는지 확인
```

---

## ✅ 인수인계 체크리스트

### 문서 확인
- [ ] README.md 읽기
- [ ] ARCHITECTURE.md 읽기
- [ ] FEATURES.md 읽기
- [ ] DATABASE_SCHEMA.md 읽기
- [ ] ROADMAP.md 읽기
- [ ] HANDOVER.md 읽기 (이 문서)

### 프로젝트 이해
- [ ] 프로젝트 목적 이해
- [ ] 기술 스택 파악
- [ ] 시스템 아키텍처 이해
- [ ] 데이터베이스 스키마 이해
- [ ] 건강 점수 알고리즘 이해

### nutrition-checker 참고
- [ ] nutrition-checker 프로젝트 위치 확인
- [ ] nutritionConfig.js 확인
- [ ] script.js 영양소 계산 로직 확인
- [ ] UI/UX 패턴 확인

### 개발 환경 준비
- [ ] Node.js 18+ 설치 확인
- [ ] npm 또는 yarn 설치 확인
- [ ] Git 설치 확인
- [ ] 코드 에디터 (VS Code 권장) 설치

### 다음 단계 확인
- [ ] ROADMAP.md Phase 2 확인
- [ ] 첫 번째 작업 항목 파악
- [ ] 필요한 패키지 목록 확인

---

## 🎯 최종 목표

**Phase 5 완료 시 달성할 상태**:

1. ✅ 배포된 웹사이트 (https://치킨은살안쪄.com)
2. ✅ 최소 20개 브랜드, 200개 메뉴 등록
3. ✅ 모든 메뉴에 영양 정보 및 건강 점수
4. ✅ 검색, 필터링, 정렬 기능 완벽 동작
5. ✅ 메뉴 상세 페이지 영양소 시각화
6. ✅ 반응형 디자인 (PC, 태블릿, 모바일)
7. ✅ 다크모드 지원

---

## 📚 추가 학습 자료

### React + TypeScript
- React 공식 문서: https://react.dev
- TypeScript 공식 문서: https://www.typescriptlang.org

### Backend
- Express 공식 문서: https://expressjs.com
- Prisma 공식 문서: https://www.prisma.io/docs

### UI/UX
- Tailwind CSS: https://tailwindcss.com
- Recharts: https://recharts.org

### 배포
- Vercel: https://vercel.com/docs
- Railway: https://docs.railway.app

---

## 💬 마지막 조언

1. **작은 단위로 개발하세요**
   - 한 번에 하나의 컴포넌트 또는 기능만 구현
   - 커밋을 자주 하세요

2. **ROADMAP.md를 따르세요**
   - Phase 2부터 순차적으로 진행
   - 체크리스트를 활용하여 진행 상황 관리

3. **nutrition-checker를 적극 활용하세요**
   - 영양소 계산 로직은 이미 검증됨
   - UI/UX 패턴 참고

4. **문서를 업데이트하세요**
   - 새로운 기능이나 변경사항은 문서에 반영
   - 다음 개발자를 위한 배려

5. **막히면 문서를 다시 읽으세요**
   - ARCHITECTURE.md, FEATURES.md에 답이 있습니다
   - nutrition-checker 코드를 참고하세요

---

**Last Updated**: 2025-10-15

**인수인계 준비 완료** ✅

다음 개발자는 ROADMAP.md의 Phase 2부터 시작하면 됩니다!
