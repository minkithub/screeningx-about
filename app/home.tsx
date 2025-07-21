'use client';

import Header from '@/components/header';
import FeatureSection from '@/components/feature-section';
import Footer from '@/components/footer';
import { useEffect, useRef } from 'react';
import References from '@/components/references';

export default function Home() {
  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // 신청하기 버튼 클릭 핸들러
  const handleApplyClick = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div>
      {/* Header Section */}
      <div ref={headerRef}>
        <Header onApplyClick={handleApplyClick} />
      </div>

      {/* Feature Section */}
      <FeatureSection />

      {/* References Section */}
      <References />

      {/* Footer */}
      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
}
