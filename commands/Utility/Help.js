const Discord = require("discord.js");
const { Message, MessageEmbed } = require("discord.js");
const ms = require("ms");
const db = require("quick.db");
const { readdirSync } = require("fs");
const category = new Discord.Collection();
// category.set("misc", "**Misc Commands**");
// category.set("utility", "**Utility Commands**");
// category.set("moderation", "**Moderation Commands**");
// category.set("settings", "**Settings Commands**");
// category.set("ticket", "**Ticket Commands**");
// category.set("anti-swear", "**ReactionRoles Commands**");
// category.set("admin", "**Admin Commands**");
// category.set("music", "**Music Commands For Member**");
// category.set("search", "**Search Commands**");
module.exports = {
  name: "help",
  description:
    "Команды",
  category: "utility",
  usage: "help",
  cooldown: 5,
  run: async (client, message, args) => {
    /**
     * @returns {Promise<Message|boolean>}
     * @param {Client} client
     * @param {Message} message
     * @param {Array<string>} args
     */
    const prefix = await client.data.get(`Prefix_${message.guild.id}`);
    message.delete().catch(O_o => {}); // eslint-disable-line
    let database = await client.data.get(`cmd_${message.guild.id}`);
    const cc = args[0];

    const name = args[0];
    const command =
      client.commands.get(name) ||
      client.commands.find(c => c.aliases && c.aliases.includes(name));
    if (!command) {
    }
    if(args[0] == "music"){
      let embedd = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setTitle("Справка по музыкальным командам")
      .addField("!bassboost", "Включает усиление басов")
      .addField("!clearqueue", "Очищает очередь.")
      .addField("!join", "Присоединение бота к вашему голосовому каналу.")
      .addField("!leave", "Кикнуть бота из вашего голосового канала.")
      .addField("!loop", "Зацикливает текущий трек.")
      .addField("!nightcore", "Включает режим NightCore.")
      .addField("!nowplaying", "Показ того, что сейчас играет.")
      .addField("!pause", "Поставить трек на паузу.")
      .addField("!play [ссылка]", "Включает трек по ссылке.")
      .addField("!queue", "Показывает текущую очередь.")
      .addField("!search [название]", "Ищет трек по названию.")
      .addField(`!skip`,"Пропускает текущий трек.")
      .addField("!stop", "Останавливает очередь.")
      .addField("!volume [громкость]", "Устанавливает громкость музыки [макс. 150].").setTimestamp();
      return message.channel.send(embedd);
    }
    if(args[0] == "moder"){
      let embedd = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setTitle("Справка по музыкальным командам")
      .addField("!bassboost", "Включает усиление басов")
      .addField("!clearqueue", "Очищает очередь.")
      .addField("!join", "Присоединение бота к вашему голосовому каналу.")
      .addField("!leave", "Кикнуть бота из вашего голосового канала.")
      .addField("!loop", "Зацикливает текущий трек.")
      .addField("!nightcore", "Включает режим NightCore.")
      .addField("!nowplaying", "Показ того, что сейчас играет.")
      .addField("!pause", "Поставить трек на паузу.")
      .addField("!play [ссылка]", "Включает трек по ссылке.")
      .addField("!queue", "Показывает текущую очередь.")
      .addField("!search [название]", "Ищет трек по названию.")
      .addField(`!skip`,"Пропускает текущий трек.")
      .addField("!stop", "Останавливает очередь.")
      .addField("!volume [громкость]", "Устанавливает громкость музыки [макс. 150].").setTimestamp();
      return message.channel.send(embedd);
    }
    let em = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setTitle("Справка по командам")
      .setDescription("Ваши команды: ")
      .addField("!rep [+/-] [User] [Reason]", "Повышает/понижает репутацию человеку. Все пункты указывать обязательно!")
      .addField("!stats", "Ваша статистика.")
      .addField("!pay [User] [Coins]", "Перевод денег. Все пункты являются обязательными!")
      .addField("!ava [User]", "Посмотреть аватарку пользователя")
      //.addField("!toplvl", "Посмотреть у кого самый высокий уровень")
     // .addField("!topmoney ", "Посмотреть у самого богатого пользователя")
      //.addField("!referrer [Member]указать вашего реферрера", "")
     // .addField("!bet [Amount(Кол-во фишек)]", "сыграть в кости")
      //.addField("!buychips [Amount(Кол-во фишек)]", "купить фишки для казино")
     // .addField("!sellchips [Amount(Кол-во фишек)]", "обменять фишки на Coins")
      .addField("!invite", "Посмотреть ссылку-приглашение на сервер Discord'а")
      .addField(`**Нашли баг? Сообщите нам в канал #deleted-channel и получите вознаграждение!**\n`)
      .addField("Команды модераторов:", "!help moder")
      .addField("Музыка:", "!help music").setTimestamp();
  //\n\`\`\`xl\n${prefix || "!"}help [Category]\n\`\`\`
const site = new client.button.MessageButton()
.setStyle("green")
.setLabel("Сайт")
.setURL("https://smartrp.by/");
const vk = new client.button.MessageButton()
.setStyle("green")
.setLabel("Группа ВКонтакте")
.setURL("https://vk.com/smartrp_russia");
   
    return client.button.send(null, {
      channel: message.channel.id,
      embed: em,
      buttons: [[vk, site]]
    });

  }
};