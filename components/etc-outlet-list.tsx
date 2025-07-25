import { Button } from '@/components/ui/button';
import { ChevronDown, Search, Send } from 'lucide-react';
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
  const serviceURL = process.env.NEXT_PUBLIC_SERVICE_URL;
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
          <div className="bg-gradient-to-b from-[#9BC3CF] to-[#fff] rounded-3xl px-6 py-6 shadow-xl relative">
            <div className="text-center mb-4">
              <p className="text-black font-semibold text-[14px]">
                반려동물이 아픈 집사
              </p>
              <h2 className="text-black text-2xl font-bold mb-1">
                최근에 수술받아 걱정돼요
              </h2>
              <p className="text-black text-[14px]">
                수의사님한테 계속 물어보기 죄송해요.{' '}
              </p>
            </div>

            <a
              href={`${serviceURL}?q=${'수술하고 하루가 지났는데 소변을 안 봐요.'}`}
              target="_blank">
              {/* Service Selection Button */}
              <Button
                variant="secondary"
                className="cursor-pointer h-[40px] w-full bg-[#0070DD] text-[#fff] hover:bg-gray-100 rounded-xl py-4 mb-4 flex items-center justify-center text-base font-medium shadow-lg">
                <span className="font-bold text-[14px]">
                  넥카라가 불편해 보여요. 빼도 될까요?
                </span>
                <Send className="w-[24px] h-[24px]" />
              </Button>
            </a>

            {/* Card Scroll Indicator */}
            <div className="flex justify-center">
              <div className="text-black animate-bounce">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
