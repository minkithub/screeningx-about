import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

interface YouTubeSelectionProps {
  onServiceButtonClick?: () => void;
}

export default function YouTubeSelection({
  onServiceButtonClick,
}: YouTubeSelectionProps) {
  // YouTube 큰 아이콘들 (youtube-big 폴더 사용)
  const youtubeIcons = [
    '월가아재.jpg',
    '전인구 경제.jpg',
    '오선 미증.jpg',
    '옹달책방.jpg',
    '슈카월드.jpg',
    '비즈카페.jpg',
    '삼프로.jpg',
    '소수몽키.jpg',
    '부읽남.jpg',
    '김지윤.jpg',
    'klab.jpg',
    '김단테.jpg',
    '14f.jpg',
    'EO.jpg',
  ];

  // 두 행으로 나누기
  const firstRow = youtubeIcons.slice(0, 7);
  const secondRow = youtubeIcons.slice(7);

  return (
    <div className="px-6 py-4 bg-black overflow-hidden">
      <div className="bg-gradient-to-b from-pink-200 to-pink-300 rounded-3xl shadow-2xl overflow-hidden relative">
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
                    src={`/youtube-big/${icon}`}
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
                    src={`/youtube-big/${icon}`}
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
          <div className="bg-gradient-to-b from-pink-400 to-red-500 rounded-3xl px-6 py-6 shadow-xl relative">
            <div className="text-center mb-6">
              <p className="text-white font-semibold text-lg mb-1">STEP 2.</p>
              <h2 className="text-white text-2xl font-bold mb-2">
                원하는 유튜브를 선택하세요
              </h2>
              <p className="text-pink-100 text-base">
                100개+ 이상의 유명 시사·경제·정치 유튜버
              </p>
            </div>

            {/* Service Selection Button */}
            <button
              onClick={onServiceButtonClick}
              className="w-full h-10 bg-white text-red-500 hover:bg-gray-100 rounded-xl py-4 mb-4 flex items-center justify-center text-lg font-medium shadow-lg transition-colors">
              <span className="font-bold">서비스 신청</span>
            </button>

            {/* Card Scroll Indicator */}
            <div className="flex justify-center">
              <div className="text-white animate-bounce">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
