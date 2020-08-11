const moment = require("moment");

module.exports = {
  createChat: async (req, res) => {
    const db = req.app.get("db");
    const { chatName, chatBio } = req.body;
    const { user_id } = req.session.user;
    const chat_cake_day = moment().format("LL");
    const newChat = await db.chat.create_chat(
      chatName,
      chatBio,
      user_id,
      chat_cake_day
    );
    if (!newChat[0]) {
      res.sendStatus(404);
    }
    res.status(200).send(newChat);
  },
  getChatContent: async (req, res) => {
    const db = req.app.get("db");
    const { chatid } = req.params;
    const chatContent = await db.chat.get_chat_content(chatid);

    if (!chatContent) {
      res.sendStatus(500);
    }

    res.status(200).send(chatContent);
  },
  addChatUser: async (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.session.user;
    const { chatid } = req.params;

    await db.chat.add_chat_user(chatid, user_id);

    res.sendStatus(200);
  },
  getChats: async (req, res) => {
    const db = req.app.get("db");

    const chats = await db.chat.get_chats();

    if (!chats) {
      res.sendStatus(500);
    }
    res.status(200).send(chats);
  },
  getChatUsers: async (req, res) => {
    const db = req.app.get("db");
    const { chatid } = req.params;
    const chatUsers = await db.chat.get_chat_users(chatid);

    if (!chatUsers) {
      res.sendStatus(500);
    }
    res.status(200).send(chatUsers);
  },
  editChat: async (req, res) => {
    const db = req.app.get("db");
    const { chatName, chatBio } = req.body;
    const { chatid } = req.params;
    const { user_id } = req.session.user;
    const isAuthor = await db.chat.is_user_author(chatid);
    if (isAuthor[0].chat_author === user_id) {
      const updatedChat = await db.chat.edit_chat(chatid, chatName, chatBio);
      if (!updatedChat) {
        res.sendStatus(500);
      } else {
        res.status(200).send(updatedChat);
      }
    }
  },
  deleteChat: async (req, res) => {
    const db = req.app.get("db");
    const { chatid } = req.params;
    const { user_id } = req.session.user;
    const isAuthor = await db.chat.is_user_author(chatid);
    if (isAuthor[0].chat_author === user_id) {
      await db.chat.delete_chat(chatid);
      res.sendStatus(200);
    } else {
      res.sendStatus(403);
    }
  },
};
