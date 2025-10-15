'use client';

import Header from '@/components/header';
import FeatureSection from '@/components/feature-section';
import Footer from '@/components/footer';
import FloatingChatInput from '@/components/floating-chat-input';
import { useEffect, useRef, useState } from 'react';
import References from '@/components/references';
import PetsOutletList from '@/components/pets-outlet-list';
import CatSelection from '@/components/cats-outlet-list';
import EtcSelection from '@/components/etc-outlet-list';
import InfoSection from '@/components/info-section';
import LiveQuestionsSection from '@/components/live-questions-section';
import VeterinarianContactSection from '@/components/veterinarian-contact-section';

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

  // 신청하기 버튼 클릭 핸들러
  const handleApplyClick = () => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
        {/* <div ref={referencesRef}>
          <References />
        </div> */}
        <div ref={petOutletListRef}>
          <PetsOutletList />
        </div>
        <div ref={catOutletListRef}>
          <CatSelection />
        </div>
        <div ref={etcOutletListRef}>
          <EtcSelection />
        </div>

        {/* info section */}

        <div>
          <InfoSection />
        </div>

        {/* Live Questions Section */}
        <div>
          <LiveQuestionsSection />
        </div>

        <div>
          <VeterinarianContactSection />
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
      <FloatingChatInput />
    </>
  );
}
