# 데이터베이스 스키마 설계

## 🗄️ 데이터베이스 개요

- **DBMS**: PostgreSQL 14+
- **ORM**: Prisma
- **인코딩**: UTF-8
- **Timezone**: Asia/Seoul

## 📊 ERD (Entity Relationship Diagram)

```
┌─────────────────┐
│     Brands      │
│─────────────────│
│ id (PK)         │
│ name            │
│ nameEng         │
│ logo            │
│ description     │
│ website         │
│ createdAt       │
│ updatedAt       │
└────────┬────────┘
         │
         │ 1:N
         │
┌────────▼────────┐
│   MenuItems     │
│─────────────────│
│ id (PK)         │
│ brandId (FK)    │──┐
│ name            │  │
│ nameEng         │  │
│ category        │  │
│ description     │  │
│ image           │  │
│ servingSize     │  │
│ healthScore     │  │
│ isActive        │  │
│ createdAt       │  │
│ updatedAt       │  │
└────────┬────────┘  │
         │            │
         │ 1:1        │
         │            │
┌────────▼────────┐  │
│ NutritionInfo   │  │
│─────────────────│  │
│ id (PK)         │  │
│ menuId (FK)     │  │
│ calories        │  │
│ carbs           │  │
│ protein         │  │
│ fat             │  │
│ ... (38 fields) │  │
│ dataQuality     │  │
│ source          │  │
│ verifiedAt      │  │
│ createdAt       │  │
│ updatedAt       │  │
└─────────────────┘  │
                     │
         ┌───────────┘
         │ 1:N
         │
┌────────▼────────┐
│HealthScoreLog  │
│─────────────────│
│ id (PK)         │
│ menuId (FK)     │
│ totalScore      │
│ calorieScore    │
│ macroBalance    │
│ sodiumScore     │
│ ... (breakdown) │
│ calculatedAt    │
└─────────────────┘
```

## 📝 테이블 상세 설계

### 1. Brands (브랜드 테이블)

치킨 프랜차이즈 브랜드 정보

```sql
CREATE TABLE brands (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(100) NOT NULL UNIQUE,  -- 브랜드명 (한글)
  name_eng      VARCHAR(100),                  -- 브랜드명 (영문)
  logo          TEXT,                          -- 로고 이미지 URL
  description   TEXT,                          -- 브랜드 설명
  website       VARCHAR(255),                  -- 공식 웹사이트
  created_at    TIMESTAMP DEFAULT NOW(),
  updated_at    TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_brands_name ON brands(name);
```

**Prisma 스키마**
```prisma
model Brand {
  id          Int         @id @default(autoincrement())
  name        String      @unique @db.VarChar(100)
  nameEng     String?     @db.VarChar(100)
  logo        String?     @db.Text
  description String?     @db.Text
  website     String?     @db.VarChar(255)
  createdAt   DateTime    @default(now()) @map("created_at")
  updatedAt   DateTime    @updatedAt @map("updated_at")

  menuItems   MenuItem[]

  @@index([name])
  @@map("brands")
}
```

**샘플 데이터**
```json
{
  "id": 1,
  "name": "BBQ",
  "nameEng": "BBQ Chicken",
  "logo": "https://example.com/bbq-logo.png",
  "description": "1995년 창업한 대한민국 1호 프라이드 치킨 브랜드",
  "website": "https://www.bbq.co.kr"
}
```

---

### 2. MenuItems (메뉴 테이블)

치킨 메뉴 정보

```sql
CREATE TABLE menu_items (
  id            SERIAL PRIMARY KEY,
  brand_id      INTEGER NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  name          VARCHAR(200) NOT NULL,         -- 메뉴명
  name_eng      VARCHAR(200),                  -- 메뉴명 (영문)
  category      VARCHAR(50) NOT NULL,          -- 메뉴 카테고리
  description   TEXT,                          -- 메뉴 설명
  image         TEXT,                          -- 메뉴 이미지 URL
  serving_size  INTEGER DEFAULT 1000,          -- 1인분 크기 (g)
  health_score  INTEGER CHECK (health_score >= 0 AND health_score <= 100),
  is_active     BOOLEAN DEFAULT TRUE,          -- 판매 여부
  created_at    TIMESTAMP DEFAULT NOW(),
  updated_at    TIMESTAMP DEFAULT NOW(),

  UNIQUE(brand_id, name)
);

CREATE INDEX idx_menu_items_brand_id ON menu_items(brand_id);
CREATE INDEX idx_menu_items_category ON menu_items(category);
CREATE INDEX idx_menu_items_health_score ON menu_items(health_score);
CREATE INDEX idx_menu_items_name ON menu_items(name);
```

