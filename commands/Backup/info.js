const backup = require("discord-backup");
const Discord = require("discord.js");
const owner = ["403987036219899908", "639134509018775588"];
backup.setStorageFolder(__dirname+"/Storages/")

module.exports = {
  name: "info-backup",
  category: "backup",
  run: async (client, message, args) => {
    if (owner.includes(message.author.id) === false) {
      return;
    }

    let backupID = args[0];
    if (!backupID) {
      return client.send(":x: | Введите верный ID бэкапа", message);
    }
    // Fetch the backup
    backup
      .fetch(backupID)
      .then(backupInfos => {
        const date = new Date(backupInfos.data.createdTimestamp);
        const yyyy = date.getFullYear().toString(),
          mm = (date.getMonth() + 1).toString(),
          dd = date.getDate().toString();
        const formatedDate = `${yyyy}/${mm[1] ? mm : "0" + mm[0]}/${
          dd[1] ? dd : "0" + dd[0]
        }`;
        let embed = new Discord.MessageEmbed()
          .setAuthor("Информация о бэкапе")
          .addField("Бэкап ID", backupInfos.id, false)
          .addField("Сервер ID", backupInfos.data.guildID, false)
          .addField("Размер", `${backupInfos.size} kb`, false)
          .addField("Создан", formatedDate, false)
          .setColor("#FF0000");
        message.channel.send(embed);
      })
      .catch(err => {
        // if the backup wasn't found
        return client.send(
          ":x: | Бэкап не найден для ID - `" + backupID + "`!",
          message
        );
      });
  }
};
