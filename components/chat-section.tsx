'use client';

import { useState } from 'react';
import {
  sendApplicationNotification,
  sendChatMessage,
} from '@/actions/waitlist';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function ChatSection() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [sentChatMessage, setSentChatMessage] = useState(''); // 전송된 채팅 메시지 저장

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSendingMessage(true);

    try {
      // Slack으로 채팅 메시지 전송
      await sendChatMessage(message);

      // 전송된 메시지 저장
      setSentChatMessage(message);

      // 모달 열기
      setShowModal(true);
    } catch (error) {
      console.error('Error sending chat message:', error);
      alert('메시지 전송 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSendingMessage(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('올바른 이메일 형식을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      // 채팅 메시지를 포함해서 이메일 신청 전송
      await sendApplicationNotification({
        contact: email,
        chatMessage: sentChatMessage || undefined,
      });

      setIsSubmitted(true);
      setEmail('');
      setMessage(''); // 채팅 메시지도 초기화
      setShowModal(false); // 모달 닫기
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('신청 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {/* Chat-style Section */}
      <section className="bg-custom-cream py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3">지금 대화해 보세요</h2>
          </div>

          {/* Chat Messages */}
          <div className="mb-6 space-y-4">
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
                    이메일 등록이 완료되었습니다!
                    <br />
                    출시 소식을 보내드릴게요 📩
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <form
            onSubmit={handleChatSubmit}
            className="flex items-center space-x-3 bg-white rounded-full p-2 shadow-sm border border-gray-200">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="반려동물에 관한 무엇이든 질문하세요."
              className="flex-1 px-4 py-3 bg-transparent focus:outline-none text-gray-700 text-sm"
              disabled={isSendingMessage}
            />
            <button
              type="submit"
              disabled={!message.trim() || isSendingMessage}
              className="text-white p-3 rounded-full bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed">
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
      </section>

      {/* Modal - 사전신청만 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">사전 신청하기</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* 전송된 메시지 표시 */}
              {sentChatMessage && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    보내주신 메시지:
                  </h3>
                  <p className="text-gray-600 text-sm">{sentChatMessage}</p>
                </div>
              )}

              <div className="text-center mb-6">
                <p>
                  <span className="text-2xl font-bold text-gradient-footer mb-4">
                    답변이 궁금하다면?
                    <br />
                    사전 신청하고,
                    <br />
                    출시 알림 받기
                  </span>

                  <span> 📩</span>
                </p>

                <p className="text-gray-700 text-lg mb-4 font-bold">
                  반려인들의 걱정을 덜어드리고자,
                  <br />
                  고품질의 서비스를 만들기 위해 준비하고 있어요
                </p>

                <p className="text-gray-600 text-base mb-6">
                  사전 신청해주신 분들에게 안내드릴게요
                  <br />
                  펫쏙쏙을 응원해주세요 !
                </p>
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="petss@gmail.com"
                    className="w-full px-4 py-3 text-center text-gray-600 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="flex space-x-3">
                  <Button
                    type="button"
                    onClick={closeModal}
                    variant="outline"
                    className="flex-1 py-3">
                    취소
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading || !email.trim()}
                    className="flex-1 bg-gradient-to-r from-green-400 to-cyan-500 hover:from-green-500 hover:to-cyan-600 py-3">
                    {isLoading ? '등록 중...' : '신청하기'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
