import { useState, useEffect } from 'react';

interface MenuImageProps {
  imageUrl?: string;
  imageUrls?: string[]; // 다중 폴백 URL
  menuId: string;
  brandId: string;
  alt: string;
  className?: string;
}

/**
 * 메뉴 이미지 컴포넌트
 * 여러 이미지 URL을 폴백으로 시도
 */
const MenuImage = ({ imageUrl, imageUrls, menuId, brandId, alt, className = '' }: MenuImageProps) => {
  // URL 목록 구성: imageUrls가 있으면 사용, 없으면 imageUrl 단일 사용
  const urlList = imageUrls && imageUrls.length > 0 ? imageUrls : (imageUrl ? [imageUrl] : []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 브랜드별 이름
  const brandNames: Record<string, string> = {
    'bhc': 'BHC',
    'kyochon': '교촌',
    'puradak': '푸라닭',
    'hosigi': '호식이',
    '60gye': '60계',
  };

  const brandName = brandNames[brandId] || '치킨';

  // imageUrls가 변경될 때 초기화
  useEffect(() => {
    setCurrentIndex(0);
    setHasError(false);
    setIsLoading(true);
  }, [imageUrls, imageUrl]);

  const handleError = () => {
    const nextIndex = currentIndex + 1;

    // 다음 URL이 있으면 시도
    if (nextIndex < urlList.length) {
      setCurrentIndex(nextIndex);
      setIsLoading(true);
    } else {
      // 모든 URL 실패 - 플레이스홀더 표시
      setHasError(true);
      setIsLoading(false);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  // 플레이스홀더 SVG (간단한 방식)
  const placeholderSvg = `data:image/svg+xml,${encodeURIComponent(`
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad${menuId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f4a261;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e76f51;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#grad${menuId})"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="80" fill="white" opacity="0.9">🍗</text>
      <text x="50%" y="75%" dominant-baseline="middle" text-anchor="middle" font-size="20" fill="white" opacity="0.8" font-family="Arial">${brandName}</text>
    </svg>
  `)}`;

  // 현재 시도할 URL
  const currentUrl = urlList[currentIndex];

  return (
    <div className="relative w-full h-full">
      {/* 로딩 상태 */}
      {isLoading && !hasError && currentUrl && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-400 to-red-500 animate-pulse">
          <div className="text-white text-4xl">⏳</div>
        </div>
      )}

      {/* 이미지 또는 플레이스홀더 */}
      {!hasError && currentUrl ? (
        <img
          key={currentIndex} // 키를 사용하여 URL 변경 시 강제 리렌더링
          src={currentUrl}
          alt={alt}
          className={`w-full h-full object-cover ${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onError={handleError}
          onLoad={handleLoad}
          loading="lazy"
        />
      ) : (
        <img
          src={placeholderSvg}
          alt={`${brandName} 치킨`}
          className={`w-full h-full object-cover ${className}`}
        />
      )}

      {/* 디버그 정보 (개발 중) */}
      {import.meta.env.DEV && urlList.length > 1 && (
        <div className="absolute bottom-2 left-2 text-xs bg-black bg-opacity-50 text-white px-2 py-1 rounded">
          {hasError ? '⚠️ 플레이스홀더' : `${currentIndex + 1}/${urlList.length}`}
        </div>
      )}
    </div>
  );
};

export default MenuImage;
