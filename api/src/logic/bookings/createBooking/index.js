const { Booking, Property } = require("../../../models");
const { SystemError, ConflictError } = require("errors");

function createBooking(userId, propertyId, fromNew, toNew) {
  // TODO VALIDATE INPUTS
  // verify property belongs to the user
  // dates available
  // Booking.create()

  return Property.findById(propertyId)
    .lean()
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((property) => {
      const owner = property.portions.find(
        (portion) => portion.owner._id.toString() === userId
      );

      if (!owner)
        throw new ConflictError(
          `user with id ${userId} is not owner of property with id ${propertyId}`
        );

      /* CALCULATE DAY AVAILABLE */
      const totalDaysPerYear = Math.floor(
        (owner.shares / property.totalPortions) * 365
      );

      const availableDays = totalDaysPerYear - owner.totalDaysBooked;

      /* CALCULATE AMOUNT OF DAYS OF NEW BOOKING */
      const fromNewProv = Number(Date.parse(fromNew));
      const toNewProv = Number(Date.parse(toNew));

      const difference = toNewProv - fromNewProv;

      const daysOfNewBooking = Math.round(difference / 86400000);

      /* CHECK DAYS ARE AVAILABLE */
      if (availableDays < daysOfNewBooking)
        throw new ConflictError(
          `days of new booking ${daysOfNewBooking} are more than available dats ${availableDays}`
        );

      //      return Booking.find((booking) => booking.user._id.toString === userId)
      return Booking.find({
        $and: [
          { property: propertyId },
          { "dates.from": { $lte: toNew } },
          { "dates.to": { $gte: fromNew } },
        ],
      });
    })
    .then((previousBookings) => {
      //toNew and fromNew check correct format

      if (previousBookings.length > 0)
        throw new ConflictError(
          "there is a previous reservation in range of dates chosen"
        );
      return Booking.create({
        user: userId,
        property: propertyId,
        dates: {
          from: fromNew,
          to: toNew,
        },
      });
    })
    .then(() => Property.findById(propertyId))
    .then((property) => {
      const owner = property.portions.find(
        (portion) => portion.owner.toString() === userId
      );

      /* CALCULATE AMOUNT OF DAYS OF NEW BOOKING */
      const fromNewProv2 = Number(Date.parse(fromNew));
      const toNewProv2 = Number(Date.parse(toNew));

      const difference = toNewProv2 - fromNewProv2;

      const daysOfNewBooking = Math.round(difference / 86400000);

      owner.totalDaysBooked += daysOfNewBooking;

      return property.save();
    });
}

module.exports = createBooking;
