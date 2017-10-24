var mongoose = require("mongoose");
var passportLocalMognoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    Password: String
});

UserSchema.plugin(passportLocalMognoose);

module.exports = mongoose.model("user", UserSchema);