const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user = new Schema({
    userName: { type: String },
    passWord: { type: String },
});

module.exports = mongoose.model('Users', user);
