const { NotFoundError } = require("errors");
const { Booking } = require("../../../models");

function retrieveUserBookingsOfAProperty(userId, propertyId) {
  return Booking.find(
    {
      property: propertyId,
      user: userId,
      "dates.from": { $gte: new Date(Date.now()) },
      state: "active",
      // date: { $gte: Date.now() },
    },
    "dates"
  ).then((bookings) => {
    if (!bookings) throw new NotFoundError("You have no bookings yet");
    // return bookings.map((booking) => booking.dates);
    return bookings;
  });
}
module.exports = retrieveUserBookingsOfAProperty;
