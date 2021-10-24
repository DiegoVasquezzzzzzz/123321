const backup = require("discord-backup");
const owner = ["403987036219899908", "639134509018775588"];
backup.setStorageFolder(__dirname+"/Storages/")

module.exports = {
  name: "load-backup",
  usage: "<ID бэкапа>",
  description: "загрузка бэкапа",
  category: "backup",
/*  botPermission: ["ADMINISTRATOR"],
  authorPermission: ["ADMINISTRATOR"],*/
  run: async (client, message, args) => {
    if (owner.includes(message.author.id) === false) {
      return;
    }

    let backupID = args[0];
    if (!backupID) {
      return client.send(":x: | Введите верный ID бэкапа", message);
    }
    backup
      .fetch(backupID)
      .then(async () => {
        client.send(
          ":warning: | При загрузке этого бэкапа, все каналы будут заменены! Введите `confirm` чтобы подтвердить !",
          message
        );
        await message.channel
          .awaitMessages(
            m => m.author.id === message.author.id && m.content === "confirm",
            {
              max: 1,
              time: 20000,
              errors: ["time"]
            }
          )
          .catch(err => {
            return client.send(
              ":x: | Время вышло! Загрузка бэкапа отклонена",
              message
            );
          });
        client.send(
          ":white_check_mark: | Загрузка бэкапа началась",
          message,
          "dm"
        );
        // Load the backup
        backup
          .load(backupID, message.guild)
          .then(() => {
          })
          .catch(err => {
            return client.send(
              ":x: | Загрузка прервана, у меня не достаточно прав!",
              message
            );
          });
      })
      .catch(err => {
        console.log(err);
        return client.send(
          ":x: | Нет бэкапа для ID - `" + backupID + "`!",
          message
        );
      });
  }
};
