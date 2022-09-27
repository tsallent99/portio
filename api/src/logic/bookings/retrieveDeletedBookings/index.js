const { DeletedBooking, User, Property } = require("../../../models");
const { SystemError, ConflictError, NotFoundError } = require("errors");

function retrieveDeletedBookings(userId) {
  return (
    Property.find({ "portions.owner": userId })
      //return Property.find({ portions: [{ owner: userId }] })
      .lean()
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then((properties) => {
        properties.forEach((property) => {
          return DeletedBooking.find({
            property: property._id,
            date: { $gte: Date.now() },
          });
        });
      })
      .then((deletedBookings) => {
        return deletedBookings;
      })
  );
}
module.exports = retrieveDeletedBookings;
