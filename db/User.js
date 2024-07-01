const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    contact: String,
    email: String,
    message: String
});

module.exports = mongoose.model("users",userSchema);