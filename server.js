const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const cookieParser = require('cookie-parser');
const User = require("./models/user.model");
const Chat = require("./models/chat.model");
const Message = require("./models/message.model");


require('dotenv').config();
const corsOptions = {
  credentials: true,
  origin: 'http://localhost:3000'
};


const app = express();

//Run on port or on localhost 5000
const port = process.env.PORT || 5000;

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const tweetRouter = require('./routes/tweet');
app.use('/tweet', tweetRouter);

const server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

const io = socketio(server, {
  pingTimeout: 60000,
});

// Socket connection on the server side using socket.io
// Enables inviting for chat, send messages, and disconnecting from chat. 
io.on('connection', (socket) => {
  console.log("connected")
  // Creates a unique room for the user for supporting invite feature
  socket.on('createRoom', ({ userID }) => {
    socket.join(userID);
    console.log(`user has joined roomID ${userID}`);
  });
  //Sends an invite to users selected for chat
  socket.on('Invite', async ({ data }) => {
    let chat,
    usersID = data.usersID;
    adminID = data.adminID;
    console.log('inviting');

    const chatroomExists = await Chat.exists(
      {
        users: { $all: usersID }
      });

    if (!chatroomExists) {
      const len = usersID.length;
      const roomID = uniqid();
      const club = data.club;
      chat = new Chat({
        users: usersID,
        admin: adminID,
        messages: null,
        roomID: roomID
      });
      chat.users.forEach(async (userID) => {
        const user = await User.findOne({ _id: userID });
        user.groupChats.push(chat)
        await user.save()
      });
      await chat.save()
      const newChat = { created: chat };
      console.log(`sent`);
      usersID.forEach((userID) => {
        io.to(userID).emit("createdChat", { newChat });
      });
    } else {
      console.log("Exists")
    };
  });
  // Allows users to send each other messages
  socket.on('sendMessage', async (userEmail, message, callback) => {
    const user= await User.findOne({ email: user.email });
    const newMessage = new Message({
      user: user,
      username: user.username,
      text: message,
    })

    await newMessage.save();

    const chat = await Chat.findById(user.currentChatId);
    chat.messages.push(newMessage);

    await chat.save();
    io.to(user.currentChatID).emit('message', { user: user, text: message });
    callback();
  });
  //Listening for disconnect event
  socket.on('disconnect', () => {
    console.log("user disconnecting");
  });

});