**카테고리 목록**
- `fried`: 후라이드
- `seasoned`: 양념치킨
- `soy`: 간장치킨
- `honey`: 허니치킨
- `spicy`: 매운치킨
- `garlic`: 마늘치킨
- `cheese`: 치즈치킨
- `boneless`: 순살치킨
- `special`: 특수메뉴

**Prisma 스키마**
```prisma
enum MenuCategory {
  FRIED
  SEASONED
  SOY
  HONEY
  SPICY
  GARLIC
  CHEESE
  BONELESS
  SPECIAL
}

model MenuItem {
  id           Int            @id @default(autoincrement())
  brandId      Int            @map("brand_id")
  name         String         @db.VarChar(200)
  nameEng      String?        @db.VarChar(200)
  category     MenuCategory
  description  String?        @db.Text
  image        String?        @db.Text
  servingSize  Int            @default(1000) @map("serving_size")
  healthScore  Int?           @map("health_score")
  isActive     Boolean        @default(true) @map("is_active")
  createdAt    DateTime       @default(now()) @map("created_at")
  updatedAt    DateTime       @updatedAt @map("updated_at")

  brand        Brand          @relation(fields: [brandId], references: [id], onDelete: Cascade)
  nutrition    NutritionInfo?
  scoreLog     HealthScoreLog[]

  @@unique([brandId, name])
  @@index([brandId])
  @@index([category])
  @@index([healthScore])
  @@index([name])
  @@map("menu_items")
}
```

**샘플 데이터**
```json
{
  "id": 1,
  "brandId": 1,
  "name": "황금올리브치킨",
  "nameEng": "Golden Olive Chicken",
  "category": "FRIED",
  "description": "100% 스페인산 올리브유로 튀긴 바삭한 치킨",
  "image": "https://example.com/golden-olive.jpg",
  "servingSize": 1000,
  "healthScore": 72,
  "isActive": true
}
```

---

### 3. NutritionInfo (영양 정보 테이블)

nutrition-checker 프로젝트의 38가지 필수영양소 구조 참고

