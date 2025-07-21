'use client';

import { useState } from 'react';
import { Check, MessageCircle } from 'lucide-react';
import ApplicationModal from './application-modal';

export default function PricingSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const features = [
    '언론사·유튜브·X 데이터 수집',
    '언론사·유튜브·X 실시간 알림',
    '콘텐츠 맞춤 AI 분석 및 뉴스 생성',
  ];

  return (
    <div className="bg-black text-white px-6 py-12 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full text-center">
        {/* Main Title */}
        <h1 className="text-3xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-green-300 to-cyan-500 bg-clip-text text-transparent">
            내가 선택한 것들로
          </span>
          <br />
          <span className="bg-gradient-to-r from-green-300 to-cyan-500 bg-clip-text text-transparent">
            AI가 맞춤 분석 뉴스
          </span>
          <br />
          <span className="bg-gradient-to-r from-green-300 to-cyan-500 bg-clip-text text-transparent">
            매일 받아보세요.
          </span>
        </h1>

        {/* Subtitle */}
        <div className="mb-12 text-gray-300 leading-relaxed">
          <p>더이상 남들과 똑같은 뉴스 보지마세요.</p>
          <p>내가 필요한 것들로만 AI가 만들어주니까.</p>
        </div>

        {/* Pricing Card */}
        <div className="bg-[#1C1C1E] rounded-2xl p-8 mb-8">
          {/* Price */}
          <div className="mb-8">
            <div className="text-red-500 line-through text-xl mb-2 text-left">
              ₩9,900
            </div>
            <div className="text-4xl font-bold text-white text-left">
              ₩3,900<span className="text-lg font-normal">/월</span>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4 mb-8 text-left">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-black" />
                </div>
                <span className="text-green-300">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4">
            {/* Early Bird Button with Gradient Border */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-cyan-500 rounded-2xl"></div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="relative w-full bg-black text-white py-4 px-6 rounded-2xl hover:bg-gray-900 transition-colors font-semibold border-2 border-transparent bg-clip-padding hover:border-green-400">
                월 3,900원 얼리버드 신청
              </button>
            </div>

            {/* KakaoTalk Button */}
            <button
              className="w-full bg-yellow-400 text-black py-4 px-6 rounded-2xl hover:bg-yellow-300 transition-colors font-semibold flex items-center justify-center space-x-2"
              onClick={() => {
                window.open('https://open.kakao.com/o/sQarTgHh', '_blank');
              }}>
              <MessageCircle className="w-5 h-5" fill="black" />
              <span>카카오톡 문의하기</span>
            </button>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
