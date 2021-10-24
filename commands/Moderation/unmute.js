const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
let { logchannel, helper, moder, admin, developer, developer1, owner, punishmentschannel } = require("../../config.js");
module.exports = {
  name: "unmute",
  category: "moderation",
  args: true,
  usage: "unmute <@упоминание>",
  botPermission: ["MANAGE_GUILD"],
  authorRoles: [`${helper}`, `${moder}`,`${admin}`,`${developer}`,`${developer1}`,`${owner}`],
  run: async (client, message, args) => {
    let mutee =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()
      );
    if (!mutee) return message.channel.send("**Введите корректный тег**");

    let reason = args.slice(1).join(" ");

    let muterole;
    let muteerole = message.guild.roles.cache.find(r => r.name === "Muted");

    muterole = muteerole;

    if (!muterole)
      return message.channel.send("**Это не является ролью для мута**");
    if (!mutee.roles.cache.has(muterole.id))
      return message.channel.send("**Игрок не находится в муте**");
    try {
      mutee.roles.remove(muterole.id).then(() => {
        mutee
          .send(
            `**Ты был размучен ${
              message.guild.name
            } Причина -  ${reason || "Нет причины"}**`
          )
          .catch(() => null);
      });
    } catch {
    }
    const sembed = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`${mutee.user.username} был успешно размучен.`);
    message.channel.send(sembed);
    let channel = message.guild.channels.cache.get(logchannel)
    let embed = new MessageEmbed()
      .setColor("#0099ff")
      .setThumbnail(mutee.user.displayAvatarURL({ dynamic: true }))
      .setAuthor(`LOGS`, message.guild.iconURL())
      .addField("**Moderation**", "unmute")
      .addField("**Пользователь**", mutee.user.username)
      .addField("**Модератор**", message.author.username)
      .addField("**Причина**", `${reason || "**No Reason**"}`)
      .addField("**Дата**", message.createdAt.toLocaleString())
      .setFooter(message.member.displayName, message.author.displayAvatarURL())
      .setTimestamp();
    channel.send(embed);
    let channel_punish = message.guild.channels.cache.get(punishmentschannel)
      const embednak = new MessageEmbed()
      .setColor("#0099ff")
      .setDescription(`Пользователь **<@!${mutee.user.id}>** был размучен\n`)
      .addFields(
        { name: '**Модератор**', value: `<@!${message.author.id}>`, inline: true },
        { name: '**Причина**', value: `${reason || "Нет причины"}`, inline: true },
      )
      .setTimestamp();
      channel_punish.send(embednak)
  }
};
