var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema of Attempts.
const Attempts = new Schema({
    ip: String,
    date: Number,
    action: String,
    username: String
});

module.exports = mongoose.model( 'Attempt', Attempts )
