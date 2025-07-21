import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL('https://about-switch-ai.vercel.app'),
  title: 'SwitchAI - AI 기반 맞춤형 뉴스 서비스',
  description:
    '내가 선택한 언론사, 유튜브, X로 AI가 맞춤 분석 뉴스를 매일 만들어드립니다.',
  generator: 'SwitchAI',
  keywords: ['AI', '뉴스', '맞춤형', '언론사', '유튜브', 'X', '트위터', '분석'],
  authors: [{ name: 'SwitchAI' }],
  openGraph: {
    title: 'SwitchAI - AI 기반 맞춤형 뉴스 서비스',
    description:
      '내가 선택한 언론사, 유튜브, X로 AI가 맞춤 분석 뉴스를 매일 만들어드립니다.',
    url: 'https://about-switch-ai.vercel.app/',
    siteName: 'SwitchAI',
    images: [
      {
        url: '/og_img.png',
        width: 1200,
        height: 630,
        alt: 'SwitchAI - AI 기반 맞춤형 뉴스 서비스',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SwitchAI - AI 기반 맞춤형 뉴스 서비스',
    description:
      '내가 선택한 언론사, 유튜브, X로 AI가 맞춤 분석 뉴스를 매일 만들어드립니다.',
    images: ['/og_img.png'],
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
    <html lang="en">
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
