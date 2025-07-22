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
  const hasImageAttachment =
    sentChatMessage.includes('이미지를 첨부했습니다') ||
    sentChatMessage.includes('이미지 첨부');

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
              펫쏙쏙에 대해 궁금한 점이 있으시면
              <br />
              언제든 말씀해주세요!
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
                  <br />
                  <span className="text-sm text-gray-600 mt-2 block">
                    💡 이미지도 함께 첨부할 수 있어요!
                  </span>
                </p>
              </div>
            </div>

            {/* User Message (if sent) */}
            {sentChatMessage && (
              <div className="flex items-start space-x-3 justify-end">
                <div className="bg-blue-500 text-white rounded-lg rounded-tr-none p-4 shadow-sm max-w-md">
                  <div className="flex items-center gap-2">
                    {hasImageAttachment && (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex-shrink-0">
                        <path
                          d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
                          fill="currentColor"
                        />
                      </svg>
                    )}
                    <p className="text-white">{sentChatMessage}</p>
                  </div>
                </div>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-white text-sm font-medium">😊</span>
                </div>
              </div>
            )}

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
                    소중한 {hasImageAttachment ? '질문과 이미지' : '질문'}{' '}
                    감사합니다!
                    <br />
                    출시 후 더 자세한 답변을 제공해드릴게요. 🙏
                    {hasImageAttachment && (
                      <span className="block text-sm text-gray-600 mt-1">
                        📷 첨부해주신 이미지도 잘 받았습니다.
                      </span>
                    )}
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
