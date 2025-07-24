'use client';

import { useState, useEffect } from 'react';

const sampleQuestions = [
  '상처에서 진물/피가 조금씩 나는데 병원에 다시 가봐야 할까요?',
  '밥을 전혀 안 먹고 물도 안 마셔요. 억지로라도 먹여야 할까요?',
  '화장실을 잘 가리던 아이인데, 이사 후 자꾸 이불이나 소파에 소변 실수를 해요.',
  '강아지가 갑자기 설사를 해요. 병원에 가야 할까요?',
  '아이가 계속 낑낑대고 몸을 떠는데, 많이 아픈 걸까요?',
  '이사 온 지 3일째인데 침대 밑에서 나오질 않아요. 굶고 있는데 괜찮을까요?',
  '자꾸 손이랑 발을 깨물어요. 입질은 어떻게 고치나요?',
  '집안 곳곳에 오줌을 뿌리고 다녀요. 어떻게 멈추게 하나요?',
  '수술 부위가 부었어요/빨개요. 정상 범위인가요?',
  '강아지 배변 훈련은 어떻게 시작해야 하나요?',
  '넥카라를 씌웠는데 너무 불편해해요. 잠시 빼줘도 될까요?',
  '밤에 계속 깨서 우는데 어떻게 해야 하죠?',
  '약을 먹고 구토를 했는데, 다시 먹여야 하나요?',
  '계속 구석에 숨어서 하악질만 해요. 어떻게 해야 하죠?',
  '2개월 강아지 사료양은 얼마나 줘야 하나요?',
  '산책은 언제부터 가능한가요? 얼마나 걸어도 되죠?',
  '강아지 예방접종은 언제부터 시작해야 하나요',
];

export default function LiveQuestionsSection() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const serviceURL = process.env.NEXT_PUBLIC_SERVICE_URL;

  // 3초마다 질문 변경
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuestionIndex((prev) => (prev + 1) % sampleQuestions.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleQuestionClick = () => {
    if (serviceURL) {
      const currentQuestion = sampleQuestions[currentQuestionIndex];
      const targetURL = `${serviceURL}?q=${encodeURIComponent(
        currentQuestion
      )}`;
      window.location.href = targetURL;
    }
  };

  return (
    <section className="py-16 px-6 bg-[#F7F4EF]">
      <div className="max-w-4xl mx-auto text-center">
        {/* 제목 */}
        <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-black to-blue-400 bg-clip-text text-transparent">
          답변이 궁금하다면? <br />
          지금 대화해보세요.
        </h2>

        {/* 설명 */}
        <p className="text-gray-600 text-ms mb-8">
          지금 펫쏙쏙에{' '}
          <span className="font-bold ">실시간으로 올라오는 질문</span>
          이에요.
        </p>

        {/* 검색창 모양의 UI */}
        <div
          className="relative max-w-md mx-auto"
          onClick={handleQuestionClick}>
          <div className="flex items-center bg-gray-50 border-2 border-blue-500 rounded-2xl px-2 py-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            {/* 검색 아이콘 */}
            <svg
              className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>

            {/* 질문 텍스트 */}
            <span className="text-blue-600 font-bold text-left flex-1 transition-all duration-500 text-sm">
              {sampleQuestions[currentQuestionIndex]}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
