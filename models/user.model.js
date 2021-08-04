const mongoose = require('mongoose');


const Schema = mongoose.Schema;

// A model for the each User
const userSchema = new Schema({
  username: {type: String, unique: true, minlength: 3},
  password: {type: String, required: true, minlength: 5  },
  email: {type: String, required: true, trim: true, unique: true}, 
  chats: [{type: Schema.ObjectId, ref: 'chat'}],
  currentChatID: {type: String, unique: false},
  }, {
  timestamps: true,
});
 
module.exports = mongoose.model('user', userSchema);