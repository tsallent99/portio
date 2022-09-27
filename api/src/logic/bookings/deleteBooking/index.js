const { Booking, Property, User } = require("../../../models");
const {
  SystemError,
  ConflictError,
  NotFoundError,
  AuthError,
} = require("errors");

function deleteBooking(userId, bookingId) {
  //   return Booking.findOneAndDelete({
  //     _id: bookingId,
  //     user: userId,
  //     date: { $gte: Date.now() },
  //   })
  return Booking.findById(bookingId)

    .then((booking) => {
      if (!booking) throw new NotFoundError("TODODODODODO");

      if (booking.user.toString() !== userId)
        throw new AuthError("TODOTODODODOD");

      booking.state = "cancel";

      return booking.save();
    })
    .then((booking) => {
      return Property.findById(booking.property);
    })

    .then((property) => {
      const otherOwners = property.portions.filter((portion) => {
        portion.owner.toString() !== userId;
      });
      return User.find({ _id: { $in: otherOwners } });
    })
    .then((users) => {
      users.forEach((user) => {
        user.notifications.push({
          text: `user with id ${userId} has cancelled a booking of a property that shares with you`,
        });
        return user.save();
      });
    });

  // RECUPERAR LOS OWNERS CON USER.FIND
  // TODO AGREGAR LAS NOTIFICACIONES A LOS OTROS USERS
  // GUARDAR LOS USERS CON .SAVE()
  // MODIFICAR LA PROPIEDAD TOTALDAYSBOOKED DEL USUARIO QUE CANCELÓ LA RESERVA
}

module.exports = deleteBooking;
