const oocReveal = async ({ shortcut, ack, client, logger }) => {
    try {
        const { trigger_id, message, channel, message_ts } = shortcut;
        // message.text       -> the message's text
        // message.user       -> user ID who sent it
        // message.ts         -> timestamp (same as message_ts)
        // message.blocks     -> rich block content, if any
        // channel.id         -> channel the message is in
        // channel.name       -> channel name (sometimes)
        await ack();
        await client.views.open({
            trigger_id,
            view: {
                type: 'modal',
                callback_id: 'sample_view_id',
                title: {
                    type: 'plain_text',
                    text: 'ooc thingy',
                },
                blocks: [
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: `\`\`\`\n${JSON.stringify(message.blocks || message.text)}\n\`\`\``,
                        },
                    }
                ],
            },
        });
    } catch (error) {
        logger.error(error);
    }
};

export { oocReveal };
