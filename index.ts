import * as DiscordJS from "discord.js";
import { Guild, GuildMember, Intents } from 'discord.js'
import * as dotenv from "dotenv";
import { loadPRMSPrice } from './rest'

dotenv.config({path: __dirname + '/../.env'})

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on('ready', () => {
    console.log('the bot is ready')
})

let bot: GuildMember;

client.on('messageCreate', (message) => {
    if (!!message?.guild?.me) {
        bot = message?.guild?.me as GuildMember;
    }
});

client.login(process.env.TOKEN)

setInterval(
    () => {
        if (bot) {
            loadPRMSPrice().subscribe({
                next: (price: number) => {
                    const formattedPrice = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(price);
                    console.log('price is : ', formattedPrice);
                    bot.setNickname(`PRMS: $${formattedPrice}`);
                }
            });
        }
    },
    30000
);
