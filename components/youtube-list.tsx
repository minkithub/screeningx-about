import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';

interface YouTubeChannel {
  id: string;
  name: string;
  englishName: string;
  checked: boolean;
}

interface YouTubeListProps {
  youtubeChannels: YouTubeChannel[];
  onToggleChannel: (id: string) => void;
}

// YouTube 채널과 이미지 매핑
const getYouTubeIcon = (id: string) => {
  const iconMap: Record<string, string> = {
    syukaworld: '/youtube/슈카월드.jpg',
    sampro: '/youtube/삼프로.jpg',
    sousumonkey: '/youtube/소수몽키.jpg',
    osun: '/youtube/오선 미증.jpg',
    jun: '/youtube/전인구 경제.jpg',
    buiknam: '/youtube/부읽남.jpg',
    eo: '/youtube/EO.jpg',
    bizcafe: '/youtube/비즈카페.jpg',
    kimDante: '/youtube/김단테.jpg',
    wallstreet: '/youtube/월가아재.jpg',
    wongdal: '/youtube/옹달책방.jpg',
  };
  return iconMap[id] || '/youtube/월가아재.jpg';
};

export default function YouTubeList({
  youtubeChannels,
  onToggleChannel,
}: YouTubeListProps) {
  return (
    <div className="bg-black text-white px-6 py-4">
      <div className="space-y-1">
        {youtubeChannels.map((channel) => (
          <div key={channel.id} className="flex items-center space-x-3">
            {/* 독립된 좌측 바 */}
            <div
              className={`w-1 h-10 rounded-full transition-all duration-200 ${
                channel.checked ? 'bg-red-400' : 'bg-transparent'
              }`}
            />

            <div
              className={`flex items-center space-x-3 rounded-lg py-2 px-3 transition-all duration-200 flex-1 ${
                channel.checked
                  ? 'bg-gray-700'
                  : 'bg-gray-800/50 hover:bg-gray-700/50'
              }`}
              onClick={() => onToggleChannel(channel.id)}>
              <Checkbox
                id={channel.id}
                checked={channel.checked}
                className="data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
              />
              <div className="flex items-center space-x-3 flex-1">
                <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={getYouTubeIcon(channel.id)}
                    alt={channel.name}
                    width={24}
                    height={24}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium text-sm">
                      {channel.name}
                    </span>
                    <span className="text-red-300 text-xs">
                      {channel.englishName}
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
