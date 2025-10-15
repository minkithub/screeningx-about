'use client';

import Image from 'next/image';
import { Send } from 'lucide-react';

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
          이제 이유있게
          <br />
          브랜드에 딱 맞는
          <br />
          <span className="bg-gradient-to-r to-[#4AD968] from-[#155EEF] bg-clip-text text-transparent">
            유튜버를 추천 받으세요.
          </span>
        </h1>

        <p className="text-gray-700 text-base  leading-relaxed text-center">
          스크리닝X는 국내 최초 브이로그 전문 유튜브 추천 서비스로
          <br />
          <span className="font-bold">브이로거의 영상 데이터를 이용해</span>브랜드에 딱 맞는 유튜버만 추천해 드려요.
        </p>

        <div className="flex justify-center mt-8">
          <a
            href="https://petsoksok.vercel.app/"
            className="bg-gradient-to-r font-bold from-[#4AD968] to-[#155EEF] text-white px-4 py-2 rounded-md">
            지금 바로 추천받기
            <Send className="inline-block ml-2 w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
