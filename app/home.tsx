'use client';

import Header from '@/components/header';
import FeatureSection from '@/components/feature-section';
import Footer from '@/components/footer';
import ChatSection from '@/components/chat-section';
import FloatingChatInput from '@/components/floating-chat-input';
import { useEffect, useRef, useState } from 'react';
import References from '@/components/references';
import { sendApplicationNotification } from '@/actions/waitlist';
import { Button } from '@/components/ui/button';
import PetsOutletList from '@/components/pets-outlet-list';
import CatSelection from '@/components/cats-outlet-list';
import EtcSelection from '@/components/etc-outlet-list';

type Section = 'header' | 'feature' | 'references' | 'chat' | 'footer';

export default function Home() {
  const headerRef = useRef<HTMLDivElement>(null);
  const featureSectionRef = useRef<HTMLDivElement>(null);
  const referencesRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const petOutletListRef = useRef<HTMLDivElement>(null);
  const catOutletListRef = useRef<HTMLDivElement>(null);
  const etcOutletListRef = useRef<HTMLDivElement>(null);

  const [currentSection, setCurrentSection] = useState<Section>('header');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sentChatMessage, setSentChatMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');

  // 신청하기 버튼 클릭 핸들러
  const handleApplyClick = () => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // 채팅 메시지 전송 핸들러
  const handleMessageSent = (message: string) => {
    setSentChatMessage(message);
    setShowModal(true); // 메시지 전송 후 바로 모달 열기
  };

  // 이메일 제출 핸들러
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('올바른 이메일 형식을 입력해주세요. (예: example@email.com)');
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
      setSentChatMessage(''); // 성공 후 초기화
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

  // 현재 섹션 감지
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const headerHeight = headerRef.current?.offsetHeight || 0;
      const featureSectionHeight = featureSectionRef.current?.offsetHeight || 0;
      const referencesHeight = referencesRef.current?.offsetHeight || 0;
      const chatHeight = chatRef.current?.offsetHeight || 0;

      if (scrollY < headerHeight / 2) {
        setCurrentSection('header');
      } else if (scrollY < headerHeight + featureSectionHeight / 2) {
        setCurrentSection('feature');
      } else if (
        scrollY <
        headerHeight + featureSectionHeight + referencesHeight / 2
      ) {
        setCurrentSection('references');
      } else if (
        scrollY <
        headerHeight + featureSectionHeight + referencesHeight + chatHeight / 2
      ) {
        setCurrentSection('chat');
      } else {
        setCurrentSection('footer');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 실행

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="pb-20">
        {/* Header Section */}
        <div ref={headerRef}>
          <Header onApplyClick={handleApplyClick} />
        </div>

        {/* Feature Section */}
        <div ref={featureSectionRef}>
          <FeatureSection />
        </div>

        {/* References Section */}
        <div ref={referencesRef}>
          <References />
        </div>
        <div ref={petOutletListRef}>
          <PetsOutletList />
        </div>

        <div ref={catOutletListRef}>
          <CatSelection />
        </div>

        <div ref={etcOutletListRef}>
          <EtcSelection />
        </div>

        {/* Chat Section */}
        <div ref={chatRef}>
          <ChatSection
            isSubmitted={isSubmitted}
            sentChatMessage={sentChatMessage}
          />
        </div>

        {/* Footer */}
        <div ref={footerRef}>
          <Footer />
        </div>

        {/* 디버그 정보 (개발용) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed top-4 right-4 bg-black/70 text-white p-2 rounded text-xs z-50">
            <div>섹션: {currentSection}</div>
          </div>
        )}
      </div>

      {/* Floating Chat Input */}
      <FloatingChatInput onMessageSent={handleMessageSent} />

      {/* Modal - 사전신청 */}
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
                <p className="text-gray-700 text-lg mb-4 font-bold">
                  해당 메일로 답변드리겠습니다
                </p>
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
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
                    className="flex-1 py-3">
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
