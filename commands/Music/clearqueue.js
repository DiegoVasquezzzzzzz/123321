const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "clearqueue",
  aliases: ["cq"],
  category: "music",
  description: "Clear The Music Queue!",
  usage: "Clearqueue",
  run: async (client, message, args) => {
    
    const Channel = message.member.voice.channel;
    
    if (!Channel) return message.channel.send("Присоединитесь к голосовому каналу!");
    
    const Queue = await client.queue.get(message.guild.id);
    
    if (!Queue) return message.channel.send("Сейчас нет музыки в очереди!");
       
    Queue.Songs = [];
    await Queue.Bot.dispatcher.end();
    
    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle("Success")
    .setDescription("🎶 Музыкальная очередь была очищена!")
    .setTimestamp();
    
    return message.channel.send(Embed).catch(() => message.channel.send("🎶 Музыкальная очередь была очищена!"));
  }
};