```sql
CREATE TABLE nutrition_info (
  id                      SERIAL PRIMARY KEY,
  menu_id                 INTEGER UNIQUE NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,

  -- 기본 영양소
  calories                DECIMAL(8,2) NOT NULL,  -- 칼로리 (kcal)
  carbs                   DECIMAL(8,2),           -- 탄수화물 (g)
  sugar                   DECIMAL(8,2),           -- 당류 (g)
  protein                 DECIMAL(8,2),           -- 단백질 (g)
  fat                     DECIMAL(8,2),           -- 지방 (g)
  saturated_fat           DECIMAL(8,2),           -- 포화지방 (g)
  trans_fat               DECIMAL(8,2),           -- 트랜스지방 (g)
  cholesterol             DECIMAL(8,2),           -- 콜레스테롤 (mg)
  sodium                  DECIMAL(8,2),           -- 나트륨 (mg)
  fiber                   DECIMAL(8,2),           -- 식이섬유 (g)

  -- 필수 아미노산 (mg)
  isoleucine              DECIMAL(8,2),
  leucine                 DECIMAL(8,2),
  valine                  DECIMAL(8,2),
  lysine                  DECIMAL(8,2),
  methionine              DECIMAL(8,2),
  phenylalanine           DECIMAL(8,2),
  threonine               DECIMAL(8,2),
  tryptophan              DECIMAL(8,2),
  histidine               DECIMAL(8,2),

  -- 필수 지방산 (g)
  linoleic_acid           DECIMAL(8,2),           -- 오메가-6
  alpha_linolenic_acid    DECIMAL(8,2),           -- 오메가-3

  -- 지용성 비타민
  vitamin_a               DECIMAL(8,2),           -- μg
  vitamin_d               DECIMAL(8,2),           -- μg
  vitamin_e               DECIMAL(8,2),           -- mg
  vitamin_k               DECIMAL(8,2),           -- μg

  -- 수용성 비타민
  vitamin_b1              DECIMAL(8,2),           -- mg
  vitamin_b2              DECIMAL(8,2),           -- mg
  vitamin_b3              DECIMAL(8,2),           -- mg
  vitamin_b5              DECIMAL(8,2),           -- mg
  vitamin_b6              DECIMAL(8,2),           -- mg
  vitamin_b7              DECIMAL(8,2),           -- μg
  vitamin_b9              DECIMAL(8,2),           -- μg
  vitamin_b12             DECIMAL(8,2),           -- μg
  vitamin_c               DECIMAL(8,2),           -- mg

  -- 다량 무기질 (mg)
  calcium                 DECIMAL(8,2),
  phosphorus              DECIMAL(8,2),
  potassium               DECIMAL(8,2),
  chlorine                DECIMAL(8,2),
  magnesium               DECIMAL(8,2),

  -- 미량 무기질
  iron                    DECIMAL(8,2),           -- mg
  zinc                    DECIMAL(8,2),           -- mg
  copper                  DECIMAL(8,2),           -- μg
  manganese               DECIMAL(8,2),           -- mg
  iodine                  DECIMAL(8,2),           -- μg
  selenium                DECIMAL(8,2),           -- μg
  molybdenum              DECIMAL(8,2),           -- μg
  chromium                DECIMAL(8,2),           -- μg

  -- 메타 정보
  data_quality            CHAR(1) DEFAULT 'C',    -- A: 검증됨, B: 추정, C: 미검증
  source                  VARCHAR(255),           -- 데이터 출처
  verified_at             TIMESTAMP,              -- 검증 일시
  created_at              TIMESTAMP DEFAULT NOW(),
  updated_at              TIMESTAMP DEFAULT NOW(),

  CHECK (data_quality IN ('A', 'B', 'C'))
);

CREATE INDEX idx_nutrition_info_menu_id ON nutrition_info(menu_id);
CREATE INDEX idx_nutrition_info_quality ON nutrition_info(data_quality);
```

