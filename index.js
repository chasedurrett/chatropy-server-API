require("dotenv").config();
const express = require("express");
const app = express();
const massive = require("massive");
const session = require("express-session");
const cors = require("cors");
const { SESSION_SECRET, CONNECTION_STRING, SERVER_PORT } = process.env;
const chatCtrl = require("./ctrl/chatCtrl");
const authCtrl = require("./ctrl/authCtrl");
const messageCtrl = require("./ctrl/messageCtrl");

app.use(express.json());
app.use(cors());

// SET UP USER SESSION
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 14 }, //2weeks
  })
);

// AUTH USER ENDPOINTS //
app.get("/auth/users/current", authCtrl.currentUser);
app.post("/auth/register", authCtrl.register);
app.post("/auth/login", authCtrl.login);
app.delete("/auth/logout", authCtrl.logout);

// CHAT ENDPOINTS //
app.get("/api/chats", chatCtrl.getChats);
app.get("/api/chats/:chatid/users", chatCtrl.getChatUsers);
app.get("/api/chats/:chatid", chatCtrl.getChatContent);
app.post("/api/chats", chatCtrl.createChat);
app.post("/api/chats/:chatid/users", chatCtrl.addChatUser);
app.put("/api/chats/:chatid", chatCtrl.editChat);
app.delete("/api/chats/:chatid", chatCtrl.deleteChat);

// MESSAGE ENDPOINTS //
app.post("/api/chats/:chatid/messages", messageCtrl.createMessage);
app.delete("/api/chats/:chatid/messages/:messageid", messageCtrl.deleteMessage);

// GRABBING DB INSTANCE
massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
})
  .then((db) => {
    app.set("db", db);
    console.log("db connected");
  })
  .catch((err) => console.log(err));

// SERVER RUNNING
app.listen(SERVER_PORT, console.log(`server activated port ${SERVER_PORT}`));
