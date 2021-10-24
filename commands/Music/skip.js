const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "skip",
  aliases: [],
  category: "music",
  description: "Skip Currently Playing Song!",
  usage: "Skip",
  run: async (client, message, args) => {
    
    const Channel = message.member.voice.channel;
    
    if (!Channel) return message.channel.send("Присоединитесь к голосовому каналу!");
    
    const Queue = await client.queue.get(message.guild.id);
    
    if (!Queue) return message.channel.send("Сейчас нет музыки в очереди");
    
    if (!Queue.Playing) Queue.Playing = true;
    
    Queue.Bot.dispatcher.end();
    
    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle("Успешно")
    .setDescription("🎶 Музыка была пропущена!")
    .setTimestamp();
    
    return message.channel.send(Embed).catch(() => message.channel.send("🎶 Музыка была пропущена!"));
  }
};