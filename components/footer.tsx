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
              펫쏙쏙
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              반려동물과 함께하는 건강한 생활을 위한 맞춤형 상담 서비스
            </p>
          </div>

          {/* Contact & Links */}
          <div className="text-left">
            <h4 className="text-lg font-semibold mb-4">문의 및 뉴스레터</h4>
            <div className="flex flex-col justify-left space-y-2 text-gray-300 text-sm">
              <p>문의: msjantler@gmail.com</p>
              <p className="text-gray-400">
                출시 알림 및 업데이트 소식을 이메일로 받아보세요
              </p>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                이용약관
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                개인정보처리방침
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>© 2025 펫쏙쏙. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
