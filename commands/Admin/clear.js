let {def_prefix, admin, developer, developer1, owner } = require("../../config.js");
const Discord = require("discord.js");
module.exports = {
  name: "clear",
  category: "misc",
  aliases: ["delete"],
  botPermission: ["MANAGE_MESSAGES"],
  authorRoles: [`${admin}`,`${developer}`,`${developer1}`,`${owner}`],
  run: async (client, message, args) => {
    let prefix = def_prefix
    try {
      const commands = [
        `bots\` - Удаление сообщений от ботов. (Игнорирование сообщения людей)`,
        `humans\` - Удаление сообщений от пользователей. (Игнорирование сообщения ботов)`,
        `embeds\` - Удаление сообщений, содержащих встраивания.`,
        `files\` - Удаление сообщений, содержащие файлы`,
        `mentions\` - Удаление сообщений, содержащие упоминания`,
        `text\` - Удаление сообщений, содержащие только текст. (Игнорирует файлы/фото/вложения/встраивания)`,
        `match\` <text> - Удаление сообщений, содержащие опрделенное слово/текст`,
        `not\` <text> - Удаление сообщений не содержащие слово/текст`,
      ];

      const embd = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setTitle("Clear | Delete")
        .setDescription(
          `Удаление нескольких сообщений из канала. (Игнорируются закрепленные сообщения, лимит составляет 500)`
        )
        .addField(
          "Usage",
          `\`${prefix}clear <кол-во>\` - Удалить N количество сообщений.\n\`${prefix}clear <кол-во> --${commands.join(
            `\n\`${prefix}clear <кол-во> --`
          )}`
        )
        .setFooter(
          `${prefix}clear, ${prefix}delete`
        );

      if (!args[0] || !args.length) return message.channel.send(embd);
      let amount = Number(args[0], 10) || parseInt(args[0]);
      if (isNaN(amount) || !Number.isInteger(amount))
        return message.channel.send(
          "Нет сообщений для очистки"
        );
      if (!amount || amount < 2 || amount > 500)
        return message.channel.send(
          "Введите число от 2 до 500"
        );
      if (!args[1]) {
        try {
          await message.delete();
          await message.channel.bulkDelete(amount).then(async m => {
            let embed = new Discord.MessageEmbed()
              .setColor("0x#00ffff")
              .setDescription(
                `Удалено **${m.size}**/**${amount}** сообщений!`
              );

            message.channel
              .send(embed)
              .then(msg => msg.delete({ timeout: 4000 }));
          });
        } catch (e) {
          console.log(e);
          message.channel.send(
            `Нельзя удалить сообщения, написанные более 14 дней назад`
          );
        }
      } else if (args[1]) {
        let msg;
        let data;
        let embed;
        switch (args[1]) {
          case "--bots":
            msg = await message.channel.messages.fetch({ limit: amount });
            data = [];
            msg
              .map(m => m)
              .forEach(ms => {
                if (ms.author.bot && !ms.pinned) data.push(ms);
              });

            try {
              await message.delete();
              await message.channel
                .bulkDelete(data.length ? data : 1, true)
                .then(async m => {
                  embed = new Discord.MessageEmbed()
                    .setColor("0x#00ffff")
                    .setDescription(
                      `Удалено **${m.size}**/**${amount}** сообщений!`
                    );

                  message.channel
                    .send(embed)
                    .then(msg => msg.delete({ timeout: 50000 }));
                });
            } catch (e) {
              console.log(e);
              message.channel.send(
                `Нельзя удалить сообщения, написанные более 14 дней назад`
              );
            }

            break;
          case "--humans":
            msg = await message.channel.messages.fetch({ limit: amount });
            data = [];
            msg
              .map(m => m)
              .forEach(ms => {
                if (!ms.author.bot && !ms.pinned) data.push(ms);
              });

            try {
              await message.channel
                .bulkDelete(data.length ? data : 1, true)
                .then(async m => {
                  embed = new Discord.MessageEmbed()
                    .setColor("0x#00ffff")
                    .setDescription(
                      `Удалено **${m.size}**/**${amount}** сообщений!`
                    );

                  message.channel
                    .send(embed)
                    .then(msg => msg.delete({ timeout: 50000 }));
                });
            } catch (e) {
              console.log(e);
              message.channel.send(
                `Нельзя удалить сообщения, написанные более 14 дней назад`
              );
            }

            break;
          case "--embeds":
            msg = await message.channel.messages.fetch({ limit: amount });
            data = [];
            msg
              .map(m => m)
              .forEach(ms => {
                if (ms.embeds.length && !ms.pinned) data.push(ms);
              });

            try {
              await message.channel
                .bulkDelete(data.length ? data : 1, true)
                .then(async m => {
                  embed = new Discord.MessageEmbed()
                    .setColor("0x#00ffff")
                    .setDescription(
                      `Удалено **${m.size}**/**${amount}** сообщений!`
                    );

                  message.channel
                    .send(embed)
                    .then(msg => msg.delete({ timeout: 50000 }));
                });
            } catch (e) {
              console.log(e);
              message.channel.send(
                `Нельзя удалить сообщения, написанные более 14 дней назад`
              );
            }

            break;
          case "--files":
            msg = await message.channel.messages.fetch({ limit: amount });
            data = [];
            msg
              .map(m => m)
              .forEach(ms => {
                if (ms.attachments.first() && !ms.pinned) data.push(ms);
              });

            try {
              await message.channel
                .bulkDelete(data.length ? data : 1, true)
                .then(async m => {
                  embed = new Discord.MessageEmbed()
                    .setColor("0x#00ffff")
                    .setDescription(
                      `Удалено **${m.size}**/**${amount}** сообщений!`
                    );

                  message.channel
                    .send(embed)
                    .then(msg => msg.delete({ timeout: 50000 }));
                });
            } catch (e) {
              console.log(e);
              message.channel.send(
                `Нельзя удалить сообщения, написанные более 14 дней назад`
              );
            }

            break;
          case "--text":
            msg = await message.channel.messages.fetch({ limit: amount });
            data = [];
            msg
              .map(m => m)
              .forEach(ms => {
                if (!ms.attachments.first() && !ms.embeds.length && !ms.pinned)
                  data.push(ms);
              });

            try {
              await message.channel
                .bulkDelete(data.length ? data : 1, true)
                .then(async m => {
                  embed = new Discord.MessageEmbed()
                    .setColor("0x#00ffff")
                    .setDescription(
                      `Удалено **${m.size}**/**${amount}** сообщений!`
                    );

                  message.channel
                    .send(embed)
                    .then(msg => msg.delete({ timeout: 50000 }));
                });
            } catch (e) {
              console.log(e);
              message.channel.send(
                `Нельзя удалить сообщения, написанные более 14 дней назад`
              );
            }

            break;
          case "--mentions":
            msg = await message.channel.messages.fetch({ limit: amount });
            data = [];
            msg
              .map(m => m)
              .forEach(ms => {
                if (
                  (ms.mentions.users.first() ||
                    ms.mentions.members.first() ||
                    ms.mentions.channels.first() ||
                    ms.mentions.roles.first()) &&
                  !ms.pinned
                )
                  data.push(ms);
              });

            try {
              await message.channel
                .bulkDelete(data.length ? data : 1, true)
                .then(async m => {
                  embed = new Discord.MessageEmbed()
                    .setColor("0x#00ffff")
                    .setDescription(
                      `Удалено **${m.size}**/**${amount}** сообщений!`
                    );

                  message.channel
                    .send(embed)
                    .then(msg => msg.delete({ timeout: 50000 }));
                });
            } catch (e) {
              console.log(e);
              message.channel.send(
                `Нельзя удалить сообщения, написанные более 14 дней назад`
              );
            }

            break;
          case "--pins":
            msg = await message.channel.messages.fetch({ limit: amount });
            data = [];
            msg
              .map(m => m)
              .forEach(ms => {
                if (ms.pinned) data.push(ms);
              });

            try {
              await message.channel
                .bulkDelete(data.length ? data : 1, true)
                .then(async m => {
                  embed = new Discord.MessageEmbed()
                    .setColor("0x#00ffff")
                    .setDescription(
                      `Удалено **${m.size}**/**${amount}** сообщений!`
                    );

                  message.channel
                    .send(embed)
                    .then(msg => msg.delete({ timeout: 50000 }));
                });
            } catch (e) {
              console.log(e);
              message.channel.send(
                `Нельзя удалить сообщения, написанные более 14 дней назад`
              );
            }

            break;
          case "--match":
            msg = await message.channel.messages.fetch({ limit: amount });
            data = [];
            msg
              .map(m => m)
              .forEach(ms => {
                if (!args[2]) return message.channel.send(embd);
                if (ms.content.includes(args.slice(2).join(" ")) && !ms.pinned)
                  data.push(ms);
              });

            try {
              await message.channel
                .bulkDelete(data.length ? data : 1, true)
                .then(async m => {
                  embed = new Discord.MessageEmbed()
                    .setColor("0x#00ffff")
                    .setDescription(
                      `Удалено **${m.size}**/**${amount}** сообщений!`
                    );

                  message.channel
                    .send(embed)
                    .then(msg => msg.delete({ timeout: 50000 }));
                });
            } catch (e) {
              console.log(e);
              message.channel.send(
                `Нельзя удалить сообщения, написанные более 14 дней назад`
              );
            }

            break;
          case "--not":
            msg = await message.channel.messages.fetch({ limit: amount });
            data = [];
            msg
              .map(m => m)
              .forEach(ms => {
                if (!args[2]) return message.channel.send(embd);
                if (!ms.content.includes(args.slice(2).join(" ")) && !ms.pinned)
                  data.push(ms);
              });

            try {
              await message.channel
                .bulkDelete(data.length ? data : 1, true)
                .then(async m => {
                  embed = new Discord.MessageEmbed()
                    .setColor("0x#00ffff")
                    .setDescription(
                      `Удалено **${m.size}**/**${amount}** сообщений!`
                    );

                  message.channel
                    .send(embed)
                    .then(msg => msg.delete({ timeout: 50000 }));
                });
            } catch (e) {
              console.log(e);
              message.channel.send(
                `Нельзя удалить сообщения, написанные более 14 дней назад`
              );
            }

            break;
          case "--startswith":
            msg = await message.channel.messages.fetch({ limit: amount });
            data = [];
            msg
              .map(m => m)
              .forEach(ms => {
                if (!args[2]) return message.channel.send(embd);
                if (
                  ms.content.startsWith(args.slice(2).join(" ")) &&
                  !ms.pinned
                )
                  data.push(ms);
              });

            try {
              await message.channel
                .bulkDelete(data.length ? data : 1, true)
                .then(async m => {
                  embed = new Discord.MessageEmbed()
                    .setColor("0x#00ffff")
                    .setDescription(
                      `Удалено **${m.size}**/**${amount}** сообщений!`
                    );

                  message.channel
                    .send(embed)
                    .then(msg => msg.delete({ timeout: 50000 }));
                });
            } catch (e) {
              console.log(e);
              message.channel.send(
                `Нельзя удалить сообщения, написанные более 14 дней назад`
              );
            }

            break;
          case "--endswith":
            msg = await message.channel.messages.fetch({ limit: amount });
            data = [];
            msg
              .map(m => m)
              .forEach(ms => {
                if (!args[2]) return message.channel.send(embd);
                if (ms.content.endsWith(args.slice(2).join(" ")) && !ms.pinned)
                  data.push(ms);
              });

            try {
              await message.channel
                .bulkDelete(data.length ? data : 1, true)
                .then(async m => {
                  embed = new Discord.MessageEmbed()
                    .setColor("0x#00ffff")
                    .setDescription(
                      `Удалено **${m.size}**/**${amount}** сообщений!`
                    );

                  message.channel
                    .send(embed)
                    .then(msg => msg.delete({ timeout: 50000 }));
                });
            } catch (e) {
              console.log(e);
              message.channel.send(
                `Нельзя удалить сообщения, написанные более 14 дней назад`
              );
            }

            break;
          default:
            return message.channel.send(embd);
            break;
        }
      } else {
        return message.channel.send(`Произошла ошибка.`);
      }
    } catch (error) {
      console.log(error);
      message.channel.send(`Произошла ошибка: \`${error}\``);
    }
  }
};
