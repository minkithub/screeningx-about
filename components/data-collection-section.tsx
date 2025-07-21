'use client';

import { useEffect, useState } from 'react';

export default function DataCollectionSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 페이지 로드 후 애니메이션 시작
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black py-16 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center relative">
        {/* 배경 bar 이미지 */}
        <div className="absolute inset-0 flex justify-center items-center">
          <img
            src="/bar.png"
            alt="bar"
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* 메인 텍스트 */}
        <div
          className={`relative z-20 py-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          <h2 className="text-4xl font-bold from-green-200 to-blue-600 bg-gradient-to-b text-transparent bg-clip-text leading-relaxed">
            채널별 데이터를 수집해
            <br />
            AI에게 전달할게요.
          </h2>
        </div>
      </div>
    </div>
  );
}
