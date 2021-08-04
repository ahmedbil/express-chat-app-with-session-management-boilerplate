const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
  userCreated: {type: Schema.ObjectId, ref: 'user'},
  text: {type: String, unique: true},
  tweetID: {type: String, unique: true}  
}, {
    timestamps: true,
  });

module.exports = mongoose.model('tweet', tweetSchema);