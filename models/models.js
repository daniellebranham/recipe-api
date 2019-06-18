const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const user = new Schema({
    Username: String,
    Password: String,
    Email: String,
    Inventory: [{ Name: String, Quantity: Number }],
});

module.exports = mongoose.model('Users', user);
