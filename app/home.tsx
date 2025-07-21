'use client';

import Header from '@/components/header';
import FeatureSection from '@/components/feature-section';
import Footer from '@/components/footer';
import { useEffect, useRef, useState } from 'react';
import References from '@/components/references';

type Section = 'header' | 'feature' | 'references' | 'footer';

export default function Home() {
  const headerRef = useRef<HTMLDivElement>(null);
  const featureSectionRef = useRef<HTMLDivElement>(null);
  const referencesRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const [currentSection, setCurrentSection] = useState<Section>('header');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const maxSlides = 4; // s1, s2, s3, s4

  // 스크롤 누적값과 쿨다운 관리
  const scrollAccumulator = useRef(0);
  const lastScrollTime = useRef(0);
  const cooldownDuration = 800; // 쿨다운 시간 (ms)
  const scrollThreshold = 100; // 스크롤 임계값

  // 섹션 이동 함수
  const scrollToSection = (section: Section) => {
    if (isScrolling) return;

    setIsScrolling(true);

    const targetRef =
      section === 'header'
        ? headerRef
        : section === 'feature'
        ? featureSectionRef
        : section === 'references'
        ? referencesRef
        : footerRef;

    if (section === 'header') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      targetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    setCurrentSection(section);

    setTimeout(() => {
      setIsScrolling(false);
    }, 1000); // 쿨다운 시간을 늘림
  };

  // 신청하기 버튼 클릭 핸들러
  const handleApplyClick = () => {
    scrollToSection('footer');
  };

  // 슬라이드 변경 함수
  const changeSlide = (direction: 'next' | 'prev') => {
    if (isScrolling) return;

    const now = Date.now();
    if (now - lastScrollTime.current < cooldownDuration) return;

    lastScrollTime.current = now;
    scrollAccumulator.current = 0; // 누적값 초기화

    if (direction === 'next' && currentSlide < maxSlides - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else if (direction === 'prev' && currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  // 현재 섹션 감지
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;

      const scrollY = window.scrollY;
      const headerHeight = headerRef.current?.offsetHeight || 0;
      const featureSectionHeight = featureSectionRef.current?.offsetHeight || 0;
      const referencesHeight = referencesRef.current?.offsetHeight || 0;

      if (scrollY < headerHeight / 2) {
        setCurrentSection('header');
      } else if (scrollY < headerHeight + featureSectionHeight / 2) {
        setCurrentSection('feature');
      } else if (
        scrollY <
        headerHeight + featureSectionHeight + referencesHeight / 2
      ) {
        setCurrentSection('references');
      } else {
        setCurrentSection('footer');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 실행

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolling]);

  // 스크롤/스와이프 이벤트 처리
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;

      const now = Date.now();

      // 쿨다운 체크
      if (now - lastScrollTime.current < cooldownDuration) {
        // references 섹션에서는 자연스러운 스크롤 허용
        if (currentSection === 'references') {
          return;
        }
        e.preventDefault();
        return;
      }

      // references 섹션에서는 자연스러운 스크롤 허용
      if (currentSection === 'references') {
        return;
      }

      e.preventDefault();

      // 스크롤 누적값 계산
      scrollAccumulator.current += Math.abs(e.deltaY);

      // 임계값에 도달했을 때만 실행
      if (scrollAccumulator.current < scrollThreshold) {
        return;
      }

      // 스크롤 방향에 따른 처리
      if (e.deltaY > 0) {
        // 아래로 스크롤
        if (currentSection === 'header') {
          scrollToSection('feature');
          lastScrollTime.current = now;
          scrollAccumulator.current = 0;
        } else if (currentSection === 'feature') {
          if (currentSlide < maxSlides - 1) {
            changeSlide('next');
          } else {
            // 마지막 슬라이드면 References로
            scrollToSection('references');
            lastScrollTime.current = now;
            scrollAccumulator.current = 0;
          }
        }
        // references 섹션에서 footer로 넘어가는 로직 제거
      } else {
        // 위로 스크롤
        if (currentSection === 'footer') {
          scrollToSection('references');
          lastScrollTime.current = now;
          scrollAccumulator.current = 0;
        } else if (currentSection === 'feature') {
          if (currentSlide > 0) {
            changeSlide('prev');
          } else {
            scrollToSection('header');
            lastScrollTime.current = now;
            scrollAccumulator.current = 0;
          }
        }
      }
    };

    // 터치 이벤트 처리
    let touchStartY = 0;
    let touchStartTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrolling) return;

      const now = Date.now();

      // 쿨다운 체크
      if (now - lastScrollTime.current < cooldownDuration) {
        // references 섹션에서는 자연스러운 터치 허용
        if (currentSection === 'references') {
          return;
        }
        e.preventDefault();
        return;
      }

      // references 섹션에서는 자연스러운 터치 허용
      if (currentSection === 'references') {
        return;
      }

      const touchEndY = e.changedTouches[0].clientY;
      const touchDelta = touchStartY - touchEndY;
      const touchTime = now - touchStartTime;
      const threshold = 80; // 터치 임계값을 높임
      const timeThreshold = 300; // 시간 임계값을 낮춤

      if (Math.abs(touchDelta) < threshold || touchTime > timeThreshold) return;

      e.preventDefault();

      if (touchDelta > 0) {
        // 위로 스와이프 (아래로 이동)
        if (currentSection === 'header') {
          scrollToSection('feature');
        } else if (currentSection === 'feature') {
          if (currentSlide < maxSlides - 1) {
            changeSlide('next');
          } else {
            scrollToSection('references');
          }
        }
        // references 섹션에서 footer로 넘어가는 터치 로직 제거
      } else {
        // 아래로 스와이프 (위로 이동)
        if (currentSection === 'footer') {
          scrollToSection('references');
        } else if (currentSection === 'feature') {
          if (currentSlide > 0) {
            changeSlide('prev');
          } else {
            scrollToSection('header');
          }
        }
      }
    };

    // 스크롤 누적값 초기화 (일정 시간 후)
    const resetAccumulator = () => {
      const now = Date.now();
      if (now - lastScrollTime.current > 1000) {
        // 1초 후 초기화
        scrollAccumulator.current = 0;
      }
    };

    const accumulatorTimer = setInterval(resetAccumulator, 100);

    // 이벤트 리스너 등록
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      clearInterval(accumulatorTimer);
    };
  }, [currentSection, currentSlide, isScrolling, maxSlides]);

  return (
    <div>
      {/* Header Section */}
      <div ref={headerRef}>
        <Header onApplyClick={handleApplyClick} />
      </div>

      {/* Feature Section */}
      <div ref={featureSectionRef}>
        <FeatureSection currentSlide={currentSlide} />
      </div>

      {/* References Section */}
      <div ref={referencesRef}>
        <References />
      </div>

      {/* Footer */}
      <div ref={footerRef}>
        <Footer />
      </div>

      {/* 디버그 정보 (개발용) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 right-4 bg-black/70 text-white p-2 rounded text-xs z-50">
          <div>섹션: {currentSection}</div>
          <div>
            슬라이드: {currentSlide + 1}/{maxSlides}
          </div>
          <div>스크롤 중: {isScrolling ? 'Y' : 'N'}</div>
          <div>누적: {scrollAccumulator.current.toFixed(0)}</div>
          <div>
            쿨다운:{' '}
            {Math.max(
              0,
              cooldownDuration - (Date.now() - lastScrollTime.current)
            ).toFixed(0)}
            ms
          </div>
        </div>
      )}
    </div>
  );
}
