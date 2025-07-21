import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

interface KeywordSelectionProps {
  onServiceButtonClick?: () => void;
}

const keywordIcons = [
  { name: 'perplexity', src: '/keyword/perplexity.png' },
  { name: 'Gemini', src: '/keyword/gemini.png' },
  { name: 'Grok', src: '/keyword/grok.png' },
  { name: 'ChatGPT', src: '/keyword/chatgpt.png' },
];

export default function KeywordSelection({
  onServiceButtonClick,
}: KeywordSelectionProps) {
  return (
    <div className="px-6 pb-4 bg-black overflow-hidden">
      <div className="bg-gradient-to-b from-purple-200 to-purple-800 rounded-3xl shadow-2xl overflow-hidden relative">
        {/* Static Icons Section */}
        <div className="pt-8 pb-12">
          <h2 className="text-white text-xl font-bold mb-6 text-center">
            AI가 데이터를 받았어요.
          </h2>
          <div className="flex justify-center space-x-3">
            {keywordIcons.map((icon, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-12 h-12 bg-transparent flex items-center justify-center">
                <Image
                  src={icon.src}
                  alt={icon.name}
                  width={40}
                  height={40}
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Content Card Section */}
        <div>
          <div className="bg-gradient-to-b from-purple-500 to-purple-700 rounded-3xl px-6 py-6 shadow-xl relative">
            <div className="text-center mb-6">
              <p className="text-white font-semibold text-lg mb-1">STEP 5.</p>
              <h2 className="text-white text-xl font-bold mb-2">
                분석 내용을 매일 알려드릴게요.
              </h2>
              <p className="text-purple-100 text-base">
                시사, 경제, 정치, 부동산, 학술 +
              </p>
            </div>

            {/* Service Selection Button */}
            <button
              onClick={onServiceButtonClick}
              className="w-full h-10 bg-white text-purple-600 hover:bg-gray-100 rounded-xl py-4 mb-4 flex items-center justify-center text-lg font-bold shadow-lg transition-colors">
              <span className="font-bold">서비스 신청</span>
            </button>

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
