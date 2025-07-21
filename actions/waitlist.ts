'use server';

import { WebClient } from '@slack/web-api';

const slackToken = process.env.SLACK_BOT_TOKEN;
const channelId = process.env.SLACK_CHANNEL_ID;

const web = new WebClient(slackToken);

interface ApplicationData {
  contact: string; // 사용자 전화번호
  chatMessage?: string; // 채팅 메시지 (선택적)
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

export async function sendChatMessage(chatMessage: string) {
  const message = `💬 펫쏙쏙 채팅 메시지

*메시지:* ${chatMessage}

시간: ${new Date().toLocaleString('ko-KR')}`;

  try {
    await web.chat.postMessage({
      channel: channelId!,
      text: message,
      blocks: [
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
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: `시간: ${new Date().toLocaleString('ko-KR')}`,
            },
          ],
        },
      ],
    });
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
