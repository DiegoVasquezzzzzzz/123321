const fs = require("fs");
const mongoose = require("mongoose");
let { mongodb, Default_Prefix } = require("../../config.js");
let fetch = require("node-fetch");
let Discord = require("discord.js");
let MessageEmbed = Discord.MessageEmbed;

module.exports = async client => {
  client.on("ready", async () => {
    await mongoose.connect(mongodb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.clear();
    console.log(`Бот загружен!\nТег: ${client.user.tag}`);
    client.user
      .setPresence({
        activity: {
          type: "WATCHING",
          name: `стрим KURILO`
        },
        status: "online"
      })
      .then(console.log)
      .catch(console.error);
  });

  mongoose.connection.on("connected", () => {
    console.log("Mongoose has successfully connected!");
  });
  mongoose.connection.on("err", err => {
    console.error(`Mongoose connection error: \n${err.stack}`);
  });
  mongoose.connection.on("disconnected", () => {
    console.warn("Mongoose connection lost");
  });
};
