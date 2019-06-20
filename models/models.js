const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user = new Schema({
    Username: String,
    Password: String,
    Email: String,
    Inventory: [{ Name: String, Quantity: Number }],
});

const User = mongoose.model('User', user);
module.exports = User;
