# 개발 로드맵

## 🎯 프로젝트 목표

**치킨은 살 안 쪄**를 단계적으로 개발하여 사용자에게 가치를 제공하는 완성도 높은 서비스를 만듭니다.

## 📅 개발 일정 개요

```
Phase 1: 기획 및 설계 (1주)           ✅ 완료 (2025-10)
  └─ 명세 문서 작성

Phase 2: 프론트엔드 MVP (2-3주)        ✅ 완료 (2025-10-15)
  └─ React 프로젝트 초기화
  └─ 기본 UI/UX 구현
  └─ 건강 점수 알고리즘 구현

Phase 2.5: 초기 데이터 수집 (1주)      ✅ 완료 (2025-10-15)
  └─ 7개 메뉴 공식 데이터 수집
  └─ 메뉴명/이미지 검증

Phase 3: 추가 데이터 수집 (진행 중)    🔄 진행 중
  └─ 브랜드별 주요 메뉴 추가
  └─ 공식 영양성분표 확보

Phase 4: 백엔드 개발 (2-3주)          ⏸️ 대기 중
  └─ API 서버 구축
  └─ 데이터베이스 설정

Phase 5: 통합 및 배포 (1-2주)          ⏸️ 대기 중
  └─ 프론트-백엔드 연결
  └─ 실서비스 배포

Phase 6: 고도화 (지속적)               ⏸️ 대기 중
  └─ 기능 추가
  └─ 성능 최적화
```

---

## Phase 1: 기획 및 설계 ✅

**기간**: 1주 (완료)

### 목표
- 프로젝트 전체 구조 설계
- 상세 명세서 작성
- 기술 스택 결정

### 완료된 작업
- [x] 프로젝트 폴더 구조 생성
- [x] README.md 작성
- [x] ARCHITECTURE.md 작성
- [x] FEATURES.md 작성
- [x] DATABASE_SCHEMA.md 작성
- [x] ROADMAP.md 작성
- [x] HANDOVER.md 작성

### 산출물
- 📄 프로젝트 명세 문서 6개
- 📋 기술 스택 정의
- 🗺️ 개발 로드맵

---

## Phase 2: 프론트엔드 MVP ✅

**기간**: 2-3주 → 실제 1주 (2025-10-08 ~ 2025-10-15)
**우선순위**: 높음
**상태**: 완료

### 2.1 프로젝트 초기화 ✅

**작업 항목**
```bash
# Vite + React + TypeScript 프로젝트 생성
cd "C:\Claude\치킨은 살 안 쪄"
npm create vite@latest frontend -- --template react-ts

# 필수 패키지 설치
cd frontend
npm install

# UI 라이브러리 설치
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 라우팅
npm install react-router-dom

# 상태 관리
npm install zustand

# HTTP 클라이언트
npm install axios

# 데이터 시각화
npm install recharts

# 폼 관리
npm install react-hook-form zod @hookform/resolvers

# UI 컴포넌트
npx shadcn-ui@latest init
```

