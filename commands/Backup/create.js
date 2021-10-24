const backup = require("discord-backup");
backup.setStorageFolder(__dirname+"/Storages/")
const { Default_Prefix, Color } = require("../../config.js");
const owner = ["403987036219899908", "639134509018775588"];

module.exports = {
  name: "create-backup",
  usage: "none",
  description: "создание бэкапа",
  category: "backup",
 /* botPermission: ["ADMINISTRATOR"],
  authorPermission: ["ADMINISTRATOR"],
*/
  run: async (client, message, args) => {
    if (owner.includes(message.author.id) === false) {
      return;
    }
backup.create(message.guild, {
jsonBeautify: true
}).then((backupData) => {
  client.send("Сервер: "+ message.guild.name+ "\nБэкап создан! To load it, type this command on the server of your choice: `" + Default_Prefix + "load-backup " + backupData.id + "`!", message,"dm");
  client.send("Бэкап создан! Чтобы загрузить его, введите эту команду `" + Default_Prefix + "load-backup " + backupData.id + "`!", message,"dms");
});
  }
}