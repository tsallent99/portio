const { Booking } = require("../../../models");
const { SystemError, ConflictError, NotFoundError } = require("errors");

function retrieveTotalBookingsOfAProperty(propertyId) {
  return Booking.find({
    property: propertyId,
    date: { $gte: Date.now() },
    state: "active",
  }).then((bookings) => {
    return bookings.map((booking) => booking.dates);
  });
}
module.exports = retrieveTotalBookingsOfAProperty;
