/**
 * 이미지 폴백 유틸리티
 * 브랜드 공식 이미지 -> 로컬 이미지 -> 브랜드 기본 이미지 -> 플레이스홀더 순으로 폴백
 */

export interface ImageFallbackConfig {
  originalUrl?: string;
  menuId?: string;
  brandId?: string;
  basePath?: string;
}

/**
 * 메뉴 이미지 폴백 URL 목록 생성
 */
export function getImageFallbackUrls(config: ImageFallbackConfig): string[] {
  const { originalUrl, menuId, brandId, basePath = '/Chicken-doesn-t-gain' } = config;
  const urls: string[] = [];

  // 1. 원본 URL (브랜드 공식 이미지)
  if (originalUrl) {
    urls.push(originalUrl);
  }

  // 2. 로컬 메뉴별 이미지 (예: /images/menus/bhc-bburing.jpg)
  if (menuId) {
    urls.push(`${basePath}/images/menus/${menuId}.jpg`);
    urls.push(`${basePath}/images/menus/${menuId}.png`);
    urls.push(`${basePath}/images/menus/${menuId}.webp`);
  }

  // 3. 브랜드 기본 이미지 (예: /images/brands/bhc.jpg)
  if (brandId) {
    urls.push(`${basePath}/images/brands/${brandId}.jpg`);
    urls.push(`${basePath}/images/brands/${brandId}.png`);
  }

  // 4. 최종 플레이스홀더 이미지
  urls.push(`${basePath}/images/placeholder/chicken.svg`);
  urls.push(`${basePath}/images/placeholder/chicken.png`);

  // 중복 제거
  return [...new Set(urls)];
}

/**
 * 브랜드 ID로 브랜드 이름 가져오기 (로고용)
 */
export function getBrandName(brandId: string): string {
  const brandNames: Record<string, string> = {
    'bhc': 'BHC',
    'kyochon': '교촌',
    'puradak': '푸라닭',
    'hosigi': '호식이',
    '60gye': '60계',
  };
  return brandNames[brandId] || '치킨';
}

/**
 * 데이터 URL로 플레이스홀더 SVG 생성
 */
export function createPlaceholderDataUrl(brandId?: string): string {
  const brandName = brandId ? getBrandName(brandId) : '치킨';

  const svg = `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#f4a261;stop-opacity:1" /><stop offset="100%" style="stop-color:#e76f51;stop-opacity:1" /></linearGradient></defs><rect width="400" height="300" fill="url(#grad)"/><text x="50%" y="40%" dominant-baseline="middle" text-anchor="middle" font-size="80" fill="white" opacity="0.9">🍗</text><text x="50%" y="65%" dominant-baseline="middle" text-anchor="middle" font-size="24" fill="white" opacity="0.8" font-family="Arial">${brandName}</text></svg>`;

  // URL 인코딩 방식으로 변경 (btoa 대신)
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
