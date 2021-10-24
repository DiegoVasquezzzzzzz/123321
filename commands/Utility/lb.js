const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
var path = require('path')
const Canvas = require("canvas");
const fs = require("fs");

function fontFile (name) {
  return path.join(__dirname, '/Font/', name)
}
Canvas.registerFont(fontFile('Ubuntu-B.ttf'), { family: 'Ubuntu-B', weight: 'bold' })
let { Image_leaderboard } = require("../../config.js");
const Levels = require("discord-xp");
module.exports = {
  name: "leaderboard",
  aliases: ["lb"],
  category: "misc",
  botPermission: ["MANAGE_GUILD"],
  run: async (client, message, args) => {
    const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 3);
    if (rawLeaderboard.length < 1)
      return message.reply("Найдено 0 пользователей.");
    const leaderboard = await Levels.computeLeaderboard(
      client,
      rawLeaderboard,
      true
    );
    const lb = leaderboard.map(
      e =>
        `${e.username}#${
          e.discriminator
        } » Level: \`${e.level}\` » XP: \`${e.xp.toLocaleString()}\``
    );
    const lb1 = leaderboard.map(
      e =>
        `${e.username}`
    );
    const lbl = leaderboard.map(
      e =>
        `${e.level}`
    );
    const lbe = leaderboard.map(
      e =>
        `${e.xp.toLocaleString()}`
    );
    const canvas = Canvas.createCanvas(1400, 633);
    const ctx = canvas.getContext("2d");
    const background = await Canvas.loadImage(Image_leaderboard);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#f2f2f2";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    for(i = 0;i<3;i++){
      let board_height = [320, 450, 573]
      let board_height_other = [327, 435, 564]
      let board_names = [lb1.slice(0,1).join(`\n`), lb1.slice(1,2).join(`\n`), lb1.slice(2).join(`\n`)]
      let board_level = [lbl.slice(0,1).join(`\n`), lbl.slice(1,2).join(`\n`), lbl.slice(2).join(`\n`)]
      let board_exp = [lbe.slice(0,1).join(`\n`), lbe.slice(1,2).join(`\n`), lbe.slice(2).join(`\n`)]
      ctx.font = "bold 36px Ubuntu-B";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(board_names[i], 135, board_height[i]);
      ctx.font = "bold 26px Ubuntu-B";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(board_exp[i], 989, board_height_other[i]);
      ctx.fillText(board_level[i], 1185, board_height_other[i]);
    }
    ctx.beginPath();
    ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip()
    const attachment = new Discord.MessageAttachment(
     canvas.toBuffer(),
     `Leaderboard.png`
    );
    const embed = new MessageEmbed()
      .setTitle(`**Доска ${message.guild.name}**`)
      .setColor("#efcb83")
      .setDescription(`${lb.join("\n")}`)
      .setImage(`attachment://Leaderboard.png`)
      .attachFiles(attachment);
   message.inlineReply(embed);
  }
};