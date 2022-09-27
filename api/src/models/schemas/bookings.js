const {
  Schema,
  Types: { ObjectId },
} = require("mongoose");

const booking = new Schema({
  user: {
    type: ObjectId,
    required: true,
  },
  property: {
    type: ObjectId,
    required: true,
  },
  state: {
    type: String,
    enum: ["active", "cancel"],
    default: "active",
  },
  dates: {
    from: {
      type: Date,
    },
    to: {
      type: Date,
    },
  },
});

module.exports = booking;
