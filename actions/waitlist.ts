// /lib/actions.ts (또는 원하는 경로)

// 'use server' 지시어는 이 파일의 모든 함수가 서버에서만 실행되는
// 서버 액션임을 명시합니다.
'use server';

import { WebClient } from '@slack/web-api';

// .env.local 파일에 저장된 환경 변수를 안전하게 가져옵니다.
const slackToken = process.env.SLACK_BOT_TOKEN;
const channelId = process.env.SLACK_CHANNEL_ID;

// 슬랙 토큰으로 WebClient 인스턴스를 생성합니다.
const web = new WebClient(slackToken);

// TypeScript 인터페이스를 사용하여 데이터의 타입을 명확하게 정의합니다.
interface ApplicationData {
  contact: string; // 사용자 이메일
  chatMessage?: string; // 채팅 메시지 (선택적)
}

interface CompressedImage {
  name: string;
  data: string; // base64 인코딩된 이미지 데이터
  size: number;
}

interface VeterinarianContactData {
  clinicName: string;
  directorName: string;
  phone: string;
}

/**
 * 간단한 텍스트 메시지를 슬랙으로 보냅니다.
 * @param message 보낼 메시지 내용
 */
export async function sendSlackNotification(message: string) {
  try {
    await web.chat.postMessage({
      channel: channelId!,
      text: message,
    });
  } catch (error) {
    console.error('Error sending Slack notification:', error);
    throw error; // 에러 발생 시 호출한 쪽으로 전파
  }
}

/**
 * 채팅 메시지와 이미지를 슬랙으로 전송합니다.
 * 이미지는 스레드에 답글 형태로 업로드됩니다.
 * @param chatMessage 채팅 메시지
 * @param images 첨부 이미지 배열 (선택적)
 */
export async function sendChatMessage(
  chatMessage: string,
  images?: CompressedImage[]
) {
  const hasImages = images && images.length > 0;
  const imageText = hasImages ? `\n*첨부 이미지:* ${images.length}개` : '';

  // 슬랙 알림 미리보기에 표시될 기본 텍스트
  const message = `💬 펫쏙쏙 채팅 메시지\n*메시지:* ${chatMessage}${imageText}`;

  // Slack Block Kit을 사용하여 메시지를 시각적으로 꾸밉니다.
  const blocks: any[] = [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: '💬 펫쏙쏙 채팅 메시지',
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*메시지:*\n${chatMessage}`,
      },
    },
  ];

  if (hasImages) {
    const totalSizeKB = Math.round(
      images!.reduce((sum, img) => sum + img.size, 0) / 1024
    );
    const imageDetails = images!
      .map((img) => `${img.name} (${Math.round(img.size / 1024)}KB)`)
      .join(', ');

    blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*첨부 이미지:* ${
          images!.length
        }개 (총 ${totalSizeKB}KB)\n${imageDetails}`,
      },
    });
  }

  blocks.push({
    type: 'context',
    elements: [
      {
        type: 'mrkdwn',
        text: `시간: ${new Date().toLocaleString('ko-KR')}`,
      },
    ],
  });

  try {
    // 1. 텍스트 메시지를 먼저 전송합니다.
    const response = await web.chat.postMessage({
      channel: channelId!,
      text: message,
      blocks: blocks,
    });

    // 2. 이미지가 있고 메시지 전송이 성공했다면, 해당 메시지의 스레드(thread)에 이미지를 업로드합니다.
    if (hasImages && response.ts) {
      for (const image of images!) {
        try {
          const buffer = Buffer.from(image.data, 'base64');

          await web.filesUploadV2({
            channel_id: channelId!,
            thread_ts: response.ts, // 부모 메시지의 타임스탬프(ts)를 지정하여 스레드에 남김
            file: buffer,
            filename: image.name,
            initial_comment: `📷 ${image.name} (${Math.round(
              image.size / 1024
            )}KB)`,
          });
        } catch (uploadError) {
          console.error(`Error uploading image ${image.name}:`, uploadError);
          // 개별 이미지 업로드 실패 시, 실패했다는 메시지를 스레드에 남깁니다.
          await web.chat.postMessage({
            channel: channelId!,
            thread_ts: response.ts,
            text: `❌ 이미지 업로드 실패: ${image.name}`,
          });
        }
      }
    }
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
}

/**
 * '출시 알림 신청' 폼 데이터를 받아 슬랙으로 전송합니다.
 * @param data 신청 폼 데이터 (이메일, 채팅 메시지)
 */
export async function sendApplicationNotification(data: ApplicationData) {
  const message = `🎉 펫쏙쏙 출시 알림 신청\n*이메일:* ${data.contact}`;

  const blocks: any[] = [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: '🎉 펫쏙쏙 출시 알림 신청',
      },
    },
    {
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: `*이메일:*\n${data.contact}`,
        },
      ],
    },
  ];

  if (data.chatMessage) {
    blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*채팅 메시지:*\n${data.chatMessage}`,
      },
    });
  }

  blocks.push({
    type: 'context',
    elements: [
      {
        type: 'mrkdwn',
        text: `신청 시간: ${new Date().toLocaleString('ko-KR')}`,
      },
    ],
  });

  try {
    await web.chat.postMessage({
      channel: channelId!,
      text: message,
      blocks: blocks,
    });
  } catch (error) {
    console.error('Error sending application notification:', error);
    throw error;
  }
}

/**
 * '수의사 문의' 폼 데이터를 받아 슬랙으로 전송합니다.
 * @param data 수의사 문의 폼 데이터 (병원이름, 원장명, 연락처)
 */
export async function sendVeterinarianContact(data: VeterinarianContactData) {
  const message = `🏥 수의사 문의 접수\n*병원명:* ${data.clinicName}`;

  const blocks: any[] = [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: '🏥 수의사 문의 접수',
      },
    },
    {
      type: 'section',
      fields: [
        { type: 'mrkdwn', text: `*병원명:*\n${data.clinicName}` },
        { type: 'mrkdwn', text: `*대표자 이름:*\n${data.directorName}` },
        { type: 'mrkdwn', text: `*연락처:*\n${data.phone}` },
      ],
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: `접수 시간: ${new Date().toLocaleString('ko-KR')}`,
        },
      ],
    },
  ];

  try {
    await web.chat.postMessage({
      channel: channelId!,
      text: message,
      blocks: blocks,
    });
  } catch (error) {
    console.error('Error sending veterinarian contact:', error);
    throw error;
  }
}
