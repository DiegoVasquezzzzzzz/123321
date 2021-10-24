//https://discord.com/invite/xsXxb5v
module.exports = {
  name: "invite",
  aliases: ["i"],
  usage: "invite",
  category: "misc",
  cooldown: 5,
  run: async (client, message, args) => {
   message.channel.send(`https://discord.com/invite/xsXxb5v`);
  }
};