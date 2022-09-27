const {
  Schema,
  Types: { ObjectId },
} = require("mongoose");

const message = new Schema({
  user: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  property: {
    type: ObjectId,
    required: true,
    ref: "Property",
  },
  text: {
    type: String,
    required: true,
  },
  sendAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = message;
