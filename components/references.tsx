'use client';

import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';

interface Reference {
  title: string;
  description: string;
  image?: string;
  avatars?: string[];
}

export default function References() {
  const references: Reference[] = [
    {
      title: 'JAVMA',
      description: '미국 수의사학회 저널',
      image: '/references/javma.webp',
    },
    {
      title: 'ACVIM',
      description: '미국 수의내과학회 저널',
      image: '/references/acvim.webp',
    },
    {
      title: 'WSAVA',
      description: '세계 소동물 수의사회 정보',
      image: '/references/wsava.webp',
    },
    {
      title: 'JSAP',
      description: '영국 소동물 수의사회 정보',
      image: '/references/jsap.webp',
    },
    {
      title: 'ACVS',
      description: '미국 수의외과 협회 정보',
      image: '/references/acvs.webp',
    },
    {
      title: 'ECVS',
      description: '유럽 수의외과 협회 정보',
      image: '/references/ecvs.webp',
    },
    {
      title: 'KVMA',
      description: '대한수의사회 정보',
      image: '/references/kvma.webp',
    },
    {
      title: '수의사 자문단',
      description: '펫쏙쏙 수의사 자문단',
      avatars: [
        '/references/v1.webp',
        '/references/v2.webp',
        '/references/v3.webp',
      ],
    },
    {
      title: '수의사 유튜브',
      description: '미아옹철, 마이펫상...',
      avatars: [
        '/references/vy1.webp',
        '/references/vy2.webp',
        '/references/vy3.webp',
      ],
    },
    {
      title: '반려견 훈련사 유튜브',
      description: '보듬TV, 애니...',
      avatars: [
        '/references/ty1.webp',
        '/references/ty2.webp',
        '/references/ty3.webp',
      ],
    },
    {
      title: '반려견 전문 커뮤니티',
      description: '강사모, 포메...',
      avatars: [
        '/references/c1.webp',
        '/references/c2.webp',
        '/references/c3.webp',
      ],
    },
  ];

  return (
    <div className="bg-custom-cream text-black px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-left mb-8">
          <h2 className="text-2xl font-bold mb-4">
            <span className="text-blue-400">수의학 기반 </span>
            신뢰도 있는 출처를 <br />
            수집·분석하고 있어요.
          </h2>
        </div>

        {/* References Grid */}
        <div className="space-y-0">
          {references.map((reference, index) => (
            <div key={reference.title} className="flex items-center space-x-3">
              {/* 독립된 좌측 바 */}
              <div
                className={`w-1 h-12 rounded-full transition-all duration-200 ${'bg-blue-400'}`}
              />

              <div
                className={`flex items-center space-x-4 rounded-lg py-3 px-2 transition-all duration-200 flex-1 ${
                  index % 2 === 0 ? 'bg-gray-100' : 'bg-custom-cream'
                }`}>
                <Checkbox
                  id={reference.title}
                  checked={true}
                  className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                <div className="flex items-center space-x-4 flex-1">
                  {/* 단일 이미지 표시 */}
                  {reference.image && (
                    <div className="w-6 h-6 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                      <Image
                        src={reference.image}
                        alt={reference.title}
                        width={16}
                        height={16}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  )}

                  {/* 아바타 그룹 표시 */}
                  {reference.avatars && (
                    <div className="flex -space-x-3 flex-shrink-0">
                      {reference.avatars.map((avatar, avatarIndex) => (
                        <div
                          key={avatarIndex}
                          className="w-5 h-5 rounded-full overflow-hidden border-2 border-white bg-gray-200"
                          style={{
                            zIndex: reference.avatars!.length - avatarIndex,
                          }}>
                          <Image
                            src={avatar}
                            alt={`${reference.title} ${avatarIndex + 1}`}
                            width={16}
                            height={16}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex-1">
                    <span className="text-black font-semibold text-sm">
                      {reference.title}
                    </span>
                    <span className="text-gray-600 text-sm ml-1">
                      {reference.description}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