**Prisma 스키마**
```prisma
enum DataQuality {
  A  // 공식 검증 데이터
  B  // 추정 데이터 (신뢰도 높음)
  C  // 미검증 데이터
}

model NutritionInfo {
  id                   Int          @id @default(autoincrement())
  menuId               Int          @unique @map("menu_id")

  // 기본 영양소
  calories             Decimal      @db.Decimal(8, 2)
  carbs                Decimal?     @db.Decimal(8, 2)
  sugar                Decimal?     @db.Decimal(8, 2)
  protein              Decimal?     @db.Decimal(8, 2)
  fat                  Decimal?     @db.Decimal(8, 2)
  saturatedFat         Decimal?     @db.Decimal(8, 2) @map("saturated_fat")
  transFat             Decimal?     @db.Decimal(8, 2) @map("trans_fat")
  cholesterol          Decimal?     @db.Decimal(8, 2)
  sodium               Decimal?     @db.Decimal(8, 2)
  fiber                Decimal?     @db.Decimal(8, 2)

  // 필수 아미노산
  isoleucine           Decimal?     @db.Decimal(8, 2)
  leucine              Decimal?     @db.Decimal(8, 2)
  valine               Decimal?     @db.Decimal(8, 2)
  lysine               Decimal?     @db.Decimal(8, 2)
  methionine           Decimal?     @db.Decimal(8, 2)
  phenylalanine        Decimal?     @db.Decimal(8, 2)
  threonine            Decimal?     @db.Decimal(8, 2)
  tryptophan           Decimal?     @db.Decimal(8, 2)
  histidine            Decimal?     @db.Decimal(8, 2)

  // 필수 지방산
  linoleicAcid         Decimal?     @db.Decimal(8, 2) @map("linoleic_acid")
  alphaLinolenicAcid   Decimal?     @db.Decimal(8, 2) @map("alpha_linolenic_acid")

  // 지용성 비타민
  vitaminA             Decimal?     @db.Decimal(8, 2) @map("vitamin_a")
  vitaminD             Decimal?     @db.Decimal(8, 2) @map("vitamin_d")
  vitaminE             Decimal?     @db.Decimal(8, 2) @map("vitamin_e")
  vitaminK             Decimal?     @db.Decimal(8, 2) @map("vitamin_k")

  // 수용성 비타민
  vitaminB1            Decimal?     @db.Decimal(8, 2) @map("vitamin_b1")
  vitaminB2            Decimal?     @db.Decimal(8, 2) @map("vitamin_b2")
  vitaminB3            Decimal?     @db.Decimal(8, 2) @map("vitamin_b3")
  vitaminB5            Decimal?     @db.Decimal(8, 2) @map("vitamin_b5")
  vitaminB6            Decimal?     @db.Decimal(8, 2) @map("vitamin_b6")
  vitaminB7            Decimal?     @db.Decimal(8, 2) @map("vitamin_b7")
  vitaminB9            Decimal?     @db.Decimal(8, 2) @map("vitamin_b9")
  vitaminB12           Decimal?     @db.Decimal(8, 2) @map("vitamin_b12")
  vitaminC             Decimal?     @db.Decimal(8, 2) @map("vitamin_c")

  // 다량 무기질
  calcium              Decimal?     @db.Decimal(8, 2)
  phosphorus           Decimal?     @db.Decimal(8, 2)
  potassium            Decimal?     @db.Decimal(8, 2)
  chlorine             Decimal?     @db.Decimal(8, 2)
  magnesium            Decimal?     @db.Decimal(8, 2)

  // 미량 무기질
  iron                 Decimal?     @db.Decimal(8, 2)
  zinc                 Decimal?     @db.Decimal(8, 2)
  copper               Decimal?     @db.Decimal(8, 2)
  manganese            Decimal?     @db.Decimal(8, 2)
  iodine               Decimal?     @db.Decimal(8, 2)
  selenium             Decimal?     @db.Decimal(8, 2)
  molybdenum           Decimal?     @db.Decimal(8, 2)
  chromium             Decimal?     @db.Decimal(8, 2)

  // 메타 정보
  dataQuality          DataQuality  @default(C) @map("data_quality")
  source               String?      @db.VarChar(255)
  verifiedAt           DateTime?    @map("verified_at")
  createdAt            DateTime     @default(now()) @map("created_at")
  updatedAt            DateTime     @updatedAt @map("updated_at")

  menuItem             MenuItem     @relation(fields: [menuId], references: [id], onDelete: Cascade)

  @@index([menuId])
  @@index([dataQuality])
  @@map("nutrition_info")
}
```

---

### 4. HealthScoreLog (건강 점수 로그)

건강 점수 계산 이력 및 상세 분석

```sql
CREATE TABLE health_score_log (
  id                    SERIAL PRIMARY KEY,
  menu_id               INTEGER NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,

  -- 총점
  total_score           INTEGER NOT NULL CHECK (total_score >= 0 AND total_score <= 100),

  -- 점수 구성 (ARCHITECTURE.md 참고)
  calorie_score         DECIMAL(4,1),   -- 칼로리 점수 (15점)
  macro_balance         DECIMAL(4,1),   -- 탄단지 균형 (15점)
  sodium_score          DECIMAL(4,1),   -- 나트륨 점수 (10점)
  protein_quality       DECIMAL(4,1),   -- 단백질 품질 (10점)
  vitamin_score         DECIMAL(4,1),   -- 비타민 점수 (10점)
  mineral_score         DECIMAL(4,1),   -- 미네랄 점수 (10점)
  fiber_score           DECIMAL(4,1),   -- 식이섬유 점수 (10점)
  essential_nutrients   DECIMAL(4,1),   -- 필수영양소 (10점)
  healthy_fats          DECIMAL(4,1),   -- 건강한 지방 (5점)
  low_sugar             DECIMAL(4,1),   -- 저당 점수 (5점)

  -- 메타 정보
  algorithm_version     VARCHAR(10) DEFAULT 'v1.0',
  calculated_at         TIMESTAMP DEFAULT NOW(),

  INDEX idx_health_score_menu_id (menu_id),
  INDEX idx_health_score_calculated_at (calculated_at)
);
```