**체크리스트**
- [x] Vite 프로젝트 생성
- [x] Tailwind CSS 설정
- [x] 폴더 구조 생성 (components/, data/, pages/, types/, utils/)
- [x] TypeScript 설정
- [x] 개발 서버 구동 확인 (http://localhost:5173)

**변경사항**
- ✅ Recharts 대신 SVG 직접 구현 (파이 차트)
- ✅ shadcn-ui 없이 순수 Tailwind CSS로 구현
- ✅ zustand 없이 React useState로 상태 관리
- ✅ react-router-dom 없이 단일 페이지로 시작

### 2.2 기본 레이아웃 (2-3일)

**작업 항목**
- [ ] Header 컴포넌트
  - [ ] 로고
  - [ ] 네비게이션 메뉴
  - [ ] 검색바
  - [ ] 다크모드 토글
- [ ] Footer 컴포넌트
- [ ] 반응형 레이아웃
  - [ ] 데스크톱 (1200px+)
  - [ ] 태블릿 (768-1199px)
  - [ ] 모바일 (< 768px)

**우선순위 컴포넌트**
```typescript
// components/layout/Header.tsx
// components/layout/Footer.tsx
// components/layout/Layout.tsx
```

### 2.3 홈페이지 (3-4일)

**작업 항목**
- [ ] 히어로 섹션
- [ ] 인기 메뉴 섹션 (Mock 데이터)
- [ ] 브랜드 섹션 (Mock 데이터)
- [ ] 통계 섹션
- [ ] 검색바 (UI만, 기능은 나중)

**Mock 데이터**
```typescript
// src/data/mockMenus.ts
export const mockMenus = [
  {
    id: '1',
    name: '황금올리브치킨',
    brand: 'BBQ',
    calories: 850,
    healthScore: 72,
    // ...
  },
  // ... 10개 정도
];
```

### 2.4 메뉴 목록 페이지 (4-5일)

**작업 항목**
- [ ] MenuCard 컴포넌트
  - [ ] 메뉴 이미지 (placeholder)
  - [ ] 메뉴 정보
  - [ ] 건강 점수 배지
- [ ] 필터 사이드바
  - [ ] 브랜드 필터
  - [ ] 칼로리 슬라이더
  - [ ] 건강 점수 필터
- [ ] 정렬 기능
- [ ] 페이지네이션 (UI만)
- [ ] Mock 데이터 연동

**우선순위 컴포넌트**
```typescript
// components/menu/MenuCard.tsx
// components/menu/MenuList.tsx
// components/menu/MenuFilter.tsx
// pages/MenuList.tsx
```

### 2.5 메뉴 상세 페이지 (5-6일)

**작업 항목**
- [ ] 기본 정보 섹션
  - [ ] 메뉴 이미지
  - [ ] 브랜드 정보
  - [ ] 건강 점수 (원형 게이지)
- [ ] 영양 정보 표
  - [ ] 기본 영양소
  - [ ] 탭 네비게이션 (비타민, 미네랄 등)
- [ ] 건강 점수 상세
  - [ ] 점수 분해도 (차트)
  - [ ] 해석 및 설명
- [ ] 영양소 시각화
  - [ ] 파이 차트 (탄단지 비율)
  - [ ] 레이더 차트 (주요 영양소)
  - [ ] 바 차트 (비타민/미네랄)

**우선순위 컴포넌트**
```typescript
// components/nutrition/NutritionChart.tsx
// components/nutrition/NutritionTable.tsx
// components/nutrition/HealthScore.tsx
// pages/MenuDetail.tsx
```

### 2.6 브랜드 페이지 (2-3일)

**작업 항목**
- [ ] 브랜드 목록 페이지
  - [ ] BrandCard 컴포넌트
  - [ ] 정렬 기능
- [ ] 브랜드 상세 페이지
  - [ ] 브랜드 정보
  - [ ] 통계
  - [ ] 메뉴 목록

### 2.7 유틸리티 구현 (2-3일)

**작업 항목**
- [ ] 건강 점수 계산 함수 (nutrition-checker 참고)
  ```typescript
  // src/utils/healthScore.ts
  export function calculateHealthScore(nutrition: NutritionInfo): number
  ```
- [ ] 영양소 포맷팅 함수
- [ ] 상수 정의 (영양소 권장량 등)

### 2.8 라우팅 설정 (1일)

**라우트 구조**
```typescript
// src/App.tsx
const routes = [
  { path: '/', element: <Home /> },
  { path: '/menus', element: <MenuList /> },
  { path: '/menus/:id', element: <MenuDetail /> },
  { path: '/brands', element: <BrandList /> },
  { path: '/brands/:id', element: <BrandDetail /> },
  { path: '/about', element: <About /> },
];
```

### Phase 2 완료 기준

- [ ] 모든 주요 페이지 UI 구현
- [ ] Mock 데이터로 동작 확인
- [ ] 반응형 디자인 적용
- [ ] 다크모드 지원
- [ ] 로컬에서 정상 실행 (npm run dev)

**산출물**
- 🎨 완성된 React 프론트엔드
- 📱 반응형 UI
- 📊 시각화 컴포넌트
- 🧪 Mock 데이터 연동

---

## Phase 3: 백엔드 개발

**기간**: 2-3주
**우선순위**: 높음

### 3.1 프로젝트 초기화 (1일)

**작업 항목**
```bash
# 백엔드 프로젝트 생성
mkdir backend && cd backend
npm init -y

# 필수 패키지 설치
npm install express cors dotenv
npm install prisma @prisma/client
npm install zod
npm install winston

# 개발 의존성
npm install -D typescript @types/node @types/express
npm install -D ts-node nodemon
npm install -D @types/cors

# TypeScript 설정
npx tsc --init
```

**체크리스트**
- [ ] Node.js 프로젝트 초기화
- [ ] TypeScript 설정
- [ ] 폴더 구조 생성 (ARCHITECTURE.md 참고)
- [ ] .env 파일 설정

### 3.2 데이터베이스 설정 (2일)

**작업 항목**
- [ ] PostgreSQL 로컬 설치 또는 Docker 설정
- [ ] Prisma 스키마 작성 (DATABASE_SCHEMA.md 참고)
- [ ] 마이그레이션 실행
  ```bash
  npx prisma init
  npx prisma migrate dev --name init
  npx prisma generate
  ```
- [ ] 시드 데이터 작성
  ```bash
  npx prisma db seed
  ```

### 3.3 API 서버 구축 (3-4일)

**작업 항목**
- [ ] Express 서버 설정
  ```typescript
  // src/app.ts
  // src/server.ts
  ```
- [ ] 미들웨어 설정
  - [ ] CORS
  - [ ] JSON 파싱
  - [ ] 에러 핸들러
  - [ ] 로거
- [ ] 라우트 설정
  ```typescript
  // src/routes/brandRoutes.ts
  // src/routes/menuRoutes.ts
  // src/routes/nutritionRoutes.ts
  ```

### 3.4 API 엔드포인트 구현 (5-7일)

**브랜드 API**
- [ ] `GET /api/brands` - 브랜드 목록
- [ ] `GET /api/brands/:id` - 브랜드 상세
- [ ] `GET /api/brands/:id/menus` - 브랜드별 메뉴

**메뉴 API**
- [ ] `GET /api/menus` - 메뉴 목록 (필터링, 정렬, 페이징)
- [ ] `GET /api/menus/:id` - 메뉴 상세
- [ ] `GET /api/menus/search` - 메뉴 검색
- [ ] `POST /api/menus/compare` - 메뉴 비교

**영양 정보 API**
- [ ] `GET /api/nutrition/:menuId` - 영양 정보
- [ ] `POST /api/nutrition/analyze` - 영양 분석

**건강 점수 API**
- [ ] `GET /api/health-score/:menuId` - 건강 점수
- [ ] `POST /api/health-score/calculate` - 건강 점수 계산

### 3.5 비즈니스 로직 구현 (3-4일)

**작업 항목**
- [ ] 건강 점수 계산 서비스
  ```typescript
  // src/services/healthScoreService.ts
  export class HealthScoreService {
    calculateScore(nutrition: NutritionInfo): HealthScore
  }
  ```
- [ ] 영양소 분석 서비스
- [ ] 메뉴 검색/필터링 로직

### 3.6 검증 및 에러 처리 (2일)

**작업 항목**
- [ ] Zod 스키마 정의
  ```typescript
  // src/validators/menuValidator.ts
  export const menuQuerySchema = z.object({
    brandId: z.number().optional(),
    category: z.enum(['FRIED', 'SEASONED', ...]).optional(),
    // ...
  });
  ```
- [ ] 에러 핸들러 미들웨어
- [ ] 입력 검증 미들웨어

### 3.7 테스트 (선택사항, 2-3일)

**작업 항목**
- [ ] Jest 설정
- [ ] 단위 테스트 (건강 점수 계산 로직)
- [ ] API 테스트 (주요 엔드포인트)

### Phase 3 완료 기준

- [ ] 모든 API 엔드포인트 구현
- [ ] Prisma를 통한 DB 연동
- [ ] 건강 점수 계산 로직 완성
- [ ] 에러 처리 및 검증
- [ ] Postman으로 API 테스트 완료

**산출물**
- 🔧 완성된 REST API 서버
- 💾 PostgreSQL 데이터베이스
- 📋 API 문서 (Swagger - 선택)

---

## Phase 4: 데이터 수집 및 입력

**기간**: 2-4주
**우선순위**: 중간

### 4.1 브랜드 데이터 수집 (2-3일)

**주요 브랜드 목록**
- BBQ
- 교촌치킨
- BHC
- 네네치킨
- 굽네치킨
- 처갓집양념치킨
- 페리카나
- 호식이두마리치킨
- 맘스터치 (치킨버거 포함)
- 멕시카나
- 푸라닭
- 치킨매니아
- 등등 (약 20-30개 브랜드)

**수집 정보**
- 브랜드명 (한글/영문)
- 로고 이미지
- 공식 웹사이트
- 간단한 설명

### 4.2 메뉴 데이터 수집 (1-2주)

**데이터 소스**
1. **공식 웹사이트**
   - 각 브랜드 공식 사이트
   - 메뉴판 이미지 캡처

2. **배달앱**
   - 배달의민족
   - 쿠팡이츠
   - 요기요

3. **영양성분표**
   - 브랜드에서 공개한 영양성분표
   - 식약처 데이터베이스

**수집 항목**
- 메뉴명
- 카테고리
- 1인분 크기
- 이미지 (없으면 기본 이미지)

### 4.3 영양 정보 수집 (2-3주)

**데이터 품질 기준** (nutrition-checker 참고)

**Grade A (검증된 데이터)**
- 브랜드 공식 영양성분표
- 식약처 데이터
- 목표: 주요 메뉴 50개 이상

**Grade B (추정 데이터 - 신뢰도 높음)**
- 유사 메뉴 기반 추정
- 영양학적 계산
- 목표: 100개 이상

**Grade C (추정 데이터 - 미검증)**
- AI 추정
- 일반적인 치킨 평균값
- 목표: 나머지 전체

**영양소 수집 우선순위**
1. **필수** (모든 메뉴)
   - 칼로리, 탄수화물, 단백질, 지방, 나트륨

2. **중요** (Grade A, B)
   - 포화지방, 트랜스지방, 당류, 식이섬유
   - 주요 비타민 (A, B군, C, D)
   - 주요 미네랄 (칼슘, 철, 마그네슘)

3. **추가** (Grade A만)
   - 필수 아미노산 9종
   - 필수 지방산
   - 미량 영양소

### 4.4 데이터 입력 방법

**방법 1: 관리자 페이지 (추후 개발)**
- 웹 UI를 통한 수동 입력
- 이미지 업로드
- 실시간 검증

**방법 2: CSV 벌크 업로드**
```bash
# CSV 파일 준비
brands.csv
menus.csv
nutrition.csv

# Prisma 시드 스크립트 실행
npm run seed:csv
```

**방법 3: API를 통한 입력**
```bash
# Postman 또는 cURL로 데이터 POST
POST /api/admin/menus
```

### 4.5 데이터 검증 (1주)

**작업 항목**
- [ ] 영양소 합계 검증 (탄수화물 + 단백질 + 지방 ≈ 칼로리)
- [ ] 필수 필드 누락 확인
- [ ] 이상치 탐지 (칼로리 0 이하 등)
- [ ] 건강 점수 계산 확인

**검증 스크립트**
```typescript
// scripts/validateNutrition.ts
// nutrition-checker의 검증 로직 참고
```

### Phase 4 완료 기준

- [ ] 최소 20개 브랜드 등록
- [ ] 최소 200개 메뉴 등록
- [ ] Grade A 데이터 50개 이상
- [ ] Grade B 데이터 100개 이상
- [ ] 모든 메뉴에 건강 점수 계산 완료

**산출물**
- 📊 브랜드 데이터베이스
- 🍗 메뉴 데이터베이스
- 🥗 영양 정보 데이터베이스

---

## Phase 5: 통합 및 배포

**기간**: 1-2주
**우선순위**: 높음

### 5.1 프론트-백엔드 연동 (3-4일)

**작업 항목**
- [ ] Axios API 서비스 구현
  ```typescript
  // frontend/src/services/menuService.ts
  export const menuService = {
    getMenus: (filters) => axios.get('/api/menus', { params: filters }),
    getMenuById: (id) => axios.get(`/api/menus/${id}`),
    // ...
  };
  ```
- [ ] 환경 변수 설정
  ```env
  # frontend/.env
  VITE_API_BASE_URL=http://localhost:3000/api
  ```
- [ ] Mock 데이터 제거
- [ ] 실제 API 호출로 변경
- [ ] 로딩 상태 처리
- [ ] 에러 처리

### 5.2 배포 준비 (2-3일)

**Frontend (Vercel)**
```bash
# Vercel 프로젝트 연결
cd frontend
vercel login
vercel link

# 환경 변수 설정
vercel env add VITE_API_BASE_URL production

# 배포
vercel --prod
```

**Backend (Railway 또는 Render)**
```bash
# Railway 프로젝트 생성
railway login
railway init

# PostgreSQL 추가
railway add postgres

# 환경 변수 설정
railway variables set NODE_ENV=production

# 배포
railway up
```

### 5.3 데이터베이스 마이그레이션 (1일)

**작업 항목**
- [ ] 프로덕션 DB 생성
- [ ] 마이그레이션 실행
  ```bash
  DATABASE_URL="postgresql://..." npx prisma migrate deploy
  ```
- [ ] 시드 데이터 입력
  ```bash
  npm run seed:production
  ```

### 5.4 도메인 및 HTTPS 설정 (1일)

**작업 항목**
- [ ] 도메인 구매 (선택사항)
- [ ] DNS 설정
- [ ] HTTPS 인증서 (Vercel/Railway 자동)
- [ ] CORS 설정 업데이트

### 5.5 성능 최적화 (2-3일)

**Frontend**
- [ ] 코드 스플리팅
  ```typescript
  const MenuDetail = lazy(() => import('./pages/MenuDetail'));
  ```
- [ ] 이미지 최적화 (WebP, lazy loading)
- [ ] 번들 크기 분석
  ```bash
  npm run build
  npm run analyze
  ```

**Backend**
- [ ] 데이터베이스 인덱싱 확인
- [ ] 쿼리 최적화 (N+1 문제)
- [ ] 응답 압축 (gzip)
- [ ] 캐싱 헤더 설정

### 5.6 최종 테스트 (2일)

**테스트 항목**
- [ ] 전체 기능 테스트
- [ ] 반응형 테스트 (모바일, 태블릿, 데스크톱)
- [ ] 브라우저 호환성 (Chrome, Safari, Firefox)
- [ ] 성능 테스트 (Lighthouse)
- [ ] 접근성 테스트 (WCAG)

### Phase 5 완료 기준

- [ ] 프론트엔드 배포 완료 (Vercel)
- [ ] 백엔드 배포 완료 (Railway)
- [ ] 데이터베이스 연동 확인
- [ ] HTTPS 적용
- [ ] 모든 기능 정상 동작

**산출물**
- 🌐 배포된 웹사이트
- 🔒 HTTPS 보안 적용
- 📈 성능 최적화 완료

---

## Phase 6: 고도화 (지속적)

**기간**: 지속적
**우선순위**: 낮음 → 중간

### 6.1 추가 기능 개발

**우선순위별 기능**

**높음**
- [ ] 메뉴 비교 기능
- [ ] 고급 필터링 (영양소별)
- [ ] 사용자 즐겨찾기 (로컬 스토리지)

**중간**
- [ ] 관리자 페이지 (메뉴 등록/수정)
- [ ] 이미지 업로드 기능
- [ ] 데이터 검증 시스템

**낮음**
- [ ] 사용자 계정 시스템
- [ ] 리뷰 및 평점
- [ ] 소셜 로그인
- [ ] 개인화 추천

### 6.2 데이터 확장

- [ ] 브랜드 50개로 확장
- [ ] 메뉴 500개로 확장
- [ ] Grade A 데이터 100개 이상
- [ ] 신메뉴 주기적 업데이트

### 6.3 분석 및 개선

- [ ] Google Analytics 연동
- [ ] 사용자 행동 분석
- [ ] 성능 모니터링 (Sentry)
- [ ] A/B 테스트

---

## 🎯 마일스톤

### Milestone 1: MVP 완성 (Phase 1-2 완료)
- 프론트엔드 기본 UI
- Mock 데이터 연동
- 로컬 실행 가능

**목표일**: Phase 2 종료 시

### Milestone 2: Full-stack 완성 (Phase 1-3 완료)
- 백엔드 API 완성
- 데이터베이스 연동
- 로컬 Full-stack 실행

**목표일**: Phase 3 종료 시

### Milestone 3: 데이터 기반 서비스 (Phase 1-4 완료)
- 실제 치킨 데이터 200개+
- 건강 점수 계산 완료
- 실제 사용 가능한 서비스

**목표일**: Phase 4 종료 시

### Milestone 4: 서비스 런칭 (Phase 1-5 완료)
- 실서비스 배포
- 도메인 연결
- 공개 출시

**목표일**: Phase 5 종료 시

---

## 📊 리스크 관리

### 잠재적 리스크

**1. 영양 데이터 수집 어려움**
- **리스크**: 브랜드에서 영양성분표 비공개
- **대응**: Grade B/C 추정 데이터 사용, nutrition-checker 로직 활용

**2. 개발 일정 지연**
- **리스크**: 예상보다 오래 걸림
- **대응**: MVP 기능만 우선 구현, 고도화 기능은 나중에

**3. 배포 비용**
- **리스크**: 서버 비용 발생
- **대응**: 무료 티어 활용 (Vercel, Railway Free Plan)

**4. 데이터 최신성 유지**
- **리스크**: 메뉴 변경/단종
- **대응**: 주기적 업데이트 프로세스 수립

---

## 🚀 다음 단계

### 즉시 시작 가능한 작업

**Phase 2 시작하기**
```bash
# 1. 프로젝트 초기화
cd "C:\Claude\치킨은 살 안 쪄"
npm create vite@latest frontend -- --template react-ts

# 2. 패키지 설치
cd frontend
npm install
npm install tailwindcss postcss autoprefixer
npm install react-router-dom zustand axios recharts

# 3. 개발 서버 실행
npm run dev
```

**우선 구현할 컴포넌트**
1. Layout (Header, Footer)
2. Home 페이지
3. MenuCard 컴포넌트
4. MenuList 페이지

---

**Last Updated**: 2025-10-15
