const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
let { logchannel, admin, developer, developer1, owner, punishmentschannel } = require("../../config.js");
module.exports = {
  name: "unban",
  usage: "unban [имя | тэг | @упоминание | айди] <причина>",
  aliases: ["ub", "unban"],
  category: "moderation",
  botPermission: ["ADMINISTRATOR"],
  authorRoles: [`${admin}`,`${developer}`,`${developer1}`,`${owner}`],
  run: async (client, message, args) => {
    const bot = client;
    if (!args[0]) return message.channel.send("**Введите имя**");

    let bannedMemberInfo = await message.guild.fetchBans();

    let bannedMember;
    bannedMember =
      bannedMemberInfo.find(
        b => b.user.username.toLowerCase() === args[0].toLocaleLowerCase()
      ) ||
      bannedMemberInfo.get(args[0]) ||
      bannedMemberInfo.find(
        bm => bm.user.tag.toLowerCase() === args[0].toLocaleLowerCase()
      );
    if (!bannedMember)
      return message.channel.send(
        "**Введите корректное имя или этот пользователь не забанен.**"
      );

    let reason = args.slice(1).join(" ");

    if (!message.guild.me.hasPermission("BAN_MEMBERS"))
      return message.channel.send(
        "**У тебя нет прав чтобы разбанить! - [BAN_MEMBERS]**"
      );
    try {
      if (reason) {
        message.guild.members.unban(bannedMember.user.id, reason);
        var sembed = new MessageEmbed()
          .setColor("GREEN")
          .setDescription(
            `**${bannedMember.user.tag} был разбанен по причине ${reason}**`
          );
        message.channel.send(sembed);
      } else {
        message.guild.members.unban(bannedMember.user.id, reason);
        var sembed2 = new MessageEmbed()
          .setColor("GREEN")
          .setDescription(`**${bannedMember.user.tag} был разбанен**`);
        message.channel.send(sembed2);
      }
    } catch {}

    let channel = message.guild.channels.cache.get(logchannel)
    let embed = new MessageEmbed()
      .setColor("#0099ff")
      .setThumbnail(bannedMember.user.displayAvatarURL({ dynamic: true }))
      .setAuthor(`LOGS`, message.guild.iconURL())
      .addField("**LOG TYPE**", "unban")
      .addField("**Игрок**", `${bannedMember.user.username}`)
      .addField("**Айди**", `${bannedMember.user.id}`)
      .addField("**Модератор**", message.author.username)
      .addField("**Причина**", `${reason}` || "**Нет причины**")
      .addField("**Дата**", message.createdAt.toLocaleString())
      .setFooter(message.guild.name, message.guild.iconURL())
      .setTimestamp();

    channel.send(embed);
    let channel_punish = message.guild.channels.cache.get(punishmentschannel)
      const embednak = new MessageEmbed()
      .setColor("#0099ff")
      .setDescription(`Пользователь **<@!${bannedMember.user.id}>** был разблокирован\n`)
      .addFields(
        { name: '**Модератор**', value: `<@!${message.author.id}>`, inline: true },
        { name: '**Причина**', value: `${reason || "Нет причины"}`, inline: true },
      )
      .setTimestamp();
      channel_punish.send(embednak)
  }
};
