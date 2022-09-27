const {
  Schema,
  Types: { ObjectId },
} = require("mongoose");

const deletedBooking = new Schema({
  booking: {
    type: ObjectId,
    required: true,
  },
  user: {
    type: ObjectId,
    required: true,
  },
  property: {
    type: ObjectId,
    required: true,
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

module.exports = deletedBooking;
