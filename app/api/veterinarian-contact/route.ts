import { NextRequest, NextResponse } from 'next/server';
import { sendVeterinarianContact } from '@/actions/waitlist';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { clinicName, directorName, phone } = body;

    // 필수 필드 검증
    if (!clinicName || !directorName || !phone) {
      return NextResponse.json(
        { error: '필수 정보가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // 슬랙으로 전송
    await sendVeterinarianContact({
      clinicName,
      directorName,
      phone,
    });

    return NextResponse.json({
      success: true,
      message: '문의가 성공적으로 접수되었습니다.',
    });
  } catch (error) {
    console.error('Error processing veterinarian contact:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