**Prisma 스키마**
```prisma
model HealthScoreLog {
  id                  Int      @id @default(autoincrement())
  menuId              Int      @map("menu_id")

  totalScore          Int      @map("total_score")
  calorieScore        Decimal? @db.Decimal(4, 1) @map("calorie_score")
  macroBalance        Decimal? @db.Decimal(4, 1) @map("macro_balance")
  sodiumScore         Decimal? @db.Decimal(4, 1) @map("sodium_score")
  proteinQuality      Decimal? @db.Decimal(4, 1) @map("protein_quality")
  vitaminScore        Decimal? @db.Decimal(4, 1) @map("vitamin_score")
  mineralScore        Decimal? @db.Decimal(4, 1) @map("mineral_score")
  fiberScore          Decimal? @db.Decimal(4, 1) @map("fiber_score")
  essentialNutrients  Decimal? @db.Decimal(4, 1) @map("essential_nutrients")
  healthyFats         Decimal? @db.Decimal(4, 1) @map("healthy_fats")
  lowSugar            Decimal? @db.Decimal(4, 1) @map("low_sugar")

  algorithmVersion    String   @default("v1.0") @db.VarChar(10) @map("algorithm_version")
  calculatedAt        DateTime @default(now()) @map("calculated_at")

  menuItem            MenuItem @relation(fields: [menuId], references: [id], onDelete: Cascade)

  @@index([menuId])
  @@index([calculatedAt])
  @@map("health_score_log")
}
```

---

## 🔍 주요 쿼리 예시

### 1. 브랜드별 메뉴 조회 (영양 정보 포함)

```typescript
// Prisma
const menuWithNutrition = await prisma.menuItem.findMany({
  where: { brandId: 1 },
  include: {
    nutrition: true,
    brand: true
  },
  orderBy: { healthScore: 'desc' }
});
```

### 2. 건강 점수 높은 메뉴 Top 10

```typescript
const topHealthyMenus = await prisma.menuItem.findMany({
  where: {
    isActive: true,
    healthScore: { gte: 70 }
  },
  include: {
    brand: true,
    nutrition: true
  },
  orderBy: { healthScore: 'desc' },
  take: 10
});
```

### 3. 칼로리 범위 필터링

```typescript
const lowCalMenus = await prisma.menuItem.findMany({
  where: {
    nutrition: {
      calories: {
        gte: 500,
        lte: 800
      }
    }
  },
  include: {
    brand: true,
    nutrition: true
  }
});
```

### 4. 검색 (메뉴명 또는 브랜드명)

```typescript
const searchResults = await prisma.menuItem.findMany({
  where: {
    OR: [
      { name: { contains: '양념', mode: 'insensitive' } },
      { brand: { name: { contains: '교촌', mode: 'insensitive' } } }
    ]
  },
  include: {
    brand: true,
    nutrition: true
  }
});
```

---

## 🚀 마이그레이션 전략

### 초기 마이그레이션

```bash
# Prisma 초기화
npx prisma init

# 스키마 작성 후 마이그레이션 생성
npx prisma migrate dev --name init

# 데이터베이스 동기화
npx prisma generate
```

### 데이터 시딩

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 브랜드 시드
  await prisma.brand.createMany({
    data: [
      { name: 'BBQ', nameEng: 'BBQ Chicken', website: 'https://www.bbq.co.kr' },
      { name: '교촌치킨', nameEng: 'Kyochon', website: 'https://www.kyochon.com' },
      { name: 'BHC', nameEng: 'BHC Chicken', website: 'https://www.bhc.co.kr' }
      // ... 더 많은 브랜드
    ]
  });

  console.log('Seed completed');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
```

---

## 📈 인덱스 최적화

### 복합 인덱스

```sql
-- 브랜드 + 건강점수 복합 인덱스
CREATE INDEX idx_menu_brand_health ON menu_items(brand_id, health_score DESC);

-- 카테고리 + 활성 여부 복합 인덱스
CREATE INDEX idx_menu_category_active ON menu_items(category, is_active);

-- 칼로리 범위 검색 최적화
CREATE INDEX idx_nutrition_calories ON nutrition_info(calories);
```

---

## 🔒 보안 고려사항

1. **SQL Injection 방지**: Prisma ORM 사용으로 자동 방지
2. **민감 정보 암호화**: 없음 (공개 영양 정보)
3. **접근 제어**: 읽기 전용 API, 관리자만 쓰기 가능
4. **데이터 검증**: Zod 스키마로 입력 검증

---

**Last Updated**: 2025-10-15
