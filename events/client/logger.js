const Discord = require("discord.js");
const fs = require("fs");
const { logchannel, welcome_role } = require("../../config.js")
const mongoose = require("mongoose");

module.exports = (c, message) => {
  try {
    c.on("guildMemberUpdate", async function(oldMember, newMember) {
      let options = {};

      if (options[newMember.guild.id]) {
        options = options[newMember.guild.id];
      }
      const fetchedLogs = await oldMember.guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_ROLE_UPDATE',
      })
      const deletionLog = fetchedLogs.entries.first();
      const { executor, target } = deletionLog;
      if (typeof options.excludedroles === "undefined")
        options.excludedroles = new Array([]);
      if (typeof options.trackroles === "undefined") options.trackroles = true;
      const oldMemberRoles = oldMember.roles.cache.keyArray();
      const newMemberRoles = newMember.roles.cache.keyArray();
      const oldRoles = oldMemberRoles
        .filter(x => !options.excludedroles.includes(x))
        .filter(x => !newMemberRoles.includes(x));
      const newRoles = newMemberRoles
        .filter(x => !options.excludedroles.includes(x))
        .filter(x => !oldMemberRoles.includes(x));
      const rolechanged = newRoles.length || oldRoles.length;

      if (rolechanged) {
        let roleadded = "";
        if (newRoles.length > 0) {
          for (let i = 0; i < newRoles.length; i++) {
            if (i > 0) roleadded += ", ";
            roleadded += `<@&${newRoles[i]}>`;
          }
        }
        let roleremoved = "";
        if (oldRoles.length > 0) {
          for (let i = 0; i < oldRoles.length; i++) {
            if (i > 0) roleremoved += ", ";
            roleremoved += `<@&${oldRoles[i]}>`;
          }
        }
        let text = `${roleremoved ? `❌ УБРАННЫЕ РОЛИ: \n${roleremoved}` : ""}${
          roleadded ? `✅ ДОБАВЛЕННЫЕ РОЛИ:\n${roleadded}` : ""
        }`;
        let channel = oldMember.guild.channels.cache.get(logchannel)
        const LogEmbed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setDescription(`Изменены роли у: ${target.tag}\n Модератор: ${executor.tag}\n\n${text}`)
        .setTitle("Роли пользователя изменены")
        .setTimestamp()
        .setThumbnail(oldMember.guild.iconURL())
        .setFooter(oldMember.guild.name, oldMember.guild.iconURL());
        channel.send(LogEmbed)
      }
    });
    c.on("guildMemberAdd", async member => {
      if (!member.guild.me.hasPermission("MANAGE_ROLES")) return;
       let role = await member.guild.roles.cache.get(welcome_role);
       if (role === null) return;
       await member.roles.add(role);
     });
  } catch (e) {
    return;
  }
}
