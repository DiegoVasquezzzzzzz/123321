const schema = mongoose.Schema({
    guildID: String,
    userID: String,
    
    money: { type: Number, default: 5 },
    messages: { type: Number, default: 0 },
    warn: { type: Number, default: 0 },
    ref: { type: Number, default: 0 },
    _time: { type: Number, default: 0 }
});
module.exports = mongoose.model("User", schema)