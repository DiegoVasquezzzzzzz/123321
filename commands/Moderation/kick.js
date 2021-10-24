const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
let { logchannel, helper, moder, admin, developer, developer1, owner, punishmentschannel } = require("../../config.js");
module.exports = {
  name: "kick",
  category: "moderation",
  usage: "kick <@user> <reason>",
  authorRoles: [`${helper}`, `${moder}`,`${admin}`,`${developer}`,`${developer1}`,`${owner}`],
  botPermission: ["KICK_MEMBERS"],
  args: true,
  run: async(client, message, args) => {
    try {
      const bot = client;
      if (!args[0]) return message.channel.send("**Введите корректный тег**");

      var kickMember =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.find(
          r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
        ) ||
        message.guild.members.cache.find(
          ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()
        );
      if (!kickMember)
        return message.channel.send("**Пользователь не находится на данном сервере**");

      if (kickMember.id === message.member.id)
        return message.channel.send("**Ты не можешь кикнуть себя**");

      if (!kickMember.kickable)
        return message.channel.send("**Ты не можешь кикнуть этого игрока**");
      if (kickMember.user.bot)
        return message.channel.send("*Ты не можешь кикнуть бота**");

      var reason = args.slice(1).join(" ") || "Нет причины";
      try {
        const sembed2 = new MessageEmbed()
          .setColor("#0099ff")
          .setDescription(
            `**Ты был кикнут с ${message.guild.name} Причина - ${reason ||
              "Нет причины"}**`
          )
          .setFooter(message.guild.name, message.guild.iconURL());
        kickMember
          .send(sembed2)
          .then(() => kickMember.kick())
          .catch(() => null);
      } catch {
        kickMember.kick();
      }
      if (reason) {
        var sembed = new MessageEmbed()
          .setColor("#0099ff")
          .setDescription(
            `**${kickMember.user.username}** был кикнут. Причина- ${reason}`
          );
        message.channel.send(sembed);
      } else {
        var sembed2 = new MessageEmbed()
          .setColor("GREEN")
          .setDescription(`**${kickMember.user.username}** был кикнут`);
        message.channel.send(sembed2);
      }
      let channel = message.guild.channels.cache.get(logchannel)
      const embed = new MessageEmbed()
        .setAuthor(`LOGS`, message.guild.iconURL())
        .setColor("#0099ff")
        .setThumbnail(kickMember.user.displayAvatarURL({ dynamic: true }))
        .setFooter(message.guild.name, message.guild.iconURL())
        .addField("**LOG TYPE**", "kick")
        .addField("**Исключенный пользователь**", kickMember.user.username)
        .addField("**Модератор**", message.author.username)
        .addField("**Причина**", `${reason || "**Нет причины**"}`)
        .addField("**Дата**", message.createdAt.toLocaleString())
        .setTimestamp();

      channel.send(embed);
      let channel_punish = message.guild.channels.cache.get(punishmentschannel)
      const embednak = new MessageEmbed()
      .setColor("#0099ff")
      .setDescription(`Пользователь **<@!${kickMember.user.id}>** был временно заблокирован\n`)
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
