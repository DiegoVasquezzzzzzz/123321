const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ms = require("ms");
let { logchannel, punishmentschannel, admin, developer, developer1, owner } = require("../../config.js");
module.exports = {
  name: "tempban",
  aliases: ["tb", "tban"],
  category: "moderation",
  usage: "tempban <@упоминание> <время> <причина>",
  args: true,
  authorRoles: [`${admin}`,`${developer}`,`${developer1}`,`${owner}`],
  botPermission: ["BAN_MEMBERS"],
  run: async (client, message, args) => {
    try {
      const bot = client;
      if (!args[0])
        return message.channel.send("**Укажите пользователя для бана!**");

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
        return message.channel.send("**Пользователь не находится на этом сервере!**");
      if (banMember === message.member)
        return message.channel.send("**Ты не можешь забанить себя!**");
      const regex = args.splice(1).join(" ");

      var reason = args.slice(2).join(" ");

      if (!banMember.bannable)
        return message.channel.send("**Ты не можешь забанить этого пользователя**");
      try {
        message.guild.members.ban(banMember).then(() => {
          setTimeout(function() {
            message.guild.members.unban(banMember.id);
            message.channel.send(
              `<@${banMember.user.username}> был разблокирован после временного бана ${regex}`
            );
          }, ms(regex));
          return undefined;
        });
        banMember
          .send(
            `**Ты был заблокирован ${
              message.guild.name
            } Причина - ${reason || "Нет причины"}** - Время ${regex}`
          )
          .catch(() => null);
      } catch {
        message.guild.members.ban(banMember).then(() => {
          setTimeout(function() {
            message.guild.members.unban(banMember.id);
            message.channel.send(
              `<@${banMember.user.username}> был разблокирован после временного бана ${regex}`
            );
          }, ms(regex));
          return undefined;
        });
      }
      if (reason) {
        var sembed = new MessageEmbed()
          .setColor("0099ff")
          .setDescription(
            `**${banMember.user.username}** был заблокирован по причине - ${reason} - Время ${regex}`
          );
        message.channel.send(sembed);
      } else {
        var sembed2 = new MessageEmbed()
          .setColor("0099ff")
          .setDescription(
            `**${banMember.user.username}** был заблокирован - Время ${regex}`
          );
        message.channel.send(sembed2);
      }

      let channel = message.guild.channels.cache.get(logchannel)
      const embed = new MessageEmbed()
        .setAuthor(`LOGS`, message.guild.iconURL())
        .setColor("#0099ff")
        .setThumbnail(banMember.user.displayAvatarURL({ dynamic: true }))
        .setFooter(message.guild.name, message.guild.iconURL())
        .addField("**LOG TYPE**", "tempban")
        .addField("**Заблокирован**", banMember.user.username)
        .addField("**ID**", `${banMember.id}`)
        .addField("**Время (s)**", `${regex}`)
        .addField("**Модератор**", message.author.username)
        .addField("**Причина**", `${reason || "No Reason"}`)
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
        { name: '**Время**', value: `${regex}`, inline: true },
      )
      .setTimestamp();
      channel_punish.send(embednak)
    } catch (e) {
      return message.channel.send(`**${e.message}**`);
    }
  }
};
