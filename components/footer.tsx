'use client';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Main Footer Content */}
        <div className="space-y-8 mb-8">
          {/* Company Info */}
          <div className="text-left">
            <h3 className="text-xl font-bold bg-gradient-to-r from-green-300 to-cyan-500 bg-clip-text text-transparent mb-4">
              스크리닝X
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              국내 최초 브이로거 전문 추천 서비스
            </p>
          </div>

          {/* Contact & Links */}
          <div className="text-left">
            <h4 className="text-lg font-semibold mb-4">문의 및 뉴스레터</h4>
            <div className="flex flex-col justify-left space-y-2 text-gray-300 text-sm">
              <p>문의: screeningx.cs@gmail.com</p>
              <p className="text-gray-400">
                출시 알림 및 업데이트 소식을 이메일로 받아보세요
              </p>
              <a
                href="https://rare-donut-9c1.notion.site/28d8e5ffaa1c80c6a37ee7dae0c0ef1b?pvs=73"
                target="_blank"
                className="hover:text-cyan-400 transition-colors">
                이용약관
              </a>
              <a
                href="https://rare-donut-9c1.notion.site/28d8e5ffaa1c809590c3d30099978430?pvs=73"
                target="_blank"
                className="hover:text-cyan-400 transition-colors">
                개인정보처리방침
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <div className="flex flex-col space-y-1">
              <p>회사명: 스크리닝X</p>
              <p>대표: 김민기</p>
              <p>사업자등록번호: 361-59-00922</p>
              <p>© 2025 ScreeninX. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
