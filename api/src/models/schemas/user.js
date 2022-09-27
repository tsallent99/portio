const { Schema } = require("mongoose");

const user = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png?w=360",
  },
  notifications: [
    {
      text: {
        type: String,
      },
    },
  ],
});

module.exports = user;
