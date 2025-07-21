import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL('https://petsoksok.vercel.app'),
  title: '펫쏙쏙 - AI 반려동물 상담 서비스',
  description:
    '수의학 기반 신뢰도 높은 정보로 AI가 반려동물 건강 상담을 제공합니다. 24시간 언제든지 반려동물 케어 정보를 받아보세요.',
  generator: '펫쏙쏙',
  keywords: [
    '반려동물',
    '펫',
    '수의학',
    'AI 상담',
    '반려견',
    '반려묘',
    '펫케어',
    '동물병원',
    '수의사',
    '반려동물 건강',
  ],
  authors: [{ name: '펫쏙쏙' }],
  openGraph: {
    title: '펫쏙쏙 - AI 반려동물 상담 서비스',
    description:
      '수의학 기반 신뢰도 높은 정보로 AI가 반려동물 건강 상담을 제공합니다. 24시간 언제든지 반려동물 케어 정보를 받아보세요.',
    url: 'https://petsoksok.vercel.app/',
    siteName: '펫쏙쏙',
    images: [
      {
        url: '/og_image.png',
        width: 1200,
        height: 630,
        alt: '펫쏙쏙 - AI 반려동물 상담 서비스',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '펫쏙쏙 - AI 반려동물 상담 서비스',
    description:
      '수의학 기반 신뢰도 높은 정보로 AI가 반려동물 건강 상담을 제공합니다. 24시간 언제든지 반려동물 케어 정보를 받아보세요.',
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
