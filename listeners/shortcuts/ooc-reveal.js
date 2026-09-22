async function flaron(id){
    if (id.startsWith("D")){
        return "[dm id]"
    }
    try{
        var res=await fetch(`https://flaron.halceon.dev/channel/${id}`)
        if(!res.ok){
            return `*[error ${res.status}]*`
        }
        try{
            return (await res.json()).name || "*[not found :sob:]*"
        }catch(e){
            console.log(e)
            return "*[somehow a json parsing error????? :whar:]*"
        }
    }catch(e){
        console.log(e)
        return "*[network error :idk:]*"
    }
}
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
        console.log('=====================',JSON.stringify(message, null, 2))
        const regex = /"channel_id": "([DC][A-Z0-9]{8,10})"/g;
        //https://flaron.halceon.dev/channel/<ID>
        
        const ids=Array.from(JSON.stringify(message, null, 2).matchAll(regex), match => match[1]);
        const names=await Promise.all(ids.map(flaron));
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
                            text: `*IDs:* ${ids}\n*Names (from flaron API):* ${names}`,
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
