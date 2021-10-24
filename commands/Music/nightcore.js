const { Default_Prefix, Color } = require("../../config.js");
const { Player } = require("../../Functions.js")
const Discord = require("discord.js"), Ytdl = require("discord-ytdl-core"), db = require("quick.db");

module.exports = {
  name: "nightcore",
  aliases: [],
  category: "music",
  description: "Включение и отключение Nightcore!",
  usage: "Nightcore",
  run: async (client, message, args) => {
    const Channel = message.member.voice.channel;

    if (!Channel) return message.channel.send("Присоединитесь к голосовому каналу!");

    const Queue = await client.queue.get(message.guild.id);

    if (!Queue)
      return message.channel.send(
        "Сейчас ничего не играет"
      );

    const Embed = new Discord.MessageEmbed()
      .setColor(Color)
      .setTitle("Success")
      .setDescription(`🎶 Nightcore был ${Queue.Filters["nightcore"] ? "Выключен" : "Включен"}`)
      .setTimestamp();
    
    Queue.Filters["nightcore"] = Queue.Filters["nightcore"] ? false : true;
    
    await Player(message, Discord, client, Ytdl, { Filter: true, Play: Queue.Songs[0], Color: Color }, db);

    return message.channel.send(Embed).catch(() => message.channel.send(`🎶 Nightcore был ${Queue.Filters["nightcore"] ? "Выключен" : "Включен"}`));
    
  }
};