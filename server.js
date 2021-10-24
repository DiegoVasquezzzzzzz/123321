const Discord = require("discord.js");
const fs = require("fs");
const { Client } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const Discord4Bots = require("discord4bots");
const { Database } = require("quickmongo");
let dd = require('discord-buttons-plugins');
const bot = new Discord.Client()

let { Token, mongodb } = require("./config.js");
const { channel } = require("diagnostics_channel");
for (const token of Token) {
  const client = new Client({
    disableEveryone: "everyone",
    partials: ["REACTION", "MESSAGE", "CHANNEL"]
  });
let {
    awaitReply,
    resolveUser,
    getRandomString,
    send,
    text,
    randomNumber,
    formating,
  } = require("./Functions.js");
  client.commands = new Discord.Collection();
  client.aliases = new Discord.Collection();
  client.data = new Database(mongodb);
  client.queue = new Map();
  client.discord = require("discord.js");
  client.button = new dd(client)
  client.request = new (require("rss-parser"))();
  const bot = new Discord.Client()
  require("./handlers/Level-Up.js")(client);
  require("./handlers/reply.js");
  require("./handlers/commands")(client)
  global.mongoose = require('mongoose')
  global.client = client;
  global.User = require('./models/user.js');
  
  client.data2 = client.data;
  client.resolveUser = resolveUser;
  client.awaitReply = awaitReply;
  client.random = getRandomString;
  client.send = send;
  client.text = text;
  client.format = formating;
  
  client
    .login(token)
    .catch(() =>
      console.log(`❌ Невалидный токен - Установите новый в config.js!`)
    );
}

 
