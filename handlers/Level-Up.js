let Discord = require("discord.js");
let Levels = require("discord-xp");
let { mongodb } = require("../config.js");

module.exports = async client => {
  Levels.setURL(mongodb);
  client.on("message", async message => {
    if (message.author.bot === true) return;
    const randomXp = Math.floor(Math.random() * 2) + 1;
    const hasLeveledUp = await Levels.appendXp(
      message.author.id,
      message.guild.id,
      randomXp
    );
    if (hasLeveledUp) {
      const User = await Levels.fetch(message.author.id, message.guild.id);
      let channel_id = await client.data.get(`levelch_${message.guild.id}`);
      if (channel_id === null)
        return client.send(`Ты успешно поднял свой уровень до **${User.level}**`, message);
    }
  })
 }
