'use client';

import Image from 'next/image';

interface FeatureSectionProps {
  currentSlide: number;
}

export default function FeatureSection({ currentSlide }: FeatureSectionProps) {
  const slideImages = ['/s1.png', '/s2.png', '/s3.png', '/s4.png'];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-custom-cream">
      {/* 배경 이미지 컨테이너 - 고정된 위치 */}
      <div className="absolute inset-0">
        {/* feature.png 배경 이미지 - 완전히 고정 */}
        <div className="relative w-full h-full">
          <Image
            src="/feature.png"
            alt="펫쏙쏙 앱 기능 소개"
            fill
            className="object-contain object-center"
            priority
            sizes="100vw"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          />
        </div>
      </div>

      {/* 슬라이드 이미지 컨테이너 - 절대 위치로 고정 */}
      <div
        className="absolute transition-opacity duration-300 ease-in-out"
        style={{
          width: '240px', // w-60 equivalent (15rem = 240px)
          height: '320px', // h-80 equivalent (20rem = 320px)
          right: '8%',
          top: '35%',
          zIndex: 10,
        }}>
        <Image
          src={slideImages[currentSlide]}
          alt={`슬라이드 ${currentSlide + 1}`}
          fill
          className="object-contain transition-opacity duration-300"
          sizes="240px"
          priority
        />
      </div>
    </div>
  );
}
