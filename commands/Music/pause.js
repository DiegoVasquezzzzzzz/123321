const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "pause",
  aliases: ["wait"],
  category: "music",
  description: "Pause Music!",
  usage: "Pause",
  run: async (client, message, args) => {
    
    const Channel = message.member.voice.channel;
    
    if (!Channel) return message.channel.send("Присоединитесь к голосовому каналу!");
    
    const Queue = await client.queue.get(message.guild.id);
    
    if (!Queue) return message.channel.send("Сейчас нет музыки в очереди!");
   
    if (!Queue.Playing) return message.channel.send("🎶 Уже на паузе");
    
    Queue.Playing = false;
    Queue.Bot.dispatcher.pause();
    
    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle("Success")
    .setDescription("🎶 Музыка была поставлена на паузу!")
    .setTimestamp();
    
    return message.channel.send(Embed).catch(() => message.channel.send("🎶 Музыка была поставлена на паузу"));
  }
};