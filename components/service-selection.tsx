import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

interface ServiceSelectionProps {
  onServiceButtonClick: () => void;
}

const mediaIcons = [
  { name: '조선일보', src: '/media-big/조선일보.png' },
  { name: '중앙일보', src: '/media-big/중앙일보.png' },
  { name: '동아일보', src: '/media-big/동아일보.png' },
  { name: '한겨레', src: '/media-big/한겨레.jpg' },
  { name: '경향신문', src: '/media-big/경향신문.png' },
  { name: '매일경제', src: '/media-big/매일경제.jpg' },
  { name: '국민일보', src: '/media-big/국민일보.png' },
  { name: '세계일보', src: '/media-big/세계일보.jpg' },
  { name: '연합뉴스', src: '/media-big/연합뉴스.jpg' },
  { name: 'JTBC', src: '/media-big/jtbc.png' },
  { name: 'MBC', src: '/media-big/mbc.png' },
];

export default function ServiceSelection({
  onServiceButtonClick,
}: ServiceSelectionProps) {
  // 첫 번째 줄과 두 번째 줄을 위한 아이콘 분할
  const firstRowIcons = mediaIcons.slice(0, 6);
  const secondRowIcons = mediaIcons.slice(6);

  return (
    <div className="px-6 py-4 bg-black overflow-hidden">
      <div className="bg-gradient-to-b from-blue-200 to-blue-300 rounded-3xl shadow-2xl overflow-hidden relative">
        {/* Animated Icons Section */}
        <div className="pt-8 pb-12">
          {/* First Row - Moving Left */}
          <div className="mb-4 relative">
            <div className="flex animate-scroll-left">
              {[...firstRowIcons, ...firstRowIcons].map((icon, index) => (
                <div
                  key={`first-${index}`}
                  className="flex-shrink-0 w-16 h-16 mx-2 bg-white rounded-xl shadow-lg flex items-center justify-center">
                  <Image
                    src={icon.src}
                    alt={icon.name}
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
              {[...secondRowIcons, ...secondRowIcons].map((icon, index) => (
                <div
                  key={`second-${index}`}
                  className="flex-shrink-0 w-16 h-16 mx-2 bg-white rounded-xl shadow-lg flex items-center justify-center">
                  <Image
                    src={icon.src}
                    alt={icon.name}
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
          <div className="bg-gradient-to-b from-blue-400 to-blue-600 rounded-3xl px-6 py-6 shadow-xl relative">
            <div className="text-center mb-6">
              <p className="text-white font-semibold text-lg mb-1">STEP 1.</p>
              <h2 className="text-white text-2xl font-bold mb-2">
                원하는 언론사를 선택하세요
              </h2>
              <p className="text-blue-100 text-base">
                50+개 이상의 국내 유명 언론사
              </p>
            </div>

            {/* Service Selection Button */}
            <Button
              onClick={onServiceButtonClick}
              variant="secondary"
              className="w-full bg-white text-blue-600 hover:bg-gray-100 rounded-xl py-4 mb-4 flex items-center justify-center text-lg font-medium shadow-lg">
              <span className="font-bold">서비스 신청</span>
            </Button>

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
