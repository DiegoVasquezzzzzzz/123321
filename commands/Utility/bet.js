const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const { default_prefix } = require('../../config');

module.exports = {
   
        name: "bet",
        aliases: ["b"],
        category: "economy",
run: async (bot, message, args) => {
    let member = message.guild.member(message.mentions.users.first() || message.author)
    let data = await User.findOne({ guildID: message.guild.id, userID: member.user.id })

    if(!data) return message.channel.send(`❌ К сожалению **${message.author.username}** отсутствует в БД`)
        let prefix = "!"
        let fetched = await db.fetch(`prefix_${message.guild.id}`);

        if (fetched === null) {
            fetched = prefix
        } else {
            prefix = fetched
        }
      
        let user = message.author;

        function isOdd(num) {
            if ((num % 2) == 0) return false;
            else if ((num % 2) == 1) return true;
        }

        let money = parseInt(args[0]);
        let moneydb = data.money

        let random = Math.floor((Math.random() * 10));

        let moneyhelp = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`❌ Необходимо указать сумму | ${prefix}bet <сумма>`);

        let moneymore = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`❌ У тебя не хватает коинов для такой ставки!`);

        if (!money) return message.channel.send(moneyhelp);
        if (money > moneydb) return message.channel.send(moneymore);

        let colour = Math.floor((Math.random() * 3))

        if (random == 1 && colour == 2) { // Green
            money *= 3
            data.money += money;data.save()
            let moneyEmbed1 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Ты выиграл ${money} коинов\n\nМножитель: 3x`);
            message.channel.send(moneyEmbed1)
        } else if (isOdd(random) && colour == 1) { // Red
            money = parseInt(money * 1.5)
            data.money += money;data.save()
            let moneyEmbed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`🔴 Ты выиграл ${money} коинов\n\nМножитель: 1.5x`);
            message.channel.send(moneyEmbed2)
        } else if (!isOdd(random) && colour == 0) { // Black
            money = parseInt(money * 2)
            data.money += money;data.save()
            let moneyEmbed3 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`⬛ Ты выиграл ${money} коинов\n\nМножитель: 2x`);
            message.channel.send(moneyEmbed3)
        } else { // Wrong
            data.money -= money;data.save()
            let moneyEmbed4 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Ты проиграл ${money} коинов\n\nМножитель: 0x`);
            message.channel.send(moneyEmbed4)
        }
    }
}