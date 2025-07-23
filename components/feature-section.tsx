'use client';

import Image from 'next/image';
import { useEffect, useState, useRef, useCallback } from 'react';

export default function FeatureSection() {
  const slideImages = ['/pets/gif1.gif', '/pets/gif2.gif'];

  const textImages = ['/r1.png', '/r2.png'];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideStyles, setSlideStyles] = useState({
    width: '180px',
    height: '426px',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  });
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [viewportHeight, setViewportHeight] = useState('100vh');
  const [initialHeight, setInitialHeight] = useState<number | null>(null);

  // Touch 관련 상태
  const [touchStartX, setTouchStartX] = useState<number>(0);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [isSwiping, setIsSwiping] = useState(false);

  // Mouse 관련 상태
  const [mouseStartX, setMouseStartX] = useState<number>(0);
  const [mouseStartY, setMouseStartY] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  // 슬라이드 변경 함수
  const changeSlide = useCallback(
    (direction: 'next' | 'prev') => {
      if (direction === 'next') {
        setCurrentSlide((prev) => Math.min(prev + 1, slideImages.length - 1));
      } else {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      }
    },
    [slideImages.length]
  );

  // viewport 높이 감지 및 설정
  useEffect(() => {
    const setVH = () => {
      // 실제 viewport 높이 계산
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);

      // 초기 높이가 설정되지 않았다면 현재 높이를 초기 높이로 저장
      if (initialHeight === null) {
        const currentHeight = window.innerHeight;
        setInitialHeight(currentHeight);

        // 모바일에서는 초기 높이를 고정하여 사용
        if (window.innerWidth <= 768) {
          setViewportHeight(`${currentHeight}px`);
        } else {
          setViewportHeight('100vh');
        }
      }
    };

    // orientation change나 resize 시에만 높이 재계산 (스크롤로 인한 변화는 무시)
    const handleOrientationChange = () => {
      setTimeout(() => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        const currentHeight = window.innerHeight;
        setInitialHeight(currentHeight);

        if (window.innerWidth <= 768) {
          setViewportHeight(`${currentHeight}px`);
        } else {
          setViewportHeight('100vh');
        }
      }, 100);
    };

    setVH();
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [initialHeight]);

  // 슬라이드 위치 계산 함수 - useCallback으로 최적화
  const calculateSlidePosition = useCallback(() => {
    if (!backgroundRef.current || !isImageLoaded) return;

    const containerWidth = backgroundRef.current.offsetWidth;
    const containerHeight = backgroundRef.current.offsetHeight;

    // 유효하지 않은 크기일 때는 계산하지 않음
    if (containerWidth === 0 || containerHeight === 0) {
      setTimeout(calculateSlidePosition, 100);
      return;
    }

    // feature.png의 원본 비율
    const featureAspectRatio = 0.55;

    let actualFeatureWidth, actualFeatureHeight, featureLeft, featureTop;

    if (containerWidth / containerHeight > featureAspectRatio) {
      // 높이에 맞춰서 렌더링
      actualFeatureHeight = containerHeight;
      actualFeatureWidth = containerHeight * featureAspectRatio;
      featureLeft = (containerWidth - actualFeatureWidth) / 2;
      featureTop = 0;
    } else {
      // 너비에 맞춰서 렌더링
      actualFeatureWidth = containerWidth;
      actualFeatureHeight = containerWidth / featureAspectRatio;
      featureLeft = 0;
      featureTop = (containerHeight - actualFeatureHeight) / 2;
    }

    const slideWidth = actualFeatureWidth * 0.6;
    const slideHeight = slideWidth * 1.777;

    // 슬라이드 이미지 위치
    const phoneScreenLeft = featureLeft + actualFeatureWidth * 0.2;
    const phoneScreenTop = featureTop + actualFeatureHeight * 0.3;

    setSlideStyles({
      width: `${Math.max(180, Math.min(350, slideWidth))}px`,
      height: `${Math.max(320, Math.min(622, slideHeight))}px`,
      left: `${phoneScreenLeft}px`,
      top: `${phoneScreenTop}px`,
      transform: 'none',
    });
  }, [isImageLoaded]);

  // feature.png 로드 완료 핸들러
  const handleImageLoad = useCallback(() => {
    setIsImageLoaded(true);
  }, []);

  // 이미지 로드 및 resize 이벤트 처리
  useEffect(() => {
    calculateSlidePosition();

    const handleResize = () => {
      // debounce를 위한 setTimeout
      setTimeout(calculateSlidePosition, 50);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [calculateSlidePosition]);

  // 이미지 로드 상태가 변경될 때 위치 재계산
  useEffect(() => {
    if (isImageLoaded) {
      // 약간의 지연을 두고 계산하여 이미지 렌더링 완료를 보장
      setTimeout(calculateSlidePosition, 100);
      setTimeout(calculateSlidePosition, 300);
    }
  }, [isImageLoaded, calculateSlidePosition]);

  // 키보드 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        changeSlide('prev');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        changeSlide('next');
      }
    };

    // 마우스 휠 이벤트 처리 (좌우 스크롤)
    const handleWheel = (e: WheelEvent) => {
      // 수평 스크롤이 있는 경우 또는 Shift + 휠인 경우
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
        e.preventDefault();
        if (e.deltaX > 0 || (e.shiftKey && e.deltaY > 0)) {
          changeSlide('next');
        } else if (e.deltaX < 0 || (e.shiftKey && e.deltaY < 0)) {
          changeSlide('prev');
        }
      }
    };

    // 마우스 전역 이벤트 처리
    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDown || !isDragging) return;

      const deltaX = mouseStartX - e.clientX;
      const deltaY = Math.abs(mouseStartY - e.clientY);

      // 수평 드래그가 수직 드래그보다 큰 경우에만 처리
      if (Math.abs(deltaX) > deltaY && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          changeSlide('next');
        } else {
          changeSlide('prev');
        }
        setIsMouseDown(false);
        setIsDragging(false);
      }
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
      setIsDragging(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [changeSlide, isMouseDown, isDragging, mouseStartX, mouseStartY]);

  // 터치 이벤트 핸들러
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return;

    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    const deltaX = Math.abs(touchX - touchStartX);
    const deltaY = Math.abs(touchY - touchStartY);

    // 수평 스와이프가 수직 스와이프보다 큰 경우에만 기본 스크롤 방지
    if (deltaX > deltaY && deltaX > 10) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isSwiping) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchStartX - touchEndX;
    const deltaY = Math.abs(touchStartY - touchEndY);

    const minSwipeDistance = 50; // 최소 스와이프 거리

    // 수평 스와이프가 수직 스와이프보다 크고, 최소 거리를 만족하는 경우
    if (Math.abs(deltaX) > deltaY && Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        // 왼쪽으로 스와이프 (다음 슬라이드)
        changeSlide('next');
      } else {
        // 오른쪽으로 스와이프 (이전 슬라이드)
        changeSlide('prev');
      }
    }

    setIsSwiping(false);
  };

  // 마우스 이벤트 핸들러
  const handleMouseDown = (e: React.MouseEvent) => {
    setMouseStartX(e.clientX);
    setMouseStartY(e.clientY);
    setIsMouseDown(true);
    setIsDragging(true);
    e.preventDefault(); // 드래그 기본 동작 방지
  };

  return (
    <div
      className="relative w-full overflow-hidden bg-custom-cream feature-section cursor-grab active:cursor-grabbing"
      style={{
        height: viewportHeight,
        minHeight: viewportHeight,
        maxHeight: viewportHeight,
        userSelect: 'none', // 텍스트 선택 방지
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      tabIndex={0} // 키보드 포커스 가능하도록
    >
      {/* 배경 이미지 컨테이너 */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 feature-background px-4">
        {/* feature.png 배경 이미지 */}
        <div
          className="w-full h-full"
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
          }}>
          <Image
            src="/feature.png"
            alt="펫쏙쏙 앱 기능 소개"
            fill
            className="object-contain object-center"
            priority
            sizes="100vw"
            onLoad={handleImageLoad}
            onError={() => {
              // 이미지 로드 실패 시에도 위치 계산 시도
              setTimeout(() => setIsImageLoaded(true), 1000);
            }}
          />

          {/* 슬라이드 이미지 컨테이너 */}
          <div
            className="absolute feature-slide-container mt-3"
            style={{
              width: slideStyles.width,
              height: slideStyles.height,
              left: slideStyles.left,
              top: slideStyles.top,
              transform: slideStyles.transform,
              visibility: isImageLoaded ? 'visible' : 'hidden',
              overflow: 'visible',
            }}>
            {/* 모든 슬라이드 렌더링 */}
            {slideImages.map((imageSrc, index) => {
              // 현재 슬라이드를 기준으로 상대적 위치 계산
              const relativePosition = index - currentSlide;
              const leftPosition = relativePosition * 105; // 105% 간격으로 배치

              // 현재 슬라이드 주변만 렌더링 (성능 최적화)
              if (Math.abs(relativePosition) > 1) return null;

              // 투명도 계산
              let opacity = 1;
              if (relativePosition === 1) {
                opacity = 0.6; // 다음 슬라이드
              } else if (relativePosition === -1) {
                opacity = 0.3; // 이전 슬라이드 (혹시 필요할 때를 위해)
              }

              return (
                <div
                  key={index}
                  className="absolute transition-all duration-500 ease-out"
                  style={{
                    width: '90%',
                    height: '100%',
                    left: `${leftPosition}%`,
                    top: '0',
                    opacity: opacity,
                    transform: 'scale(1)',
                    marginLeft: '10%',
                  }}>
                  <Image
                    src={textImages[index]}
                    alt={`슬라이드 ${index + 1}`}
                    width={parseInt(slideStyles.width)}
                    height={parseInt(slideStyles.height)}
                    className="object-contain mt-2"
                    priority={index === currentSlide}
                  />
                  <Image
                    src={imageSrc}
                    alt={`슬라이드 ${index + 1}`}
                    width={parseInt(slideStyles.width)}
                    height={parseInt(slideStyles.height)}
                    className="object-contain rounded-sm mt-2"
                    priority={index === currentSlide}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
