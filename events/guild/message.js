
let Discord = require("discord.js");
let MessageEmbed = Discord.MessageEmbed;
const { def_prefix } = require("../../config.js")
const format = require(`humanize-duration`);
const ms = require("pretty-ms");
const cooldowns = new Discord.Collection();
let Prefix = def_prefix
module.exports = async client => {
  client.on("message", async message => {
    if (message.author.bot || !message.guild || message.webhookID) return;
    const escapeRegex = str =>
      str.replace(/[.<>`•√π÷×¶∆£¢€¥*@_+?^${}()|[\]\\]/g, "\\$&");
    const prefixRegex = new RegExp(
      `^(<@!?${client.user.id}>|${escapeRegex(Prefix)})\\s*`
    );
    if (!prefixRegex.test(message.content)) return;
    const [, matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content
      .slice(matchedPrefix.length)
      .trim()
      .split(/ +/);
    let cmd = args.shift().toLowerCase();

    let cmdx = await client.data.get(`cmd_${message.guild.id}`);
    if (cmdx) {
      let cmdy = cmdx.find(x => x.name === cmd);
      if (cmdy) message.channel.send(cmdy.responce);
    }

    let command =
      client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if (!command) return;
    if (command)
      console.log(
        `Пользователь ${message.author.username} [${message.guild.name}] использовал команду ${cmd}`
      );
      if(command.authorRoles){
        let neededRoles = [];
        let dostup = 0
        for (const x of command.authorRoles){
                if(message.member.roles.cache.has(x)){dostup = 1}
            else{
              neededRoles.push("<@&" + x + ">");
            }
          }
        if (dostup != 1)
          return message.channel.send(
            new MessageEmbed()
              .setColor("#0099ff")
              .setTimestamp()
              .setDescription(
                `У тебя нет прав чтобы использовать эту команду.\nЭта команда требует одну из следующих ролей: ${neededRoles.join(", ")}`
            )
          );
      }
    if (command.args && !args.length) {
      return message.channel.send(
        new MessageEmbed()
          .setColor("#0099ff")
          .setTimestamp()
          .setDescription(
            `Вы не указали нужные аргументы, ${
              message.author
            }!\nПроверьте написание: \n\`\`\`html\n${command.usage ||
              "Нет примера"}\n\`\`\``
          )
      );
    }
   
    //-------------------------------------------- P E R M I S S I O N -------------------------------------------
    if (command.botPermission) {
      let neededPerms = [];
      command.botPermission.forEach(p => {
        if (!message.guild.me.hasPermission(p)) neededPerms.push("`" + p + "`");
      });
      if (neededPerms.length)
        return message.channel.send(
          new MessageEmbed()
            .setColor("#0099ff")
            .setTimestamp()
            .setDescription(
              `Мне нужно ${neededPerms.join(
                ", "
              )} право(-а) чтобы выполнить эту команду!`
            )
        );
    }

    //-------------------------------------------- C O O L  D O W N S -------------------------------------------
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
    }
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;
    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.channel.send(
          new MessageEmbed()
            .setColor("#0099ff")
            .setTimestamp()
            .setDescription(
              `Пожалуйста подождите **${ms(
                timeLeft
              )}** прежде чем использовать эту команду снова.`
            )
        );
      }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    if (command) {
      try {
        command.run(client, message, args);
      } catch (error) {
        const errrr = new MessageEmbed()
          .setColor("#0099ff")
          .setTimestamp()
          .setDescription(
            `Произошла ошибка в команде\nОшибка: \`${
              error.message ? error.message : error
            }\``
          );
        return message.channel
          .send(errrr)
          .then(m => m.delete({ timeout: 13000 }).catch(e => {}));
      }
    }
  });
};
