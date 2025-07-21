'use client';

import Image from 'next/image';

interface FeatureSectionProps {
  currentSlide: number;
}

export default function FeatureSection({ currentSlide }: FeatureSectionProps) {
  const slideImages = ['/s1.png', '/s2.png', '/s3.png', '/s4.png'];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-custom-cream">
      {/* 배경 이미지와 슬라이드 이미지를 함께 담는 컨테이너 */}
      <div className="absolute inset-0 px-4">
        {/* feature.png 배경 이미지 */}
        <div className="relative w-full h-full">
          <Image
            src="/feature.png"
            alt="펫쏙쏙 앱 기능 소개"
            fill
            className="object-contain"
            priority
          />

          {/* 슬라이드 이미지 - feature.png 내부의 정확한 위치에 고정 */}
          <div
            className="absolute w-60 h-80 transition-opacity duration-300"
            style={{
              // feature.png를 기준으로 한 상대적 위치
              right: '8%', // 우측에서 8% 지점
              top: '35%', // 상단에서 35% 지점
            }}>
            <Image
              src={slideImages[currentSlide]}
              alt={`슬라이드 ${currentSlide + 1}`}
              fill
              className="object-contain transition-opacity duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
