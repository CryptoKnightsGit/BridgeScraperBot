"use strict";

const moment = require("moment");
let Parser = require('rss-parser');

function start(logger, tgBot, dcBot, settings) {

    // Get the scrapper settings
    const scrapper = settings.scrapper;

    // Set the User Agent
    let parser = new Parser({
        headers: {'User-Agent': scrapper.userAgent}
    });
    
    var currentBuildDate, oldBuildDate = null;

    // Start searching starting from this date. FIRST RUN ONLY
    if(scrapper.startLastBuildDate)
        oldBuildDate = moment(scrapper.startLastBuildDate);

    logger.info(`Scrapper Starting...`);

    setInterval(async () => {

        // Parse feed
        let feed = await parser.parseURL(scrapper.url);

        // Save the latest build date
        currentBuildDate = moment(feed.lastBuildDate);

        // Not first run and date updated
        if(oldBuildDate != null && currentBuildDate > oldBuildDate) {
            feed.items.forEach(async item => {

                // New rss item has been added
                if(moment(item.pubDate) > oldBuildDate){
                    logger.info(`New Post Found: ${item.title.trim()} (${item.pubDate.trim()})`);

                    // Send to telegram channel/group
                    scrapper.chatID.telegram.forEach(async chatID => {
                        await tgBot.telegram.sendMessage(
                            chatID,
                            item.title.trim()+"\n"+item.link.trim()
                        );
                    });

                    // Send to discord chat
                    scrapper.chatID.discord.forEach(async chatID => {
                        const dcChannel = await dcBot.channels.fetch(chatID).catch(err => {
                            console.error(`Could not find Discord channel ${chatID}: ${err.message}`);
                            throw err;
                        });
                        await dcChannel.send(item.title.trim() + '\n' + item.link.trim());
                    });
                }
            });
        }

        // Save the latest build time
        oldBuildDate = currentBuildDate;
    
    // To milliseconds 
    }, (scrapper.loop * 60000))

}
module.exports = {
	start,
};
