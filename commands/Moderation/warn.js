const { MessageEmbed } = require("discord.js");
let { logchannel, moder, admin, developer, developer1, owner, punishmentschannel } = require("../../config.js");
module.exports = {
  name: "warn",
  category: "moderation",
  usage: "warn <@упоминание> <причина>",
  args: true,
  botPermission: ["ADMINISTRATOR"],
  authorRoles: [`${moder}`,`${admin}`,`${developer}`,`${developer1}`,`${owner}`],
  run: async (client, message, args) => {
    const user = message.mentions.members.first();
    let member = message.guild.member(message.mentions.users.first() || message.author)
    let data = await User.findOne({ guildID: message.guild.id, userID: member.user.id });
    if (!user) {
      return message.channel.send(
        "Упомяни человека которому ты хочешь выдать предупреждение - warn @упоминание <причина>"
      );
    }

    if (message.mentions.users.first().bot) {
      return message.channel.send("Ты не можешь варнить ботов");
    }

    if (message.author.id === user.id) {
      return message.channel.send("Ты не можешь выдать предупреждение себе");
    }

    if (user.id === client.users.cache.find(u => u.id == '336834449696096256')) {
      return message.channel.send(
        "Ты не можешь выдать предупреждение владельцу сервера."
      );
    }

    const reason = args.slice(1).join(" ");

    if (!reason) {
      return message.channel.send(
        "Проверьте корректность ввода - warn @упоминание <причина>"
      );
    }
    data.warn += 1; data.save();
    let channel = message.guild.channels.cache.get(logchannel)
    let emb = new MessageEmbed()
    .setDescription(`Вы успешно выдали предупреждение пользователю **${member.user.username}**`)
    .setColor("#0099ff")
    message.channel.send(emb)
    let embed = new MessageEmbed()
      .setColor("#0099ff")
      .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
      .setAuthor(`LOGS`, message.guild.iconURL())
      .addField("**LOG TYPE**", "Warn")
      .addField("**Предупрежденный пользователь**", user.user.username)
      .addField("**Модератор**", message.author.username)
      .addField("**Причина**", `${reason || "**Нет причины**"}`)
      .addField("**Дата**", message.createdAt.toLocaleString())
      .setFooter(message.member.displayName, message.author.displayAvatarURL())
      .setTimestamp();
    channel.send(embed);
    let channel_punish = message.guild.channels.cache.get(punishmentschannel)
      const embednak = new MessageEmbed()
      .setColor("#0099ff")
      .setDescription(`Пользователь **<@!${user.user.id}>** был предупрежден\n`)
      .addFields(
        { name: '**Модератор**', value: `<@!${message.author.id}>`, inline: true },
        { name: '**Причина**', value: `${reason || "Нет причины"}`, inline: true },
      )
      .setTimestamp();
      channel_punish.send(embednak)
  }
};
