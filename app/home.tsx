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

type Section = 'header' | 'feature' | 'references' | 'chat' | 'footer';

export default function Home() {
  const headerRef = useRef<HTMLDivElement>(null);
  const featureSectionRef = useRef<HTMLDivElement>(null);
  const referencesRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const [currentSection, setCurrentSection] = useState<Section>('header');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sentChatMessage, setSentChatMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState('');

  // 신청하기 버튼 클릭 핸들러
  const handleApplyClick = () => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // 채팅 메시지 전송 핸들러
  const handleMessageSent = (message: string) => {
    setSentChatMessage(message);
    setShowModal(true); // 메시지 전송 후 바로 모달 열기
  };

  // 전화번호 제출 핸들러
  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;

    // 전화번호 형식 검증 (한국 전화번호)
    const phoneRegex = /^(01[016789]|02|0[3-9][0-9])-?[0-9]{3,4}-?[0-9]{4}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      alert('올바른 전화번호 형식을 입력해주세요. (예: 010-1234-5678)');
      return;
    }

    setIsLoading(true);
    try {
      // 채팅 메시지를 포함해서 전화번호 신청 전송
      await sendApplicationNotification({
        contact: phone,
        chatMessage: sentChatMessage || undefined,
      });

      setIsSubmitted(true);
      setPhone('');
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
                  반려인들의 걱정을 덜어드리고자,
                  <br />
                  수의사와 함께 서비스를 만들고 있어요
                </p>

                <p className="text-gray-600 text-base mb-6">
                  사전 신청해주신 분들에게 안내드릴게요
                  <br />
                  펫쏙쏙을 응원해주세요 !
                </p>
              </div>

              <form onSubmit={handlePhoneSubmit} className="space-y-4">
                <div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="010-1234-5678"
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
                    disabled={isLoading || !phone.trim()}
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
