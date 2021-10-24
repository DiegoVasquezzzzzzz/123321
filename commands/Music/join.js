const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("wio.db");

module.exports = {
  name: "join",
  aliases: ["come"],
  category: "music",
  description: "Join The Voice Channel!",
  usage: "Join",
  run: async (client, message, args) => {
    
    const Channel = message.member.voice.channel;
    
    if (!Channel) return message.channel.send("Присоединитесь к голосовому каналу!");
    
    if (!Channel.joinable) return message.channel.send("Я не могу присоединиться к голосовому каналу!");
    
    await Channel.join().catch(() => {
      return message.channel.send("Не удается присоединиться к голосовому каналу!");
    });
    
    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle("Success")
    .setDescription("🎶 Я присоединился к голосовому каналу, используй Play чтобы включить музыку!")
    .setTimestamp();
    
    return message.channel.send(Embed).catch(() => message.channel.send("🎶 Я присоединился к голосовому каналу, используй Play чтобы включить музыку!"));
  }
};