'use server';

import { WebClient } from '@slack/web-api';

const slackToken = process.env.SLACK_BOT_TOKEN;
const channelId = process.env.SLACK_CHANNEL_ID;

const web = new WebClient(slackToken);

interface ApplicationData {
  contact: string; // 사용자 이메일 주소
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

export async function sendApplicationNotification(data: ApplicationData) {
  const message = `🎉 펫쏙쏙 출시 알림 신청

*이메일:* ${data.contact}

신청 시간: ${new Date().toLocaleString('ko-KR')}`;

  try {
    await web.chat.postMessage({
      channel: channelId!,
      text: message,
      blocks: [
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
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: `신청 시간: ${new Date().toLocaleString('ko-KR')}`,
            },
          ],
        },
      ],
    });
  } catch (error) {
    console.error('Error sending application notification:', error);
    throw error;
  }
}
