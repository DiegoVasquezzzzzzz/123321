const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "pay",
    aliases: ["!p"],
    category: "utility",
    usage: "pay",
    cooldown: 5,
run: async (client, message, args) => {
    let member = message.guild.member(message.mentions.users.first())
    if(!member) return message.reply(`Пользователь не был найден.`)
    if(!args[1]) return message.reply(`Укажите количество коинов которых хотите передать.`)
    if(args[1] < 1) return message.reply(`Нельзя передать такое количество коинов`)
    if(isNaN(args[1])) return message.reply(`Укажите корректное значение.`)

    let author = await User.findOne({ guildID: message.guild.id, userID: message.author.id });
    let loc = await User.findOne({ guildID: message.guild.id, userID: member.id });
    if(!loc) return
    if(author.money < args[1]) return message.reply(`У вас нету такого количества монет.`)
    if(author.userID == member.id) return message.reply(`Вы не можете передать монеты самому себе!`)
    if(member.user.bot) return message.reply(`Вы не можете передавать монеты ботам.`)

    let embed = new MessageEmbed()
    .setColor("#0099ff")
    .setDescription(`Вы успешно передали пользователю **${member.user.username}** коины в количестве ${args[1]}шт`)
    author.money -= Math.floor(parseInt(args[1]));
    loc.money += Math.floor(parseInt(args[1]));
    author.save(); loc.save()
    message.channel.send(embed)
    }
};