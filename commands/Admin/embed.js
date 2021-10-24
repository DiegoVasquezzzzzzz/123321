const { MessageEmbed } = require("discord.js");
let { logchannel, helper, moder, admin, developer, developer1, owner } = require("../../config.js");
module.exports = {
  name: "embed",
  usage: "embed текст",
  aliases: ["add"],
  category: "admin",
  botPermission: ["ADMINISTRATOR"],
  authorRoles: [`${developer}`,`${developer1}`,`${owner}`],
  run: async (client, message, args) => {
    let messageAttachment = message.attachments.size > 0 ? message.attachments.array()[0].url : null
    if (!args[0]) {
      return message.channel.send(
        "Проверьте корректность ввода - **embed текст**"
      );
    }
    let channel = message.guild.channels.cache.get(logchannel)
    let saymsg = message.content
    let embed = new MessageEmbed()
      .setColor("#0099ff")
      .setAuthor(`LOGS`, message.guild.iconURL())
      .addField("**LOG TYPE**", "Embed")
      .addField("**Админ**", message.author.tag)
      .addField("**Текст**", `${saymsg.replace("!embed","")}`)
      .addField("**Дата**", message.createdAt.toLocaleString())

      .setTimestamp();
    channel.send(embed);
    if(!messageAttachment){
      let embed1 = new MessageEmbed()
      .setColor("#0099ff")
      .setAuthor(`Egor_Kurilo`, message.guild.iconURL())
      .setDescription(`${saymsg.replace("!embed","")}`)
      message.channel.send(embed1);
    }else{
      let embed1 = new MessageEmbed()
      .setColor("#0099ff")
      .setAuthor(`Egor_Kurilo`, message.guild.iconURL())
      .setDescription(`${saymsg.replace("!embed","")}`)
      .setImage(messageAttachment)
      message.channel.send(embed1);
    }   
  }
};
