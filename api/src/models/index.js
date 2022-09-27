const { model } = require("mongoose");
const {
  user,
  property,
  booking,
  message,
  deletedBooking,
} = require("./schemas");

module.exports = {
  User: model("User", user),
  Property: model("Property", property),
  Booking: model("Booking", booking),
  Message: model("Message", message),
  DeletedBooking: model("DeletedBooking", deletedBooking),
};
