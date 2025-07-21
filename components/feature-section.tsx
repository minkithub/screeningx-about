'use client';

import Image from 'next/image';
import { useEffect, useState, useRef, useCallback } from 'react';

interface FeatureSectionProps {
  currentSlide: number;
}

export default function FeatureSection({ currentSlide }: FeatureSectionProps) {
  const slideImages = ['/s1.png', '/s2.png', '/s3.png', '/s4.png'];
  const [slideStyles, setSlideStyles] = useState({
    width: '240px',
    height: '426px',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  });
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [viewportHeight, setViewportHeight] = useState('100vh');

  // viewport 높이 감지 및 설정
  useEffect(() => {
    const setVH = () => {
      // 실제 viewport 높이 계산
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);

      // 모바일에서는 동적 높이 사용
      if (window.innerWidth <= 768) {
        setViewportHeight(`${window.innerHeight}px`);
      } else {
        setViewportHeight('100vh');
      }
    };

    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

  // 슬라이드 위치 계산 함수 - useCallback으로 최적화
  const calculateSlidePosition = useCallback(() => {
    if (!backgroundRef.current || !isImageLoaded) return;

    const containerWidth = backgroundRef.current.offsetWidth;
    const containerHeight = backgroundRef.current.offsetHeight;

    // 유효하지 않은 크기일 때는 계산하지 않음
    if (containerWidth === 0 || containerHeight === 0) {
      setTimeout(calculateSlidePosition, 100);
      return;
    }

    // feature.png의 원본 비율
    const featureAspectRatio = 0.6;

    let actualFeatureWidth, actualFeatureHeight, featureLeft, featureTop;

    if (containerWidth / containerHeight > featureAspectRatio) {
      // 높이에 맞춰서 렌더링
      actualFeatureHeight = containerHeight;
      actualFeatureWidth = containerHeight * featureAspectRatio;
      featureLeft = (containerWidth - actualFeatureWidth) / 2;
      featureTop = 0;
    } else {
      // 너비에 맞춰서 렌더링
      actualFeatureWidth = containerWidth;
      actualFeatureHeight = containerWidth / featureAspectRatio;
      featureLeft = 0;
      featureTop = (containerHeight - actualFeatureHeight) / 2;
    }

    const slideWidth = actualFeatureWidth * 0.6;
    const slideHeight = slideWidth * 1.777;

    // 슬라이드 이미지 위치
    const phoneScreenLeft = featureLeft + actualFeatureWidth * 0.2;
    const phoneScreenTop = featureTop + actualFeatureHeight * 0.3;

    setSlideStyles({
      width: `${Math.max(180, Math.min(350, slideWidth))}px`,
      height: `${Math.max(320, Math.min(622, slideHeight))}px`,
      left: `${phoneScreenLeft}px`,
      top: `${phoneScreenTop}px`,
      transform: 'none',
    });
  }, [isImageLoaded]);

  // feature.png 로드 완료 핸들러
  const handleImageLoad = useCallback(() => {
    setIsImageLoaded(true);
  }, []);

  // 이미지 로드 및 resize 이벤트 처리
  useEffect(() => {
    calculateSlidePosition();

    const handleResize = () => {
      // debounce를 위한 setTimeout
      setTimeout(calculateSlidePosition, 50);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [calculateSlidePosition]);

  // 이미지 로드 상태가 변경될 때 위치 재계산
  useEffect(() => {
    if (isImageLoaded) {
      // 약간의 지연을 두고 계산하여 이미지 렌더링 완료를 보장
      setTimeout(calculateSlidePosition, 100);
      setTimeout(calculateSlidePosition, 300);
    }
  }, [isImageLoaded, calculateSlidePosition]);

  return (
    <div
      className="relative w-full overflow-hidden bg-custom-cream feature-section"
      style={{
        height: viewportHeight,
        minHeight: viewportHeight,
        maxHeight: viewportHeight,
      }}>
      {/* 배경 이미지 컨테이너 */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 feature-background px-4">
        {/* feature.png 배경 이미지 */}
        <div
          className="w-full h-full"
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
          }}>
          <Image
            src="/feature.png"
            alt="펫쏙쏙 앱 기능 소개"
            fill
            className="object-contain object-center"
            priority
            sizes="100vw"
            onLoad={handleImageLoad}
            onError={() => {
              // 이미지 로드 실패 시에도 위치 계산 시도
              setTimeout(() => setIsImageLoaded(true), 1000);
            }}
          />

          {/* 슬라이드 이미지 컨테이너 */}
          <div
            className="absolute transition-opacity duration-300 ease-in-out feature-slide"
            style={{
              width: slideStyles.width,
              height: slideStyles.height,
              left: slideStyles.left,
              top: slideStyles.top,
              transform: slideStyles.transform,
              visibility: isImageLoaded ? 'visible' : 'hidden',
            }}>
            <Image
              src={slideImages[currentSlide]}
              alt={`슬라이드 ${currentSlide + 1}`}
              width={parseInt(slideStyles.width)}
              height={parseInt(slideStyles.height)}
              className="object-contain transition-opacity duration-300"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
