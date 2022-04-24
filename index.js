"use strict";
exports.__esModule = true;
var DiscordJS = require("discord.js");
var discord_js_1 = require("discord.js");
var dotenv = require("dotenv");
var rest_1 = require("./rest");
dotenv.config({ path: __dirname + '/../.env' });
var client = new DiscordJS.Client({
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES
    ]
});
client.on('ready', function () {
    console.log('the bot is ready');
});
var bot;
client.on('messageCreate', function (message) {
    var _a, _b;
    if (!!((_a = message === null || message === void 0 ? void 0 : message.guild) === null || _a === void 0 ? void 0 : _a.me)) {
        bot = (_b = message === null || message === void 0 ? void 0 : message.guild) === null || _b === void 0 ? void 0 : _b.me;
    }
});
client.login(process.env.TOKEN);
setInterval(function () {
    if (bot) {
        (0, rest_1.loadPRMSPrice)().subscribe({
            next: function (price) {
                var formattedPrice = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(price);
                console.log('price is : ', formattedPrice);
                bot.setNickname("PRMS: $".concat(formattedPrice));
            }
        });
    }
}, 30000);
