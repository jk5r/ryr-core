require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

const qotds = [
    "What is your dream vacation destination?",
    "If you could fly any aircraft, which would it be?",
    "What's your favorite airline?",
    "Window or aisle seat?",
    "Best airport you've ever been to?"
];

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const prefix = "!";
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).split(" ");
    const command = args.shift().toLowerCase();

    if (command === "qotd") {
        const randomQ = qotds[Math.floor(Math.random() * qotds.length)];

        const embed = new EmbedBuilder()
            .setTitle("📢 Question of the Day")
            .setDescription(randomQ)
            .setColor(0x00AEFF)
            .setFooter({ text: `Requested by ${message.author.username}` })
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    }

    if (command === "flightopen") {
        const flightNumber = args[0] || "XXXX";

        const embed = new EmbedBuilder()
            .setTitle("✈️ Flight Server Open")
            .setDescription(
                `The server for flight **${flightNumber}** has opened.\n\nBoarding will begin in **10 minutes**, when the server will close.`
            )
            .setColor(0x00FF00)
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    }

    if (command === "boarding") {
        const flightNumber = args[0] || "XXXX";

        const embed = new EmbedBuilder()
            .setTitle("🛫 Boarding Started")
            .setDescription(
                `Boarding has begun for flight **${flightNumber}**.\nThe server is now locked.`
            )
            .setColor(0xFFAA00)
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    }
});

client.login(process.env.TOKEN);
