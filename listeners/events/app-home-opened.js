const appHomeOpenedCallback = async ({ client, event, logger }) => {
  // Ignore the `app_home_opened` event for anything but the Home tab
  if (event.tab !== 'home') return;

  try {
    await client.views.publish({
      user_id: event.user,
      view: {
        type: 'home',
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
                text: `*Use this bot by using the "Get forward/OOC channel" message action on a message.*`,
            },
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: 'See the README of https://github.com/itzmetanjim/flaron-ooc for a detailed guide.',
            },
          },
        ],
      },
    });
  } catch (error) {
    logger.error(error);
  }
};

export { appHomeOpenedCallback };
