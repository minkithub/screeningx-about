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
      <div className="px-8 pt-12 pb-[60px] bg-[#F7F4EF]">
        <h1 className="text-3xl font-bold leading-tight mb-6 text-center text-black">
          더이상 잘못된 정보로
          <br />
          우리 아이를
          <br />
          <span className="bg-gradient-to-r to-[#4AD968] from-[#155EEF] bg-clip-text text-transparent">
            위험에 빠뜨리지 마세요!
          </span>
        </h1>

        <p className="text-gray-700 text-base  leading-relaxed text-center">
          펫쏙쏙은 수의학 논문과 전문가 지식만을 학습해
          <br />
          <span className="font-bold">ChatGPT보다 신뢰할 수 있는 정보</span>만
          알려드려요.
        </p>
      </div>
    </div>
  );
}
