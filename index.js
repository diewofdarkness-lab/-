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

function joinChannels() {
  CHANNEL_IDS.forEach(id => {
    const channel = client.channels.cache.get(id.trim());
    if (!channel) {
      console.log('หาห้องไม่เจอ:', id);
      return;
    }
    joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
      selfDeaf: true,
      selfMute: true,
    });
    console.log('เข้าห้อง:', channel.name);
  });
}

client.once('ready', () => {
  console.log('บอทออนไลน์แล้ว!');
  setTimeout(joinChannels, 3000);
});

client.login(TOKEN);
