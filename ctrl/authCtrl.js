const bc = require("bcrypt");
const moment = require("moment");

module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;

    const existingUser = db.auth.check_user(username);
    if (existingUser[0]) {
      return res.status(409).send(`User already exists!`);
    }

    const salt = bc.genSaltSync(10);
    const hash = bc.hashSync(password, salt);
    const userCakeDay = moment().format("LL");

    const registerUser = await db.auth.register_user(
      username,
      hash,
      userCakeDay
    );

    req.session.user = {
      user_id: registerUser[0].id,
      user_name: registerUser[0].user_name,
      user_pic: registerUser[0].user_pic,
      user_cake_day: registerUser[0].user_cake_day,
    };

    res.status(200).send(req.session.user);
  },
  login: async (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;

    // CHECK USER CREDENTIALS //
    const registerUser = await db.auth.check_user(username);
    if (!registerUser[0]) {
      return res.status(404).send(`User not found!`);
    }

    const auth = bc.compareSync(password, registerUser[0].user_password);

    if (auth) {
      req.session.user = {
        user_id: registerUser[0].id,
        user_name: registerUser[0].user_name,
        user_pic: registerUser[0].user_pic,
        user_cake_day: registerUser[0].user_cake_day,
      };
      return res.status(200).send(req.session.user);
    } else {
      return res.status(403).send("Username or password incorrect!");
    }
  },
  logout: async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  },
  currentUser: (req, res) => {
    if (req.session.user) {
      res.status(200).send(req.session.user);
    } else {
      res.sendStatus(404);
    }
  },
};
