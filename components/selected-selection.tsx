'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

interface NewsOutlet {
  id: string;
  name: string;
  englishName: string;
  checked: boolean;
}

interface YouTubeChannel {
  id: string;
  name: string;
  englishName: string;
  checked: boolean;
}

interface XAccount {
  id: string;
  name: string;
  englishName: string;
  checked: boolean;
}

interface SelectedSelectionProps {
  newsOutlets: NewsOutlet[];
  youtubeChannels: YouTubeChannel[];
  xAccounts: XAccount[];
  onServiceButtonClick: () => void;
}

// 이미지 매핑 함수들
const getNewsIcon = (id: string) => {
  const iconMap: Record<string, string> = {
    kyunghyang: '/media/경향신문.png',
    kukmin: '/media/국민일보.png',
    donga: '/media/동아일보.png',
    maeil: '/media/매일경제.png',
    segye: '/media/세계일보.jpg',
    yonhap: '/media/연합뉴스.png',
    etnews: '/media/전자신문.png',
    chosun: '/media/조선일보.png',
    joongang: '/media/중앙일보.png',
    hankyoreh: '/media/한겨레.jpg',
    koreaeconomic: '/media/한국경제.jpeg',
  };
  return iconMap[id] || '';
};

const getYouTubeIcon = (id: string) => {
  const iconMap: Record<string, string> = {
    eo: '/youtube/EO.jpg',
    kimDante: '/youtube/김단테.jpg',
    buiknam: '/youtube/부읽남.jpg',
    bizcafe: '/youtube/비즈카페.jpg',
    sampro: '/youtube/삼프로.jpg',
    sousumonkey: '/youtube/소수몽키.jpg',
    syukaworld: '/youtube/슈카월드.jpg',
    osun: '/youtube/오선 미증.jpg',
    wongdal: '/youtube/옹달책방.jpg',
    wallstreet: '/youtube/월가아재.jpg',
    jun: '/youtube/전인구 경제.jpg',
  };
  return iconMap[id] || '';
};

const getXIcon = (id: string) => {
  const iconMap: Record<string, string> = {
    elonmusk: '/x/일론 머스크.jpg',
    trump: '/x/트럼프.jpg',
    cathiewood: '/x/캐시우드.webp',
    timcook: '/x/팀쿡.jpg',
    apple: '/x/애플.png',
    tesla: '/x/테슬라.png',
    jensen: '/x/젠슨황.jpg',
    meta: '/x/메타.png',
    nvidia: '/x/엔비디아.png',
    bloomberg: '/x/블룸버그.png',
    reuters: '/x/로이터.png',
  };
  return iconMap[id] || '';
};

export default function SelectedSelection({
  newsOutlets,
  youtubeChannels,
  xAccounts,
  onServiceButtonClick,
}: SelectedSelectionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const selectedNewsOutlets = newsOutlets.filter((outlet) => outlet.checked);
  const selectedYouTubeChannels = youtubeChannels.filter(
    (channel) => channel.checked
  );
  const selectedXAccounts = xAccounts.filter((account) => account.checked);

  const totalSelected =
    selectedNewsOutlets.length +
    selectedYouTubeChannels.length +
    selectedXAccounts.length;

  // 모든 선택된 항목들을 하나의 배열로 합치기 (애니메이션용)
  const allSelectedItems = [
    ...selectedNewsOutlets.map((item) => ({
      ...item,
      type: 'news',
      icon: getNewsIcon(item.id),
    })),
    ...selectedYouTubeChannels.map((item) => ({
      ...item,
      type: 'youtube',
      icon: getYouTubeIcon(item.id),
    })),
    ...selectedXAccounts.map((item) => ({
      ...item,
      type: 'x',
      icon: getXIcon(item.id),
    })),
  ].filter((item) => item.icon !== '');

  return (
    <div className="px-6 pt-4 bg-black overflow-hidden">
      {/* 상단 타이틀 */}
      <div className="text-left mb-6">
        <h1 className="text-white text-2xl font-bold leading-tight">
          당신이 선택한
          <br />
          채널 목록이에요.
        </h1>
      </div>

      <div className="bg-gradient-to-b from-green-200 to-green-300 rounded-3xl shadow-2xl overflow-hidden relative">
        {/* Animated Selected Items Section */}
        <div className="pt-8 pb-12">
          {allSelectedItems.length > 0 && (
            <>
              {/* First Row - Moving Left */}
              <div className="mb-4 relative">
                <div className="flex animate-scroll-left">
                  {[
                    ...allSelectedItems.slice(
                      0,
                      Math.ceil(allSelectedItems.length / 2)
                    ),
                    ...allSelectedItems.slice(
                      0,
                      Math.ceil(allSelectedItems.length / 2)
                    ),
                  ].map((item, index) => (
                    <div
                      key={`first-${index}`}
                      className="flex-shrink-0 w-16 h-16 mx-2 bg-white rounded-xl shadow-lg flex items-center justify-center">
                      <Image
                        src={item.icon}
                        alt={item.name}
                        width={48}
                        height={48}
                        className="object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Second Row - Moving Right */}
              {allSelectedItems.length > 1 && (
                <div className="mb-4 relative">
                  <div className="flex animate-scroll-right">
                    {[
                      ...allSelectedItems.slice(
                        Math.ceil(allSelectedItems.length / 2)
                      ),
                      ...allSelectedItems.slice(
                        Math.ceil(allSelectedItems.length / 2)
                      ),
                    ].map((item, index) => (
                      <div
                        key={`second-${index}`}
                        className="flex-shrink-0 w-16 h-16 mx-2 bg-white rounded-xl shadow-lg flex items-center justify-center">
                        <Image
                          src={item.icon}
                          alt={item.name}
                          width={48}
                          height={48}
                          className="object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Content Card Section */}
        <div>
          <div className="bg-gradient-to-b from-green-600 to-green-800 rounded-3xl px-6 py-6 shadow-xl relative">
            <div
              className={`text-center mb-6 transition-all duration-1000 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}>
              <p className="text-white font-semibold text-lg mb-1">STEP 4.</p>
              <h2 className="text-white text-2xl font-bold mb-2">
                총 {totalSelected}개의 채널을 선택했어요.
              </h2>
              <p className="text-green-100 text-base">
                언론사 {selectedNewsOutlets.length}개, 유튜브{' '}
                {selectedYouTubeChannels.length}개, X {selectedXAccounts.length}
                개
              </p>
            </div>

            {/* Service Selection Button */}
            <Button
              onClick={onServiceButtonClick}
              variant="secondary"
              className="w-full bg-white text-gray-700 hover:bg-gray-100 rounded-xl py-4 mb-4 flex items-center justify-center text-lg font-medium shadow-lg transition-colors">
              <span className="font-bold">서비스 신청</span>
            </Button>

            {/* Scroll Indicator */}
            <div className="flex justify-center">
              <ChevronDown className="text-white w-6 h-6 animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
