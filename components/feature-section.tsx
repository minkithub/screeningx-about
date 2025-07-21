'use client';

import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

interface FeatureSectionProps {
  currentSlide: number;
}

export default function FeatureSection({ currentSlide }: FeatureSectionProps) {
  const slideImages = ['/s1.png', '/s2.png', '/s3.png', '/s4.png'];
  const [slideStyles, setSlideStyles] = useState({
    width: '240px',
    height: '426px', // 16:9 비율 기본값
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  });
  const backgroundRef = useRef<HTMLDivElement>(null);

  // feature.png의 실제 렌더링된 크기와 위치를 감지하여 슬라이드 이미지 위치 계산
  useEffect(() => {
    const calculateSlidePosition = () => {
      if (backgroundRef.current) {
        const containerWidth = backgroundRef.current.offsetWidth;
        const containerHeight = backgroundRef.current.offsetHeight;

        // feature.png의 원본 비율 (실제 feature.png 비율에 맞춰 조정 필요)
        const featureAspectRatio = 0.6; // 가로:세로 비율

        let actualFeatureWidth, actualFeatureHeight, featureLeft, featureTop;

        if (containerWidth / containerHeight > featureAspectRatio) {
          // 높이에 맞춰서 렌더링 (상하 여백 없음, 좌우 여백 있음)
          actualFeatureHeight = containerHeight;
          actualFeatureWidth = containerHeight * featureAspectRatio;
          featureLeft = (containerWidth - actualFeatureWidth) / 2;
          featureTop = 0;
        } else {
          // 너비에 맞춰서 렌더링 (좌우 여백 없음, 상하 여백 있음)
          actualFeatureWidth = containerWidth;
          actualFeatureHeight = containerWidth / featureAspectRatio;
          featureLeft = 0;
          featureTop = (containerHeight - actualFeatureHeight) / 2;
        }

        const slideWidth = actualFeatureWidth * 0.6;
        const slideHeight = slideWidth * 1.777; // 16:9 비율 (슬라이드 이미지 비율에 맞춰 조정)

        // 슬라이드 이미지 위치 (feature.png 내부의 스마트폰 화면 영역)
        // feature.png 내에서 스마트폰 화면이 위치한 비율 (실제 이미지에 맞춰 조정 필요)
        const phoneScreenLeft = featureLeft + actualFeatureWidth * 0.2; // 왼쪽에서 15% 지점
        const phoneScreenTop = featureTop + actualFeatureHeight * 0.3; // 위에서 20% 지점

        setSlideStyles({
          width: `${Math.max(180, Math.min(350, slideWidth))}px`,
          height: `${Math.max(320, Math.min(622, slideHeight))}px`,
          left: `${phoneScreenLeft}px`,
          top: `${phoneScreenTop}px`,
          transform: 'none',
        });
      }
    };

    calculateSlidePosition();
    window.addEventListener('resize', calculateSlidePosition);

    // 이미지 로드 완료 후에도 다시 계산
    const timer = setTimeout(calculateSlidePosition, 100);

    return () => {
      window.removeEventListener('resize', calculateSlidePosition);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-custom-cream feature-section mobile-viewport-fix"
      style={{
        minHeight: '100vh',
        maxHeight: '100vh',
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
          />

          {/* 슬라이드 이미지 컨테이너 - feature.png 내부 스마트폰 화면 영역에 고정 */}
          <div
            className="absolute transition-opacity duration-300 ease-in-out feature-slide"
            style={{
              width: slideStyles.width,
              height: slideStyles.height,
              left: slideStyles.left,
              top: slideStyles.top,
              transform: slideStyles.transform,
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
