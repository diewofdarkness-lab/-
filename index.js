const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel, VoiceConnectionStatus } = require('@discordjs/voice');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
  ]
});

const TOKEN = process.env.TOKEN;
const CHANNEL_IDS = process.env.CHANNEL_IDS.split(',');

client.once('ready', () => {
  console.log('บอทออนไลน์แล้ว!');
  CHANNEL_IDS.forEach(id => {
    const channel = client.channels.cache.get(id.trim());
    if (!channel) return;
    joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
      selfDeaf: true,
      selfMute: true,
    });
  });
});

client.login(TOKEN);
