'use client';

import Image from 'next/image';

interface ChatSectionProps {
  isSubmitted: boolean;
  sentChatMessage: string;
}

export default function ChatSection({
  isSubmitted,
  sentChatMessage,
}: ChatSectionProps) {
  return (
    <>
      {/* Chat-style Section */}
      <section className="bg-custom-cream py-12 px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              지금 대화해보세요
            </h2>
            <p className="text-gray-600 text-lg">
              펫쏙쏙에 대해 궁금한 점이 있으시면 언제든 말씀해주세요!
            </p>
          </div>

          {/* Chat Messages */}
          <div className="space-y-4">
            {/* Bot Message */}
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200">
                <Image
                  src="/logo.png"
                  alt="펫쏙쏙 로고"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
              <div className="bg-white rounded-lg rounded-tl-none p-4 shadow-sm max-w-md">
                <p className="text-gray-800">
                  안녕하세요. 펫쏙쏙입니다.
                  <br />
                  반려동물에 관해 어떤게 궁금하세요?
                </p>
              </div>
            </div>

            {/* Success Message */}
            {isSubmitted && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200">
                  <Image
                    src="/logo.png"
                    alt="펫쏙쏙 로고"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </div>
                <div className="bg-green-100 border border-green-400 rounded-lg rounded-tl-none p-4 shadow-sm max-w-md">
                  <p className="text-green-700">
                    전화번호 등록이 완료되었습니다!
                    <br />
                    출시 소식을 보내드릴게요 📩
                  </p>
                </div>
              </div>
            )}

            {/* 사전 신청 완료 후 감사 메시지 */}
            {sentChatMessage && isSubmitted && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200">
                  <Image
                    src="/logo.png"
                    alt="펫쏙쏙 로고"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </div>
                <div className="bg-white rounded-lg rounded-tl-none p-4 shadow-sm max-w-md">
                  <p className="text-gray-800">
                    소중한 질문 감사합니다!
                    <br />
                    출시 후 더 자세한 답변을 제공해드릴게요. 🙏
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
