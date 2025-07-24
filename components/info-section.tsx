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

export default function InfoSection() {
  // 첫 번째 줄과 두 번째 줄을 위한 아이콘 분할
  const firstRowIcons = mediaIcons.slice(0, 6);
  const secondRowIcons = mediaIcons.slice(6);

  return (
    <div className="px-6 py-4 bg-[#F7F4EF] overflow-hidden">
      <div className="text-left mb-8">
        <h2 className="text-2xl font-bold mb-4">
          다른 AI가 아닌 <br />
          펫쏙쏙을 써야하는 이유!
        </h2>
      </div>
      {/* Animated Icons Section */}
      <div className="">
        <div className="bg-white p-[10px] w-full h-[58px] flex gap-[10px] mb-[10px] rounded-xl">
          <div className="w-[38px] h-[38px]">
            <Image src={'/logo1.svg'} width={38} height={38} alt=""></Image>
          </div>
          <div className="flex flex-col ">
            <div className="font-bold text-[15px]">
              평생 기억하는 내 반려동물 정보
            </div>
            <div className="text-[12px]">
              반려동물 정보를 입력하면 초기화되지 않아요.
            </div>
          </div>
        </div>
        <div className="bg-white p-[10px] w-full h-[58px] flex gap-[10px] mb-[10px] rounded-xl">
          <div className="w-[38px] h-[38px]">
            <Image src={'/logo2.svg'} width={38} height={38} alt=""></Image>
          </div>
          <div className="flex flex-col ">
            <div className="font-bold text-[15px]">
              거짓 정보 없는 정확한 답변
            </div>
            <div className="text-[12px]">
              전문 학술지, 신뢰 만땅 전문가 정보만 학습했어요.{' '}
            </div>
          </div>
        </div>
        <div className="bg-white p-[10px] w-full h-[58px] flex gap-[10px] mb-[10px] rounded-xl">
          <div className="w-[38px] h-[38px]">
            <Image src={'/logo3.svg'} width={38} height={38} alt=""></Image>
          </div>
          <div className="flex flex-col ">
            <div className="font-bold text-[15px]">반려동물 맞춤 질문 </div>
            <div className="text-[12px]">
              펫쏙쏙AI가 내 반려동물에 맞춰서 답변을 작성해줘요.{' '}
            </div>
          </div>
        </div>
        <div className="bg-white p-[10px] w-full h-[58px] flex gap-[10px] mb-[10px] rounded-xl">
          <div className="w-[38px] h-[38px]">
            <Image src={'/logo4.svg'} width={38} height={38} alt=""></Image>
          </div>
          <div className="flex flex-col ">
            <div className="font-bold text-[15px]">
              같은 정확도, 훨씬 더 저렴한 요금{' '}
            </div>
            <div className="text-[12px]">
              펙쏙쏙 2,900원 VS ChatGPT 27,000원{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
