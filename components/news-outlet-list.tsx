import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';

interface NewsOutlet {
  id: string;
  name: string;
  englishName: string;
  checked: boolean;
}

interface NewsOutletListProps {
  newsOutlets: NewsOutlet[];
  onToggleOutlet: (id: string) => void;
}

// 뉴스 아울렛과 미디어 이미지 매핑
const getMediaIcon = (id: string) => {
  const iconMap: Record<string, string> = {
    chosun: '/media/조선일보.png',
    joongang: '/media/중앙일보.png',
    donga: '/media/동아일보.png',
    hankyoreh: '/media/한겨레.jpg',
    kyunghyang: '/media/경향신문.png',
    maeil: '/media/매일경제.png',
    koreaeconomic: '/media/한국경제.jpeg',
    kukmin: '/media/국민일보.png',
    segye: '/media/세계일보.jpg',
    chosunbiz: '/media/조선일보.png', // 조선비즈는 조선일보 아이콘 사용
    etnews: '/media/전자신문.png',
    yonhap: '/media/연합뉴스.png', // 연합뉴스 추가
  };
  return iconMap[id] || '/media/조선일보.png';
};

export default function NewsOutletList({
  newsOutlets,
  onToggleOutlet,
}: NewsOutletListProps) {
  return (
    <div className="bg-black text-white px-6 py-4">
      <div className="space-y-1">
        {newsOutlets.map((outlet) => (
          <div key={outlet.id} className="flex items-center space-x-3">
            {/* 독립된 좌측 바 */}
            <div
              className={`w-1 h-10 rounded-full transition-all duration-200 ${
                outlet.checked ? 'bg-blue-400' : 'bg-transparent'
              }`}
            />

            <div
              className={`flex items-center space-x-3 rounded-lg py-2 px-3 transition-all duration-200 flex-1 ${
                outlet.checked
                  ? 'bg-gray-700'
                  : 'bg-gray-800/50 hover:bg-gray-700/50'
              }`}
              onClick={() => onToggleOutlet(outlet.id)}>
              <Checkbox
                id={outlet.id}
                checked={outlet.checked}
                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              <div className="flex items-center space-x-3 flex-1">
                <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={getMediaIcon(outlet.id)}
                    alt={outlet.name}
                    width={24}
                    height={24}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium text-sm">
                      {outlet.name}
                    </span>
                    <span className="text-blue-300 text-xs">
                      {outlet.englishName}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
