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

export default function PetSelection() {
  const serviceURL = process.env.NEXT_PUBLIC_SERVICE_URL;

  return (
    <div className="px-6 py-4 bg-[#F7F4EF] overflow-hidden">
      <div className="text-left mb-8">
        <h2 className="text-2xl font-bold mb-4">
          펫쏙쏙, 이런 분들에게
          <br />
          효과 만점이에요
        </h2>
      </div>
      <div className="bg-gradient-to-b from-[#C5F9CD] to-[#7ACFFF] rounded-3xl shadow-2xl overflow-hidden relative mb-8">
        {/* Animated Icons Section */}
        <div className="">
          <Image
            src="/pets/p1.png"
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
          <div className="bg-gradient-to-b from-[#E2AD98] to-[#fff] rounded-3xl px-6 py-6 shadow-xl relative">
            <div className="text-center mb-6">
              <p className="text-black font-semibold text-[14px]">
                새내기 반려인
              </p>
              <h2 className="text-black text-2xl font-bold mb-1">
                반려동물을 입양·임보했어요.
              </h2>
              <p className="text-black font-normal text-[14px]">
                사료부터 예방접종까지 뭐부터 해야돼요?
              </p>
            </div>

            <a
              href={`${serviceURL}?q=${'강아지가 숨어있기만 하고 밥을 안 먹어요.'}`}
              target="_blank">
              {/* Service Selection Button */}
              <Button
                variant="secondary"
                className="cursor-pointer h-[40px] w-full bg-[#97463C] text-white hover:opacity-[90] rounded-xl py-4 mb-4 flex items-center justify-center text-base font-medium shadow-lg">
                <span className="font-bold text-[14px] text-white">
                  아이가 숨어있기만 하는데 어떡해요?
                </span>
                <Send className="w-[24px] h-[24px]" />
              </Button>
            </a>

            {/* Card Scroll Indicator */}
            <div className="flex justify-center">
              <div className="text-[#black] animate-bounce">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
