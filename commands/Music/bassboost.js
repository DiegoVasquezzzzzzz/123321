const { Default_Prefix, Color } = require("../../config.js");
const { Player } = require("../../Functions.js")
const Discord = require("discord.js"), Ytdl = require("discord-ytdl-core"), db = require("quick.db");

module.exports = {
  name: "bassboost",
  aliases: ["bb"],
  category: "music",
  description: "Enable Or Disable Bassboost!",
  usage: "Bassboost",
  run: async (client, message, args) => {
    const Channel = message.member.voice.channel;

    if (!Channel) return message.channel.send("Присоединитесь к голосовому каналу!");

    const Queue = await client.queue.get(message.guild.id);

    if (!Queue)
      return message.channel.send(
        "Сейчас нет музыки в очереди!"
      );

    const Embed = new Discord.MessageEmbed()
      .setColor(Color)
      .setTitle("Success")
      .setDescription(`🎶 Bassboost был ${Queue.Filters["bassboost"] ? "выключен" : "включен"}`)
      .setTimestamp();
    
    Queue.Filters["bassboost"] = Queue.Filters["bassboost"] ? false : true;
    
    await Player(message, Discord, client, Ytdl, { Filter: true, Play: Queue.Songs[0], Color: Color, db: db });

    return message.channel.send(Embed).catch(() => message.channel.send(`🎶 Bassboost был ${Queue.Filters["bassboost"] ? "выключен" : "включен"}`));
    
  }
};