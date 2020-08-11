const moment = require("moment");

module.exports = {
  createMessage: async (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.session.user;
    const { chatid } = req.params;
    const { messageContent } = req.body;
    const message_time = moment().format("lll");

    const newMessage = await db.message.create_message(
      chatid,
      user_id,
      messageContent,
      message_time
    );
    if (!newMessage) {
      res.sendStatus(500);
    }
    res.status(200).send(newMessage);
  },
  deleteMessage: async (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.session.user;
    const { messageid } = req.params;

    const isMessageAuthor = await db.message.is_message_author(messageid);

    if (isMessageAuthor[0].message_author_id === user_id) {
      await db.message.delete_message(messageid);
      res.sendStatus(200);
    } else {
      res.sendStatus(403);
    }
  },
};
