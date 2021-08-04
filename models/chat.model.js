const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatsSchema = new Schema({
  users: [{type: Schema.ObjectId, ref: 'user'}],
  admin: {type: Schema.ObjectId, ref: 'user'},
  messages: [{type: Schema.ObjectId, ref: "message"}],
  roomID: {type: String, unique: true}  
});

module.exports = mongoose.model('chat', chatsSchema);