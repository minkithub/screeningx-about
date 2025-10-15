import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL('https://screeningx-about.vercel.app/'),
  title: '스크리닝X - AI 기반 브이로거 전문 추천 서비스',
  description:
    '브이로거의 영상 데이터를 AI가 정밀 분석해서 브래드에 꼭 맞는 브이로거만을 추천합니다.',
  generator: '스크리닝X',
  keywords: [
    '유튜버',
    '유튜브',
    'AI 분석',
    '인플루언서',
    '마케팅',
    '인플루언서 마케팅',
    '브이로거',
    '브랜드',
    '뷰티',
    '패션',
    '건기식',
    '건강기능식품',
  ],
  authors: [{ name: '스크리닝X' }],
  openGraph: {
    title: '스크리닝X - AI 기반 브이로거 전문 추천 서비스',
    description:
      '브이로거의 영상 데이터를 AI가 정밀 분석해서 브래드에 꼭 맞는 브이로거만을 추천합니다.',
    url: 'https://screeningx-about.vercel.app/',
    siteName: '스크리닝X',
    images: [
      {
        url: '/og_image.png',
        width: 1200,
        height: 630,
        alt: '스크리닝X - AI 기반 브이로거 전문 추천 서비스',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '스크리닝X - AI 기반 브이로거 전문 추천 서비스',
    description:
      '브이로거의 영상 데이터를 AI가 정밀 분석해서 브래드에 꼭 맞는 브이로거만을 추천합니다.',
    images: ['/og_image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// todo : 여기 clarity 새롭게 만들어서 적용하기.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

  return (
    <html lang="ko">
      <body className="md:bg-gray-100 overflow-x-hidden">
        <div className="w-full md:max-w-sm md:mx-auto md:bg-white md:shadow-lg overflow-x-hidden">
          {children}
        </div>
        <Analytics />
        {clarityId && (
          <Script id="clarity-script" strategy="afterInteractive">
            {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityId}");
          `}
          </Script>
        )}
      </body>
    </html>
  );
}
