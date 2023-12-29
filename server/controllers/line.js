import line from '@line/bot-sdk';

const { LOCATION_ORIGIN } = process.env;
const client = new line.messagingApi.MessagingApiClient({
  channelAccessToken: process.env.LINE_MESSAGE_CHANNEL_ACCESS_TOKEN,
});

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  if (event.message.text.includes('會員')) {
    const contents = {
      type: 'bubble',
      hero: {
        type: 'image',
        url: 'https://d3nexs9enmvorf.cloudfront.net/flex01.webp',
        size: 'full',
        aspectRatio: '20:13',
        aspectMode: 'cover',
        action: {
          type: 'uri',
          uri: 'http://linecorp.com/',
        },
      },
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: 'iSEE-CRM',
            weight: 'bold',
            size: 'xl',
            align: 'center',
          },
          {
            type: 'box',
            layout: 'baseline',
            margin: 'md',
            contents: [
              {
                type: 'icon',
                size: 'sm',
                url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
              },
              {
                type: 'icon',
                size: 'sm',
                url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
              },
              {
                type: 'icon',
                size: 'sm',
                url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
              },
              {
                type: 'icon',
                size: 'sm',
                url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
              },
              {
                type: 'icon',
                size: 'sm',
                url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
              },
              {
                type: 'text',
                text: '5.0',
                size: 'sm',
                color: '#999999',
                margin: 'md',
                flex: 0,
              },
            ],
            justifyContent: 'center',
          },
          {
            type: 'box',
            layout: 'vertical',
            margin: 'lg',
            spacing: 'sm',
            contents: [
              {
                type: 'box',
                layout: 'baseline',
                spacing: 'sm',
                contents: [
                  {
                    type: 'text',
                    text: '你最棒的會員整合系統',
                    wrap: true,
                    color: '#666666',
                    size: 'sm',
                    flex: 5,
                    style: 'italic',
                    decoration: 'none',
                    align: 'center',
                  },
                ],
              },
            ],
          },
        ],
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        spacing: 'sm',
        contents: [
          {
            type: 'button',
            style: 'link',
            height: 'sm',
            action: {
              type: 'uri',
              label: 'CARD',
              // uri: `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=2001826171&redirect_uri=${LOCATION_ORIGIN}/user/signInCallback&state=123456789&scope=profile%20openid%20email&ui_locales=zh-TW&bot_prompt=normal`,
              uri: 'https://iseecrm.fake-shop.store/user/signIn/test',
            },
          },
          {
            type: 'button',
            style: 'link',
            height: 'sm',
            action: {
              type: 'uri',
              label: 'WEBSITE',
              // uri: `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=2001826171&redirect_uri=${LOCATION_ORIGIN}/user/signInCallback&state=123456789&scope=profile%20openid%20email&ui_locales=zh-TW&bot_prompt=normal`,
              uri: 'https://iseecrm.fake-shop.store/user/signIn/test',
            },
          },
          {
            type: 'box',
            layout: 'vertical',
            contents: [],
            margin: 'sm',
          },
        ],
        flex: 0,
      },
    };

    const flexMessage = {
      type: 'flex',
      altText: '點擊觀看會員卡！',
      contents,
    };

    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [flexMessage],
    });
  }

  const echo = { type: 'text', text: '請不要自言自語哦～' };

  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [echo],
  });
}

function chatBOTCallback(req, res) {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
}

export default chatBOTCallback;
