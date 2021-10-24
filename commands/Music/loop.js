const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");

module.exports = {
  name: "loop",
  aliases: ["lp"],
  category: "music",
  description: "Зациклить музыку",
  usage: "Loop | <On Or Off>",
  run: async (client, message, args) => {
    
    const Channel = message.member.voice.channel;
    
    if (!Channel) return message.channel.send("Присоединитесь к голосовому каналу!");
    
    const Queue = await client.queue.get(message.guild.id);
    
    if (!Queue) return message.channel.send("Сейчас нет музыки в очереди!");
    
    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle("Loop статус")
    .setDescription(`🎶 Loop статус - ${Queue.Loop ? "On" : "Off"}`)
    .setTimestamp();
    
    if (!args[0]) return message.channel.send(Embed);
    
    const Settings = ["on", "off"];
    
    if (!Settings.find(Set => Set === args[0].toLowerCase())) return message.channel.send("Неверный ввод. Используйте - On , Off");
    
    const Status = Queue.Loop ? "on" : "off";
    
    args[0] = args[0].toLowerCase();
    
    if (args[0] === Status) return message.channel.send(`Already ${Queue.Loop ? "On" : "Off"}`);
    
    const Embeded = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle("Success")
    .setTimestamp();
    
    if (args[0] === "on") {
      Queue.Loop = true;
      Embeded.setDescription("🎶 Loop был включен!")
      return message.channel.send(Embeded).catch(() => message.channel.send("Loop был включен"))
    } else {
      Queue.Loop = false;
      Embeded.setDescription("🎶 Loop был выключен!");
      return message.channel.send(Embeded).catch(() => message.channel.send("Loop был выключен"));
    };
  }
};