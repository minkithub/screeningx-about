'use server';

import { WebClient } from '@slack/web-api';

const slackToken = process.env.SLACK_BOT_TOKEN;
const channelId = process.env.SLACK_CHANNEL_ID;

const web = new WebClient(slackToken);

interface ApplicationData {
  contact: string; // 사용자 전화번호
  chatMessage?: string; // 채팅 메시지 (선택적)
}

interface CompressedImage {
  name: string;
  data: string;
  size: number;
}

export async function sendSlackNotification(message: string) {
  try {
    await web.chat.postMessage({
      channel: channelId!,
      text: message,
    });
  } catch (error) {
    console.error('Error sending Slack notification:', error);
    throw error;
  }
}

export async function sendChatMessage(
  chatMessage: string,
  images?: CompressedImage[]
) {
  const hasImages = images && images.length > 0;
  const imageText = hasImages ? `\n*첨부 이미지:* ${images.length}개` : '';

  const message = `💬 펫쏙쏙 채팅 메시지

*메시지:* ${chatMessage}${imageText}

시간: ${new Date().toLocaleString('ko-KR')}`;

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
    // 메시지 먼저 전송
    const response = await web.chat.postMessage({
      channel: channelId!,
      text: message,
      blocks: blocks,
    });

    // 이미지가 있으면 각각 업로드하고 스레드로 답글
    if (hasImages && response.ts) {
      for (const image of images!) {
        try {
          const buffer = Buffer.from(image.data, 'base64');

          await web.filesUploadV2({
            channel_id: channelId!,
            thread_ts: response.ts,
            file: buffer,
            filename: image.name,
            title: `첨부 이미지: ${image.name}`,
            initial_comment: `📷 ${image.name} (${Math.round(
              image.size / 1024
            )}KB)`,
          });
        } catch (uploadError) {
          console.error(`Error uploading image ${image.name}:`, uploadError);
          // 개별 이미지 업로드 실패는 전체 프로세스를 중단하지 않음
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

export async function sendApplicationNotification(data: ApplicationData) {
  const baseMessage = `🎉 펫쏙쏙 출시 알림 신청

*전화번호:* ${data.contact}`;

  const chatSection = data.chatMessage
    ? `\n*채팅 메시지:* ${data.chatMessage}\n`
    : '\n';

  const message = `${baseMessage}${chatSection}
신청 시간: ${new Date().toLocaleString('ko-KR')}`;

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
          text: `*전화번호:*\n${data.contact}`,
        },
      ],
    },
  ];

  // 채팅 메시지가 있는 경우 추가
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
