const { MessageEmbed } = require("discord.js");
let ticket = [];
module.exports = {
  name: "ticket",
  category: "ticket",
  cooldown: 5,
  permission: "",
  bot: ["MANAGE_CHANNELS", "VIEW_CHANNEL", "MANAGE_ROLES"],
  run: async (client, message, args) => {
    let btn1 = new client.button.MessageButton()
      .setStyle("blurple")
      .setLabel("🎫  Открыть тикет!")
      .setID("1");
    message.delete();
    let embed = new MessageEmbed()
      .addField(
        "Открытие тикета!",
        `Отреагировав на этот тикет, для вас откроется сообщение.`
      )
      .setColor("#468DFF")

    client.button.send(null, {
      channel: message.channel.id,
      embed: embed,
      buttons: [[btn1]]
    });
    client.button.on("1", async button => {
      let btn2 = new client.button.MessageButton()
        .setStyle(`grey`)
        .setLabel(`🔒  Закрыть`)
        .setID("2");
      let ch = client.db.get(
        `tickets_${message.guild.id}_${button.clicker.user.id}`
      );
      if (ch) {
        button.reply(
          "Ваш тикет уже существует, нажмите <#" + ch + "> чтобы увидеть его",
          { flags: 64 }
        );
      }
      if (!ch) {
        const channel = await button.guild.channels.create(
          `${button.clicker.user.username} ticket`,
          {
            topic: `Полезная информация:
Имя тикета: ${button.clicker.user.username}
ID тикета: ${button.clicker.user.id}`,
            permissionOverwrites: [
              {
                id: button.guild.roles.everyone,
                deny: ["VIEW_CHANNEL"]
              },
              {
                id: button.clicker.user.id,
                allow: ["VIEW_CHANNEL"]
              },
              {
                id: client.user.id,
                allow: [
                  "VIEW_CHANNEL",
                  "MANAGE_CHANNELS",
                  "MANAGE_MESSAGES",
                  "SEND_MESSAGES"
                ]
              }
            ]
          }
        );
        button.reply(
          "Твой тикет был создан. Нажми на  <#" +
            channel.id +
            "> чтобы увидеть свой тикет",
          { flags: 64 }
        );
        const embedticket = new MessageEmbed()
          .setTimestamp()
          .setTitle("Общая поддержка")
          .setFooter(`Тикет открыт на`)
          .setColor(0x5865f2)
          .setDescription(
            `Поддержка скоро будет тут.\nЧтобы закрыть этот билет, нажмите 🔒`
          );
        client.button.send(`Привет ${button.clicker.user}`, {
          channel: channel.id,
          embed: embedticket,
          buttons: [[btn2]]
        });
        client.db.set(
          `tickets_${message.guild.id}_${button.clicker.user.id}`,
          channel.id
        );
        client.db.set(
          `tickets_user_${message.guild.id}_${channel.id}`,
          button.clicker.user.id
        );
        client.button.on("2", async buttons => {
          let chs = client.db.get(
            `tickets_user_${message.guild.id}_${buttons.channel.id}`
          );
          if (chs !== buttons.clicker.user.id) {
            buttons.reply(
              `Извините, у вас нет доступа для удаления этого канала, только <@${chs}> для него`,
              { flags: 64 }
            );
          }
          if (chs === buttons.clicker.user.id) {
            buttons.reply("Удаление, подождите 5 секунд", { flags: 64 });
            setTimeout(function() {
              client.db.delete(
                `tickets_${message.guild.id}_${button.clicker.user.id}`
              );
              client.db.delete(
                `tickets_user_${message.guild.id}_${buttons.channel.id}`
              );
              buttons.channel.delete();
            }, 5000);
          }
        });
      }
    });
  }
};
