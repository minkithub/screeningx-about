'use client';

import { useState } from 'react';
import { sendChatMessage } from '@/actions/waitlist';

interface FloatingChatInputProps {
  onMessageSent: (message: string) => void;
}

export default function FloatingChatInput({
  onMessageSent,
}: FloatingChatInputProps) {
  const [message, setMessage] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSendingMessage(true);

    try {
      // Slack으로 채팅 메시지 전송
      await sendChatMessage(message);

      // 부모 컴포넌트에 메시지 전송 알림
      onMessageSent(message);

      // 입력창 초기화
      setMessage('');
    } catch (error) {
      console.error('Error sending chat message:', error);
      alert('메시지 전송 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSendingMessage(false);
    }
  };

  return (
    <div className="floating-chat-input">
      <div className="max-w-4xl mx-auto px-4">
        <form
          onSubmit={handleChatSubmit}
          className="flex items-center space-x-3 rounded-full p-1 border bg-white border-gray-300 shadow-sm">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="반려동물에 관한 무엇이든 질문하세요."
            className="flex-1 px-4 py-3 focus:outline-none text-gray-700 placeholder-gray-400"
            disabled={isSendingMessage}
          />
          <button
            type="submit"
            disabled={!message.trim() || isSendingMessage}
            className="text-white p-3 rounded-full bg-black hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0">
            {isSendingMessage ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
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
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
