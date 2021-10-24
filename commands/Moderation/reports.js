const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
module.exports = {
  name: "report",
  category: "moderation",
  usage: "report <@упоминание>",
  botPermission: ['MANAGE_GUILD','VIEW_CHANNEL'],
  run: async (client, message, args) => {
    const bot = client;
    let User = message.mentions.users.first() || null;

    if (User == null) {
      return message.channel.send(`Игрок не найден`);
    } else {
      let Reason = args.slice(1).join(" ")
      if (!Reason) {
        return message.channel.send(
          `Вы не указали причину!`
        );
      }
      let Avatar = User.displayAvatarURL();
      let Channel = await client.data.get(`reports_${message.guild.id}`);
      if (!Channel)
        return message.channel.send(
          `Канал не выбран.\nНастройте это для начала`
        );
      message.delete()
      client.send("Твой репорт был отправлен в канал <#"+Channel+"> Мы проверим его как можно скорее!", message,"dm")
      let Embed = new MessageEmbed()
        .setTitle(`Новый репорт`)
        .setDescription(
          `\`${message.author.tag}\` зарепортил \`${User.tag}\`! `
        )
        .setColor(`RED`)
        .setThumbnail(Avatar)
        .addFields(
          { name: "ID", value: `${message.author.id}`, inline: true },
          { name: "Тег", value: `${message.author.tag}`, inline: true },
          { name: "ID зарепорченого", value: `${User.id}`, inline: true },
          { name: "Тег", value: `${User.tag}`, inline: true },
          { name: "Причина", value: `\`${Reason}\``, inline: true },
          {
            name: "Дата",
            value: `${message.createdAt.toLocaleString()}`,
            inline: true
          }
        );
      const sender = client.channels.cache.get(Channel);

      sender.send(Embed);
    }
  }
};
