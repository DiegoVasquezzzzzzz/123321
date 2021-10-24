const Discord = require("discord.js");
const db = require("quick.db");
const canvacord = require('canvacord')
const { MessageEmbed } = require("discord.js");
const Levels = require("discord-xp");

module.exports = {
    name: "stats",
    aliases: ["profile"],
    category: "utility",
    usage: "stats",
    cooldown: 5,
run: async (client, message, args) => {
    let member = message.guild.member(message.mentions.users.first() || message.author)
    let data = await User.findOne({ guildID: message.guild.id, userID: member.user.id })

    if(!data) return message.channel.send(`К сожалению **${message.author.username}** отсутствует в БД`)

    const userData = await Levels.fetch(message.author.id, message.guild.id)
    const requiredXP = (userData.level +1) * (userData.level +1) * 100 
    const rank = new canvacord.Rank()
    .setAvatar(message.author.displayAvatarURL({format: "png", size: 1024}))
    .setProgressBar("#0099ff", "COLOR")
    .setBackground("IMAGE", "https://cdn.glitch.com/753fec14-a025-4287-8027-dd1351fcd7eb%2F1619175093_4-phonoteka_org-p-chyornii-fon-na-ves-ekran-6.jpg?v=1633181472255")
    .setCurrentXP(userData.xp)
    .setLevel(userData.level)
    .setRequiredXP(requiredXP)
    .setUsername(message.author.username)
    .setDiscriminator(message.author.discriminator)
    const img = await rank.build()
    const attachment = new Discord.MessageAttachment(img,`RankCard.png`);
    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle(`Статистика ${message.author.username}\n\n`)
      .setImage(`attachment://RankCard.png`)
      .addFields(
        { name: '**Ваш уровень**', value: `${userData.level}`, inline: true },
        { name: '**Ваш опыт**', value: `${userData.xp}`, inline: true },
        { name: '**Нужно опыта до след. уровня**', value: `${requiredXP}`, inline: true },
      )
      .addFields(
        { name: '**Баланс**', value: `${data.money}`, inline: true },
        { name: '**Кол-во рефералов**', value: `${data.ref}`, inline: true },
        { name: '**Варны**', value: `${data.warn}`, inline: true },
      )
      .attachFiles(attachment);
    message.channel.send(embed);
}
  };