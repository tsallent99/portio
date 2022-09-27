const {
  Schema,
  Types: { ObjectId },
} = require("mongoose");

const property = new Schema({
  // users: {
  //  type: [ObjectId],
  //  required: true,
  //  ref: "User",
  //},
  adress: {
    type: String,
    required: true,
  },
  pictures: {
    type: [String],
  },

  // portions: [
  //     // { owner:'sdjfoiqijoieavqre', shares: 1},
  //     // {owner: 'sdjfhwqoiuhfoeaifvea', shares: 2}
  // ]

  portions: [
    {
      owner: {
        type: ObjectId,
        ref: "User",
        required: true,
      },
      shares: {
        type: Number,
        required: true,
      },
      totalDaysBooked: {
        type: Number,
        default: 0,
      },
    },
  ],
  totalPortions: {
    type: Number,
    required: true,
  },
});

module.exports = property;
