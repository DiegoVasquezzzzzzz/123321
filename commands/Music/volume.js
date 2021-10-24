const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");

module.exports = {
  name: "volume",
  aliases: ["vol"],
  category: "music",
  description: "Show Volume  & You Can Also Set Volume!",
  usage: "Volume | <1 - 150>",
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
      .setTitle("Громкость")
      .setDescription(`🎶 Громкость - ${Queue.Volume}`)
      .setTimestamp();

    if (!args[0]) return message.channel.send(Embed).catch(() => message.channel.send(`🎶 Громкость - ${Queue.Volume}`));

    if (args[0]) {
      if (isNaN(args[0]))
        return message.channel.send("Введите корректное число!");
      if (args[0] > 150) return message.channel.send("Лимит громкости: 150");
      if (parseInt(Queue.Volume) === parseInt(args[0]))
        return message.channel.send("Такая громкость уже установлена!");

      Queue.Volume = parseInt(args[0]);
      Queue.Bot.dispatcher.setVolumeLogarithmic(Queue.Volume / 100);
      
      const Embeded = new Discord.MessageEmbed()
      .setColor(Color)
      .setTitle("Успешно")
      .setDescription(`🎶 Громкость была изменена на - ${Queue.Volume}`)
      .setTimestamp();
      
      return message.channel.send(Embeded).catch(() => message.channel.send(`🎶 Громкость была изменена на - ${Queue.Volume}`));
    };
  }
};