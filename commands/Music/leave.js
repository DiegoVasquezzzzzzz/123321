const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("wio.db");

module.exports = {
  name: "leave",
  aliases: ["goaway", "disconnect"],
  category: "music",
  description: "Leave The Voice Channel!",
  usage: "Leave",
  run: async (client, message, args) => {
    
    const Channel = message.member.voice.channel;
    
    if (!Channel) return message.channel.send("Присоединитесь к голосовому каналу!");
    
    if (!message.guild.me.voice) return message.channel.send("Я сейчас не нахожусь в голосом канале!");
    
    try {
    
    await Channel.leave();
      
    } catch (error) {
      await  Channel.leave();
      return message.channel.send("Пытаюсь отключиться...");
    };
    
    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle("Success")
    .setDescription("🎶 Вышел из голсоового канала")
    .setTimestamp();
    
    return message.channel.send(Embed).catch(() => message.channel.send("🎶 Вышел из голсоового канала"));
  }
};