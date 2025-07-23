'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface HeaderProps {
  onApplyClick?: () => void;
}

export default function Header({ onApplyClick }: HeaderProps) {
  const logoImages = [
    { name: 'KPF', src: '/logo/kpf.png' },
    { name: 'STP', src: '/logo/stp.png' },
    { name: 'Venture', src: '/logo/venture.png' },
    { name: 'Antler', src: '/logo/antler.png' },
    { name: 'SNU', src: '/logo/snu.png' },
    { name: 'Google', src: '/logo/google.png' },
  ];
  return (
    <div className="bg-custom-cream text-black">
      {/* Top Navigation */}
      <div className="px-8 pt-6 pb-2">
        <div className="flex justify-start">
          <div className="text-xl font-bold bg-clip-text">펫쏙쏙</div>
        </div>
      </div>

      {/* Logo Animation Section */}
      <div className="overflow-hidden py-6 bg-custom-cream">
        <div className="flex animate-scroll-left space-x-8">
          {[...logoImages, ...logoImages, ...logoImages].map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 h-8 w-24 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
              <Image
                src={logo.src}
                alt={logo.name}
                width={96}
                height={32}
                className="object-cover filter brightness-0"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Header Section */}
      <div className="px-8 pt-12 pb-0 bg-[#F7F4EF]">
        <h1 className="text-3xl font-bold leading-tight mb-6 text-center text-black">
          <span className="bg-gradient-to-r to-[#7699de] from-[#155EEF] bg-clip-text text-transparent">
            동물병원
          </span>
          과{' '}
          <span className="bg-gradient-to-r to-[#7699de] from-[#155EEF] bg-clip-text text-transparent">
            행동 클리닉
          </span>
          을
          <br />
          내 손 안으로 쏙! 24시간
          <br />
          펫쏙쏙에 물어보세요.
          <br />
        </h1>

        <p className="text-gray-700 text-base  leading-relaxed text-center">
          유명 수의학 논문과 행동 전문가 지식만을 학습해
          <br />
          <span className="font-bold">ChatGPT보다 신뢰할 수 있는 정보</span>만
          알려드려요.
        </p>
      </div>
    </div>
  );
}
