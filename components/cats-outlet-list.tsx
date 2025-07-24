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

export default function CatSelection() {
  const serviceURL = process.env.NEXT_PUBLIC_SERVICE_URL;

  return (
    <div className="px-6 py-4 bg-[#F7F4EF] overflow-hidden">
      <div className="bg-gradient-to-b from-[#868F99] to-[#7ACFFF] rounded-3xl shadow-2xl overflow-hidden relative mb-8">
        {/* Animated Icons Section */}
        <div className="">
          <Image
            src="/pets/p2.png"
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
          <div className="bg-gradient-to-b from-[#A5B0BB] to-[#101921] rounded-3xl px-6 py-6 shadow-xl relative">
            <div className="text-center mb-6">
              <p className="text-white font-semibold text-lg mb-1">
                이사한 집사
              </p>
              <h2 className="text-white text-2xl font-bold mb-2">
                최근에 고양이랑 이사했어요
              </h2>
              <p className="text-[#fff] text-light">
                고양이가 새집에 빨리 적응했으면 좋겠어요
              </p>
            </div>

            <a
              href={`${serviceURL}?q=${'집안 곳곳에 오줌을 뿌리고 다녀요.'}`}
              target="_blank">
              {/* Service Selection Button */}
              <Button
                variant="secondary"
                className="cursor-pointer h-[40px] w-full bg-white text-[#172B38] hover:bg-gray-100 rounded-xl py-4 mb-4 flex items-center justify-center text-base font-medium shadow-lg">
                <Search className="w-[24px] h-[24px]" />
                <span className="font-bold text-[14px]">
                  집안 곳곳에 오줌을 뿌리고 다녀요.
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
