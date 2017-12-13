var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserAllowed = new Schema({
    name: String,
    password: String
});
const UsersAllowed = new Schema({
   users  : [UserAllowed]
});
module.exports = mongoose.model('UserAllowed',UsersAllowed)
