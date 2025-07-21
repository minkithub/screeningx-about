import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';

interface XAccount {
  id: string;
  name: string;
  englishName: string;
  checked: boolean;
}

interface XListProps {
  xAccounts: XAccount[];
  onToggleAccount: (id: string) => void;
}

// X 계정과 이미지 매핑
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
  return iconMap[id] || '/x/일론 머스크.jpg';
};

export default function XList({ xAccounts, onToggleAccount }: XListProps) {
  return (
    <div className="bg-black text-white px-6 py-4">
      <div className="space-y-1">
        {xAccounts.map((account) => (
          <div key={account.id} className="flex items-center space-x-3">
            {/* 독립된 좌측 바 */}
            <div
              className={`w-1 h-10 rounded-full transition-all duration-200 ${
                account.checked ? 'bg-gray-400' : 'bg-transparent'
              }`}
            />

            <div
              className={`flex items-center space-x-3 rounded-lg py-2 px-3 transition-all duration-200 flex-1 ${
                account.checked
                  ? 'bg-gray-700'
                  : 'bg-gray-800/50 hover:bg-gray-700/50'
              }`}
              onClick={() => onToggleAccount(account.id)}>
              <Checkbox
                id={account.id}
                checked={account.checked}
                className="data-[state=checked]:bg-gray-600 data-[state=checked]:border-gray-600"
              />
              <div className="flex items-center space-x-3 flex-1">
                <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={getXIcon(account.id)}
                    alt={account.name}
                    width={24}
                    height={24}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium text-sm">
                      {account.name}
                    </span>
                    <span className="text-gray-300 text-xs">
                      {account.englishName}
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
