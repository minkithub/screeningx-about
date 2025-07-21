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
      <div className="px-8 pt-12 pb-12">
        <h1 className="text-4xl font-bold leading-tight mb-6 text-center text-black">
          수의사가 곁에 있을 때,
          <br />
          믿을 수 있는{' '}
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            상담 친구
          </span>
        </h1>

        <p className="text-gray-700 text-base mb-10 leading-relaxed text-center">
          반려동물의 건강, 행동, 식습관까지.
          <br />
          우리 아이에게 꼭 맞는 정보를 알려드려요.
        </p>

        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-green-300 to-cyan-500 rounded-full p-0.5">
            <Button
              variant="outline"
              onClick={onApplyClick}
              className="border-0 hover:bg-blue-500 hover:text-white rounded-full px-10 py-3 bg-black text-white font-medium transition-all duration-200">
              신청하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
