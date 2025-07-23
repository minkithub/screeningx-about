import { Button } from '@/components/ui/button';
import { ChevronDown, Search } from 'lucide-react';
import Image from 'next/image';

const mediaIcons = [
  { name: '1', src: '/pets/1.png' },
  { name: '2', src: '/pets/2.png' },
  { name: '3', src: '/pets/3.png' },
  { name: '4', src: '/pets/4.png' },
  { name: '5', src: '/pets/5.png' },
  { name: '6', src: '/pets/6.png' },
  { name: '7', src: '/pets/7.png' },
  { name: '8', src: '/pets/8.png' },
  { name: '9', src: '/pets/9.png' },
  { name: '10', src: '/pets/10.png' },
  { name: '11', src: '/pets/11.png' },
];

export default function EtcSelection() {
  // 첫 번째 줄과 두 번째 줄을 위한 아이콘 분할
  const firstRowIcons = mediaIcons.slice(0, 6);
  const secondRowIcons = mediaIcons.slice(6);

  return (
    <div className="px-6 py-4 bg-[#F7F4EF] overflow-hidden">
      <div className="bg-gradient-to-b from-[#C6E7F9] to-[#0095EE] rounded-3xl shadow-2xl overflow-hidden relative mb-8">
        {/* Animated Icons Section */}
        <div className="">
          <Image
            src="/pets/p3.png"
            alt="펫쏙쏙 로고"
            sizes="100vw"
            width={0}
            height={0}
            className="object-contain"
            style={{
              width: ' 100%',
              height: 'auto',
            }}></Image>
        </div>

        {/* Content Card Section */}
        <div
          style={{
            marginTop: '-20px',
          }}>
          <div className="bg-gradient-to-b from-[#3598C9] to-[#006DE7] rounded-3xl px-6 py-6 shadow-xl relative">
            <div className="text-center mb-6">
              <p className="text-white font-semibold text-lg mb-1">
                반려동물이 아픈 집사
              </p>
              <h2 className="text-white text-2xl font-bold mb-2">
                최근에 수술받아 걱정돼요
              </h2>
              <p className="text-blue-100 text-base">
                수의사님한테 계속 물어보기 죄송해요.{' '}
              </p>
            </div>

            <a href="https://www.petsoksok.com/?q=c3">
              {/* Service Selection Button */}
              <Button
                variant="secondary"
                className="cursor-pointer h-[40px] w-full bg-white text-[#0070DD] hover:bg-gray-100 rounded-xl py-4 mb-4 flex items-center justify-center text-base font-medium shadow-lg">
                <Search className="w-[24px] h-[24px]" />
                <span className="font-bold">
                  수술하고 하루가 지났는데 소변을 안 봐요.
                </span>
              </Button>
            </a>

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
