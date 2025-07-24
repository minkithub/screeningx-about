'use client';

import { useState, useEffect } from 'react';

const sampleQuestions = [
  '상처에서 진물/피가 나는데, 병원 가야 하나요?',
  '밥이랑 물을 전혀 안 먹어요. 억지로 먹일까요?',
  '이사 후 이불에 소변 실수를 해요. 왜 이러죠?',
  '강아지가 갑자기 설사하는데, 병원 가야 하나요?',
  '강아지가 계속 낑낑대고 떨어요. 많이 아픈가요?',
  '이사 후 침대 밑에 숨어서 굶고 있어요. 괜찮나요?',
  '강아지가 자꾸 손발을 깨물어요. 입질 어떡하죠?',
  '집안 곳곳에 오줌을 뿌려요. 어떻게 멈추게 하죠?',
  '수술 부위가 붓고 빨개요. 이거 정상인가요?',
  '강아지 배변 훈련, 어떻게 시작해야 하나요?',
  '넥카라가 불편해 보여요. 잠시 빼줘도 될까요?',
  '강아지가 밤에 계속 깨서 울어요. 어떡해야 하죠?',
  '약 먹고 토했는데, 약을 다시 먹여야 하나요?',
  '구석에 숨어서 계속 하악질만 해요. 왜 이러죠?',
  '2개월 강아지 사료양, 하루에 얼마나 줘야 하죠?',
  '수술 후 산책, 언제부터 얼마나 할 수 있나요?',
  '강아지 예방접종, 언제부터 시작해야 하나요?',
];

export default function LiveQuestionsSection() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const serviceURL = process.env.NEXT_PUBLIC_SERVICE_URL;

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % sampleQuestions.length);
    }, 3000); // 2초마다 스위칭

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
        <h2 className="text-3xl font-bold leading-tight mb-6 text-center text-black">
          <span className="bg-gradient-to-r to-[#7699de] from-[#155EEF] bg-clip-text text-transparent">
            동물병원
          </span>
          과{' '}
          <span className="bg-gradient-to-r to-[#7699de] from-[#155EEF] bg-clip-text text-transparent">
            행동 클리닉
          </span>
          을
          <br />
          내 손 안으로 쏙! 24시간
          <br />
          펫쏙쏙에 물어보세요.
          <br />
        </h2>

        {/* 설명 */}
        <p className="text-gray-600 text-ms mb-8">
          지금 펫쏙쏙에{' '}
          <span className="font-bold ">실시간으로 올라오는 질문</span>
          이에요.
        </p>

        {/* 검색창 모양의 UI */}
        {/* <div
          className="relative max-w-md mx-auto"
          onClick={handleQuestionClick}>
          <div className="flex items-center bg-gray-50 border-2 border-blue-500 rounded-2xl px-2 py-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
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

            <span className="text-blue-600 font-bold text-left flex-1 transition-all duration-500 text-sm">
              {sampleQuestions[currentQuestionIndex]}
            </span>
          </div>
        </div> */}

        <div
          className="slot-container border-blue-500 border-2 rounded-2xl "
          onClick={handleQuestionClick}>
          <div
            className="slot-track  "
            style={{ transform: `translateY(-${index * 40}px)` }}>
            {sampleQuestions.map((item, i) => (
              <div
                className="slot-item flex items-center bg-gray-50  px-2 py-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                key={i}>
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
                <span className="text-blue-600 font-bold text-left flex-1 transition-all duration-500 text-sm">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
