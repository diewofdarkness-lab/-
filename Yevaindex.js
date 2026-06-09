const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel, VoiceConnectionStatus } = require('@discordjs/voice');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
  ]
});

const TOKEN = process.env.TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

client.once('ready', () => {
  console.log('บอทออนไลน์แล้ว!');
  const channel = client.channels.cache.get(CHANNEL_ID);
  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
    selfDeaf: true,
    selfMute: true,
  });
  connection.on(VoiceConnectionStatus.Disconnected, () => {
    setTimeout(() => {
      const ch = client.channels.cache.get(CHANNEL_ID);
      joinVoiceChannel({
        channelId: ch.id,
        guildId: ch.guild.id,
        adapterCreator: ch.guild.voiceAdapterCreator,
        selfDeaf: true,
        selfMute: true,
      });
    }, 5000);
  });
});

client.login(TOKEN);
