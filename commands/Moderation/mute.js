const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ms = require("ms");
let { logchannel, helper, moder, admin, developer, developer1, owner, punishmentschannel } = require("../../config.js");

module.exports = {
  name: "mute",
  category: "moderation",
  args: true,
  usage: "mute <@упоминание> <время> <причина>",
  authorRoles: [`${helper}`, `${moder}`,`${admin}`,`${developer}`,`${developer1}`,`${owner}`],
  botPermission: ["MANAGE_ROLES", "MANAGE_GUILD"],
  run: async (client, message, args) => {
    try {
      var mutee =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.find(
          r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
        ) ||
        message.guild.members.cache.find(
          ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()
        );
      if (!mutee)
        return message.channel.send(
          "**Введите корректное имя пользователя!**"
        );
      if (mutee === message.member)
        return message.channel.send("**Ты не можешь замутить себя!**");
      if (
        mutee.roles.highest.comparePositionTo(message.guild.me.roles.highest) >=
        0
      )
        return message.channel.send("**Ты не можешь его замутить!**");

      let reason = args.slice(2).join(" ");
      if (mutee.user.bot) return message.channel.send("**Ты не можешь мутить ботов!**");
      const userRoles = mutee.roles.cache
        .filter(r => r.id !== message.guild.id)
        .map(r => r.id);

      let muterole = message.guild.roles.cache.find(r => r.name === "Muted");

      if (!muterole) {
        try {
          muterole = await message.guild.roles.create({
            data: {
              name: "Muted",
              color: "#514f48",
              permissions: []
            }
          });
      message.guild.channels.cache.forEach(async channel => {
            await channel.createOverwrite(muterole, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false,
              SPEAK: false,
              CONNECT: false
            });
          });
        } catch (e) {
          console.log(e);
        }
      }

      if (mutee.roles.cache.has(muterole.id))
        return message.channel.send("**Игрок уже замучен!**");
        const time = args[1];
        if (!time) {
          return message.channel.send(
            "Укажите время мута!"
          );
        }
      client.data.set(`muteeid_${message.guild.id}_${mutee.id}`, userRoles);
        mutee.roles.add([muterole.id])
      if (reason) {
        const sembed = new MessageEmbed()
          .setColor("#0099ff")
          .setAuthor(message.guild.name, message.guild.iconURL())
          .setDescription(
            `${mutee.user.username} успешно замучен. Причина: ${reason}`
          );
        message.channel.send(sembed);
      } else {
        const sembed2 = new MessageEmbed()
          .setColor("#0099ff")
          .setDescription(`${mutee.user.username} успешно замучен`);
        message.channel.send(sembed2);
      }
      let channel = message.guild.channels.cache.get(logchannel)
      let channel_punish = message.guild.channels.cache.get(punishmentschannel)
      let embed = new MessageEmbed()
        .setColor("#0099ff")
        .setThumbnail(mutee.user.displayAvatarURL({ dynamic: true }))
        .setAuthor(`LOGS`, message.guild.iconURL())
        .addField("**LOG TYPE**", "**Mute**")
        .addField("**Игрок**", mutee.user.username)
        .addField("**Модератор**", message.author.username)
        .addField("**Причина**", `${reason || "**No Reason**"}`)
        .addField("**Время**", time, true)
        .addField("**Дата**", message.createdAt.toLocaleString())
        .setFooter(
          message.member.displayName,
          message.author.displayAvatarURL()
        )
        .setTimestamp();
        channel.send(embed);
        mutee.roles.add(muterole.id)
        setTimeout(function () {
          mutee.roles.remove(muterole.id);
        }, ms(time));

      const embednak = new MessageEmbed()
      .setColor("#0099ff")
      .setDescription(`Пользователь **<@!${mutee.user.id}>** был замучен\n`)
      .addFields(
        { name: '**Модератор**', value: `<@!${message.author.id}>`, inline: true },
        { name: '**Причина**', value: `${reason || "Нет причины"}`, inline: true },
        { name: '**Время**', value: `${time}`, inline: true },
      )
      .setTimestamp();
      channel_punish.send(embednak)
    } catch {
      return;
    }
  }
};
