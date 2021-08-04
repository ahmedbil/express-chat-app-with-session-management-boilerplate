const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  user: {type: Schema.ObjectId, ref: "user"},
  username: {type: String },
  text: { type: String }
}, {
    timestamps: true,
  });

module.exports = mongoose.model('message', messageSchema);