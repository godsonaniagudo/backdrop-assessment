const mongoose = require("mongoose");
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  6
);

const schema = mongoose.Schema({
  shortURL: {
    type: String,
    default: nanoid(),
  },
  longURL: {
    type: String,
    max: 1024,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("ShortURL", schema);
