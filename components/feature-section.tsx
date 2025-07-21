'use client';

import Image from 'next/image';

interface FeatureSectionProps {
  currentSlide: number;
}

export default function FeatureSection({ currentSlide }: FeatureSectionProps) {
  const slideImages = ['/s1.png', '/s2.png', '/s3.png', '/s4.png'];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-custom-cream">
      {/* 배경 이미지 - feature.png를 전체 화면으로 */}
      <div className="absolute inset-0">
        <Image
          src="/feature.png"
          alt="펫쏙쏙 앱 기능 소개"
          fill
          className="object-contain px-4"
          priority
        />
      </div>

      {/* 슬라이드 이미지 - 모바일: 중간 우측, 데스크톱: 중간 하단 */}
      <div className="absolute inset-0 flex items-center justify-end pr-8 pb-16 md:items-end md:justify-center md:pr-0 md:pb-32">
        <div className="relative w-60 h-80 mr-5 mt-35">
          <Image
            src={slideImages[currentSlide]}
            alt={`슬라이드 ${currentSlide + 1}`}
            fill
            className="object-contain transition-opacity duration-300"
          />
        </div>
      </div>

      {/* 진행 상황 표시 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 text-sm bg-black/30 px-3 py-1 rounded-full">
        {currentSlide + 1} / {slideImages.length}
      </div>

      {/* 스크롤 힌트 (모바일용) */}
      <div className="absolute bottom-16 right-4 text-xs text-white/60 md:hidden">
        스와이프하여 다음 보기
      </div>
    </div>
  );
}
