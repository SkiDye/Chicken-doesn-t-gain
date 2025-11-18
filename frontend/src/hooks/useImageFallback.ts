import { useState, useEffect, useMemo } from 'react';
import { getImageFallbackUrls, createPlaceholderDataUrl, ImageFallbackConfig } from '../utils/imageFallback';

/**
 * 이미지 폴백 훅
 * 여러 URL을 순차적으로 시도하고, 모두 실패하면 플레이스홀더를 반환
 */
export function useImageFallback(config: ImageFallbackConfig) {
  const fallbackUrls = useMemo(() => getImageFallbackUrls(config), [config.originalUrl, config.menuId, config.brandId]);
  const [currentUrl, setCurrentUrl] = useState<string>(fallbackUrls[0] || '');
  const [urlIndex, setUrlIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // URL 변경 시 초기화
  useEffect(() => {
    const firstUrl = fallbackUrls[0] || '';
    setCurrentUrl(firstUrl);
    setUrlIndex(0);
    setIsLoading(true);
    setHasError(false);
  }, [fallbackUrls]);

  const handleError = () => {
    const nextIndex = urlIndex + 1;

    if (nextIndex < fallbackUrls.length) {
      // 다음 폴백 URL 시도
      setUrlIndex(nextIndex);
      setCurrentUrl(fallbackUrls[nextIndex]);
      setIsLoading(true);
    } else {
      // 모든 URL 실패 - SVG 플레이스홀더 사용
      setCurrentUrl(createPlaceholderDataUrl(config.brandId));
      setIsLoading(false);
      setHasError(true);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  return {
    src: currentUrl,
    onError: handleError,
    onLoad: handleLoad,
    isLoading,
    hasError,
  };
}
