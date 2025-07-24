'use client';

import { useState } from 'react';

// TODO: serviceURL을 환경변수나 설정에서 가져오도록 수정 필요
const serviceURL = process.env.NEXT_PUBLIC_SERVICE_URL;

export default function FloatingChatInput() {
  const [message, setMessage] = useState('');

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // URL에 메시지를 쿼리 파라미터로 담아서 리다이렉트
    const targetURL = `${serviceURL}?q=${encodeURIComponent(message)}`;
    // window.location.href = targetURL;
    window.open(targetURL, '_blank');

    // 입력창 초기화
    setMessage('');
  };

  return (
    <div className="floating-chat-input">
      <div className="max-w-4xl mx-auto">
        <form
          onSubmit={handleChatSubmit}
          className="flex items-end space-x-3 rounded-xl py-2 border bg-white border-gray-300 shadow-sm">
          <div className="flex-1">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="반려동물에 대한 무엇이든 물어보세요"
              className="w-full px-2 py-2 focus:outline-none text-gray-700 placeholder-gray-400"
            />
          </div>

          <div className="flex items-center space-x-2 min-w-[45px]">
            {/* 전송 버튼 */}
            <button
              type="submit"
              disabled={!message.trim()}
              className="text-white p-2 rounded-full bg-[#000] hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2 21L23 12L2 3V10L17 12L2 14V21Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
