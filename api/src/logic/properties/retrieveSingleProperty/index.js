const { User, Property } = require("../../../models");
const { NotFoundError, SystemError } = require("errors");
const { verifyObjectIdString } = require("../../../utils");

function retrieveSingleProperty(userId, propertyId) {
  //debugger;
  verifyObjectIdString(userId, "user id");

  return User.findById(userId)
    .lean()
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((user) => {
      if (!user) throw new NotFoundError(`user with id ${userId} not found`);

      return Property.findById(propertyId)

        .lean()
        .catch((error) => {
          throw new SystemError(error.message);
        });
    })
    .then((property) => {
      //debugger;
      return property;
    });
}

module.exports = retrieveSingleProperty;
