const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
let { logchannel, helper, moder, admin, developer, developer1, owner, punishmentschannel } = require("../../config.js");
module.exports = {
  name: "ban",
  aliases: ["b", "ban"],
  category: "moderation",
  usage: "ban <@user> <reason>",
  args: true,
  authorRoles: [`${admin}`,`${developer}`,`${developer1}`,`${owner}`],
  botPermission: ["BAN_MEMBERS"],
  run: async (client, message, args) => {
    try {
      const bot = client;
      if (!args[0])
        return message.channel.send("**Введите корректный тэг**");

      let banMember =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.find(
          r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
        ) ||
        message.guild.members.cache.find(
          ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()
        );
      if (!banMember)
        return message.channel.send("**Пользователь не находится на данном сервере**");
      if (banMember === message.member)
        return message.channel.send("**Ты не можешь заблокировать себя**");

      var reason = args.slice(1).join(" ");

      if (!banMember.bannable)
        return message.channel.send("**Ты не можешь его заблокировать**");
      try {
        message.guild.members.ban(banMember);
        banMember
          .send(
            `**Привет, ты был заблокирован на сервере ${
              message.guild.name
            } за - ${reason || "Нет причины"}**`
          )
          .catch(() => null);
      } catch {
        message.guild.members.ban(banMember);
      }
      if (reason) {
        var sembed = new MessageEmbed()
          .setColor("GREEN")
          .setDescription(
            `**${banMember.user.username}** был заблокирован. Причина - ${reason}`
          );
        message.channel.send(sembed);
      } else {
        var sembed2 = new MessageEmbed()
          .setColor("GREEN")
          .setDescription(`**${banMember.user.username}** был заблокирован`);
        message.channel.send(sembed2);
      }
     
      let channel = message.guild.channels.cache.get(logchannel)
      const embed = new MessageEmbed()
        .setAuthor(`LOGS`, message.guild.iconURL())
        .setColor("#0099ff")
        .setThumbnail(banMember.user.displayAvatarURL({ dynamic: true }))
        .setFooter(message.guild.name, message.guild.iconURL())
        .addField("**LOG TYPE**", "ban")
        .addField("**Заблокированный пользователь**", banMember.user.username)
        .addField("**ID**", `${banMember.id}`)
        .addField("**Модератор**", message.author.username)
        .addField("**Причина**", `${reason || "**No Reason**"}`)
        .addField("**Дата**", message.createdAt.toLocaleString())
        .setTimestamp();

      channel.send(embed);
      let channel_punish = message.guild.channels.cache.get(punishmentschannel)
      const embednak = new MessageEmbed()
      .setColor("#0099ff")
      .setDescription(`Пользователь **<@!${banMember.user.id}>** был временно заблокирован\n`)
      .addFields(
        { name: '**Модератор**', value: `<@!${message.author.id}>`, inline: true },
        { name: '**Причина**', value: `${reason || "Нет причины"}`, inline: true },
      )
      .setTimestamp();
      channel_punish.send(embednak)
    } catch (e) {
      return message.channel.send(`**${e.message}**`);
    }
  }
};
