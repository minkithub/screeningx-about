import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { Button } from './ui/button';

interface XSelectionProps {
  onServiceButtonClick?: () => void;
}

export default function XSelection({ onServiceButtonClick }: XSelectionProps) {
  // X 큰 아이콘들 (x-big 폴더 사용)
  const xIcons = [
    '테슬라.png',
    '캐시우드.jpg',
    '젠슨황.jpg',
    '일론머스크.jpg',
    '엔비디아.png',
    '샘 올트먼.png',
    '애플.jpg',
    '빌게이츠.jpg',
    '비트코인.png',
    '메타.png',
    '블룸버그.jpg',
    '마크저커버그.png',
    '나사.jpg',
    '구글.png',
  ];

  // 두 행으로 나누기
  const firstRow = xIcons.slice(0, 7);
  const secondRow = xIcons.slice(7);

  return (
    <div className="px-6 py-4 bg-black overflow-hidden">
      <div className="bg-gradient-to-b from-gray-200 to-gray-300 rounded-3xl shadow-2xl overflow-hidden relative">
        {/* Animated Icons Section */}
        <div className="pt-8 pb-12">
          {/* First Row - Moving Left */}
          <div className="mb-4 relative">
            <div className="flex animate-scroll-left">
              {[...firstRow, ...firstRow].map((icon, index) => (
                <div
                  key={`first-${index}`}
                  className="flex-shrink-0 w-16 h-16 mx-2 bg-white rounded-xl shadow-lg flex items-center justify-center">
                  <Image
                    src={`/x-big/${icon}`}
                    alt=""
                    width={48}
                    height={48}
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Second Row - Moving Right */}
          <div className="relative">
            <div className="flex animate-scroll-right">
              {[...secondRow, ...secondRow].map((icon, index) => (
                <div
                  key={`second-${index}`}
                  className="flex-shrink-0 w-16 h-16 mx-2 bg-white rounded-xl shadow-lg flex items-center justify-center">
                  <Image
                    src={`/x-big/${icon}`}
                    alt=""
                    width={48}
                    height={48}
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Card Section */}
        <div>
          <div className="bg-gradient-to-b from-gray-600 to-gray-800 rounded-3xl px-6 py-6 shadow-xl relative">
            <div className="text-center mb-6">
              <p className="text-white font-semibold text-lg mb-1">STEP 3.</p>
              <h2 className="text-white text-2xl font-bold mb-2">
                원하는 X를 선택하세요
              </h2>
              <p className="text-gray-300 text-base">
                트럼프, 머스크 등 필수 글로벌 인물
              </p>
            </div>

            {/* Service Selection Button */}

            {/* Service Selection Button */}
            <Button
              onClick={onServiceButtonClick}
              variant="secondary"
              // className="w-full bg-white text-blue-600 hover:bg-gray-100 rounded-xl py-4 mb-4 flex items-center justify-center text-lg font-medium shadow-lg">
              className="w-full bg-white text-gray-700 hover:bg-gray-100 rounded-xl py-4 mb-4 flex items-center justify-center text-lg font-medium shadow-lg transition-colors">
              <span className="font-bold">서비스 신청</span>
            </Button>

            {/* Card Scroll Indicator */}
            <div className="flex justify-center">
              <button className="text-white animate-bounce">
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
