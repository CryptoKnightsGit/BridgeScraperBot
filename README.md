TediCross2.0
=========
TediCross2.0 is a bot which bridges a chat in [Telegram](https://telegram.org) with a channel in [Discord](https://discordapp.com/).

Added a RSS Feed scrapper which sends post to a telegram and discord chat.

There is no public TediCross2.0 bot. You need to host it yourself. To host a bot, you need [nodejs](https://nodejs.org). The bot requires NodeJS 14.9 or higher


TediCross Original
----------------------

https://github.com/TediCross/TediCross

Features & known bugs
---------------------

The bot is able to relay text messages and media files between Discord and Telegram. @-mentions, URLs, code (both inline and block-style) works well

For a list of known bugs, or to submit a bug or feature request, see this repo's "Issues" tab


Step by step installation:
--------------------------
Setting up the bot requires basic knowledge of the command line, which is bash or similar on Linux/Mac, and cmd.exe in Windows

 1. Install [nodejs](https://nodejs.org). TediCross2.0 requires at least node version 14.9
 2. Clone this git repo, or download it as a zip or whatever
 3. Open a terminal and enter the repo with the [`cd`](https://en.wikipedia.org/wiki/Cd_(command)) command. Something like `cd Downloads/TediCross2.0-master`. Your exact command may differ
 4. Run the command `npm install --production`
 5. Make a copy of the file `example.settings.yaml` and name it `settings.yaml`
 6. Aquire a bot token for Telegram ([How to create a Telegram bot](https://core.telegram.org/bots#3-how-do-i-create-a-bot)) and put it in the settings file
   - The Telegram bot must be able to access all messages. Talk to [@BotFather](https://t.me/BotFather) to disable privacy mode for the bot
   - Do NOT use another bot you already have running. That will cause all sorts of weird problems. Make a new one
 7. Aquire a bot token for Discord ([How to create a Discord bot](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token)) and put it in the settings file under `discord.token`. **NOTE** that the token is NOT the "Client Secret". The token is under the section "App bot user" further down the page
   - Do NOT use another bot you already have running. That will cause all sorts of weird problems. Make a new one
 8. Add the Telegram bot to the Telegram chat
   - If the Telegram chat is a supergroup, the bot also needs to be admin of the group, or it won't get the messages. The creator of the supergroup is able to give it admin rights
 9. Add the Discord bot to the Discord server (https://discordapp.com/oauth2/authorize?client_id=YOUR_CLIENT_ID_HERE&scope=bot&permissions=248832). This requires that you have admin rights on the server
 10. Fill out the Scrapper's settings in `settings.yaml`
 11. Start TediCross2.0: `npm start`
 12. Ask the bots for the remaining details. In the Telegram chat and the Discord channel, write `/chatinfo`. Put the info you get in the settings file.
   - If you want to bridge a Telegram group or channel, remember that the ID is negative. Include the `-` when entering it into the settings file
   - It is important that the Discord  channel ID is wrapped with single quotes when entered into the settings file. `'244791815503347712'`, not `244791815503347712`
 13. Restart TediCross2.0. You stop it by pressing CTRL + C in the terminal it is running in

Done! You now have a nice bridge between a Telegram chat and a Discord channel


Settings
--------

As mentioned in the step by step installation guide, there is a settings file. Here is a description of what the settings do.

* `telegram`: Object authorizing and defining the Telegram bot's behaviour
	* `token`: The Telegram bot's token. It is needed for the bot to authenticate to the Telegram servers and be able to send and receive messages. If set to `"env"`, TediCross2.0 will read the token from the environment variable `TELEGRAM_BOT_TOKEN`
	* `useFirstNameInsteadOfUsername`: **EXPERIMENTAL** If set to `false`, the messages sent to Discord will be tagged with the sender's username. If set to `true`, the messages sent to Discord will be tagged with the sender's first name (or nickname). Note that Discord users can't @-mention Telegram users by their first name. Defaults to `false`
	* `colonAfterSenderName`: Whether or not to put a colon after the name of the sender in messages from Discord to Telegram. If true, the name is displayed `Name:`. If false, it is displayed `Name`. Defaults to false
	* `skipOldMessages`: Whether or not to skip through all previous messages cached from the telegram-side and start processing new messages ONLY. Defaults to true. Note that there is no guarantee the old messages will arrive at Discord in order
	* `sendEmojiWithStickers`: Whether or not to send the corresponding emoji when relaying stickers to Discord
* `discord`: Object authorizing and defining the Discord bot's behaviour
	* `token`: The Discord bot's token. It is needed for the bot to authenticate to the Discord servers and be able to send and receive messages. If set to `"env"`, TediCross2.0 will read the token from the environment variable `DISCORD_BOT_TOKEN`
	* `skipOldMessages`: Whether or not to skip through all previous messages sent since the bot was last turned off and start processing new messages ONLY. Defaults to true. Note that there is no guarantee the old messages will arrive at Telegram in order. **NOTE:** [Telegram has a limit](https://core.telegram.org/bots/faq#my-bot-is-hitting-limits-how-do-i-avoid-this) on how quickly a bot can send messages. If there is a big backlog, this will cause problems
	* `useNickname`: Uses the sending user's nickname instead of username when relaying messages to Telegram
	* `replyLength`: How many characters of the original message to display on replies
	* `maxReplyLines`: How many lines of the original message to display on replies
* `debug`: If set to `true`, activates debugging output from the bot. Defaults to `false`
* `bridges`: An array containing all your chats and channels. For each object in this array, you should have the following properties:
	* `name`: A internal name of the chat. Appears in the log
	* `direction`: Direction of the bridge. "both" for bidirectional, "d2t" for discord-to-telegram, "t2d" for telegram-to-discord
	* `telegram.chatId`: ID of the chat that is the Telegram end of this bridge. See step 12 on how to aquire it
	* `telegram.relayJoinMessages`: Whether or not to relay messages to Discord about people joining the Telegram chat
	* `telegram.relayLeaveMessages`: Whether or not to relay messages to Discord about people leaving the Telegram chat
	* `telegram.sendUsernames`: Whether or not to send the sender's name with the messages to Discord
	* `telegram.relayCommands`: If set to `false`, messages starting with a `/` are not relayed to Discord
	* `telegram.crossDeleteOnTelegram`: Whether or not to also delete the corresponding message on Discord when one is deleted on Telegram. **NOTE**: See FAQ about deleting messages.
	* `discord.channelId`: ID of the channel the Discord end of the bridge is in. See step 12 on how to aquire it
	* `discord.relayJoinMessages`: Whether or not to relay messages to Telegram about people joining the Discord chat
	* `discord.relayLeaveMessages`: Whether or not to relay messages to Telegram about people leaving the Discord chat
	* `discord.sendUsernames`: Whether or not to send the sender's name with the messages to Telegram
	* `discord.crossDeleteOnTelegram`: Whether or not to also delete the corresponding message on Telegram when one is deleted in Discord
* `scrapper`: Object defining the Scrapper bot's behaviour
	* `url`: URL for the RSS Feed to scrape
	* `userAgent`: UserAgent to be used when visiting the RSS Feed
	* `chatID`: Object containing all your Telegram and Discord chats that you would like to send the post to.
		* `telegram`: An array containing all Telegram's channel/group ids
		* `discord`: An array containing all Discord's chat ids
	* `loop`: Number of minutes for the bot to search for new updates
	* `startLastBuildDate`: If set to '' the bot will start the search from the current lastBuildDate on the rss feed.
	**Example:** if `startLastBuildDate` is set to 'Fri, 19 Mar 2021 02:00:35 +0000' Then the bot will get all the posts past that date. sending them all at once at the beginning. This might take a while if there are a lot of posts and will results in a 'HTTP 429 Too Many * Requests'. It is recommended to keep `startLastBuildDate` an empty string.


The available settings will occasionally change. The bot takes care of this automatically

FAQ
---

### What kind of machine do I need to run this?

Anything capable of running [NodeJS](https://nodejs.org) should be able to run TediCross2.0. People have had success running it on ordinary laptops, raspberry pis, Amazon Web Services, Google Cloud Platform, and other machines. It runs on both Linux and Windows, and probably also macOS. It does NOT, however, run on [Heroku](https://heroku.com)

The machine must be on for TediCross2.0 to work

### Just how much knowledge of the command line do I need to get the bot working?

Not much at all. Almost all the commands are written in the installation guide exactly as they should be entered. The only thing you need to know in addition is the [`cd`](https://en.wikipedia.org/wiki/Cd_(command)) command, in order to navigate to wherever you unpacked TediCross2.0

### The bot gives an error with the message `node: not found` when I try to run it

This likely means you are using Ubuntu or another Debian based Linux distro. You get node version 4 when you do `apt-get install nodejs`, and it is called `nodejs` instead of `node`.

TediCross2.0 requires node 14.9 or higher to run. To get node 14 on a debian based system (including Ubuntu), run the following two commands:

```
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Then try to run the bot again

### The bot just responds with a generic message telling me to get my own TediCross2.0 instance

This happens when you have not entered correct chat IDs in the settings file. See step 12 in the step by step installation guide for instructions on how to get these.

A small gotcha here is that Telegram group chats always have a negative chat ID. Remember to include the "-" in the settings file!

### The Telegram bot doesn't relay messages sent by other bots

The Telegram team unfortunately decided that bots cannot interact with each other, fearing they would get stuck in infinite loops. This means it is impossible, under any circumstances, for TediCross2.0 to relay messages from other Telegram bots to Discord. Discord does not have this limitation, and the Discord side of the bot will happily relay messages from other Discord bots to Telegram

See https://core.telegram.org/bots/faq#why-doesn-39t-my-bot-see-messages-from-other-bots

### Deleting a message in Telegram does not delete it in Discord

Telegram bots are unfortunately completely unable to detect when a message is deleted. There is no way to implement T2D cross-deletion until Telegram implements this.
**NOTE**: A partial solution to this has been implemented. When a message on Telegram is edited to become just a single dot (`.`), TediCross2.0 will delete it both on Telegram and on Discord.

Deleting messages D2T works as expected


### When running `npm install`, it complains about missing dependencies?

The [Discord library](https://discord.js.org/#/) TediCross2.0 is using has support for audio channels and voice chat. For this, it needs some additional libraries, like [node-opus](https://www.npmjs.com/package/node-opus), [libsodium](https://www.npmjs.com/package/libsodium) and others. TediCross2.0 does not do audio, so these warnings can safely be ignored

### How do I create more bridges?

TediCross2.0 supports a theoretically infinite number of bridges, limited only by your hardware. Even a simple Raspberry Pi is powerful enough to run multiple bridges, so don't worry about making more

To make more bridges, just copy the one you have, paste it right below and make necessary changes:

```
...
bridges:
  - name: Default bridge
    direction: both
    telegram:
      ...
    discord:
      ...
  - name: Another bridge
    direction: both
    telegram:
      ...
    discord:
      ...
...
```

The names of the bridges are practically only log identifiers. They can be whatever string you want them to be. Note, however, that the setting `discord.skipOldMessages` uses the names to know which messages was last sent from which channel, so they should be unique.

Note that the settings file is indentation sensitive. If you do for example
```
  - name: Bridge 1
      direction: both
```
it won't work. The "d" in "direction" must be directly below the "n" in "name". See `example.settings.yaml` for proper indentation


### TediCross2.0 spams errors in the console saying "terminated by other long poll or web hook"

This happens when two applications use the same Telegram bot token, or someone has set a webhook on the Telegram bot token. You may simply have accidently launched two instances of TediCross2.0, or someone else has somehow gotten hold of your token

If you haven't accidently launched two instances of TediCross2.0, assume the token is compromised. First, talk to [@BotFather](https://t.me/BotFather) to generate a new token for the bot. Then go to https://api.telegram.org/botTOKEN/deleteWebhook (with `TOKEN` replaced with your actual token) to get rid of any webhook set for the bot. Then update the settings file, and restart the bot


### How do I make the bot run automatically when my computer/server starts?

Take a look in [guides/autostart/](guides/autostart/) of this repo


### Why don't you use webhooks to send the messages to Discord? They are much better

This has been tried, and it did indeed make the messages much prettier. The bot can impersonate multiple people this way. Unfortunately, messages sent through a webhook does not belong to the bot, meaning the bot cannot edit them. Cross-editing from Telegram to Discord is then lost. In addition, it requires the bot owner to have two-factor authentication activated.

### Do you know of any way to relay messages from Discord to Telegram (or the other way) without bots?

No

