const { User, Property } = require("../../../models");
const { NotFoundError, SystemError } = require("errors");
const { verifyObjectIdString } = require("../../../utils");

function retrievePropertiesOfUser(userId) {
  //debugger;
  verifyObjectIdString(userId, "user id");

  return User.findById(userId)
    .lean()
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((user) => {
      if (!user) throw new NotFoundError(`user with id ${userId} not found`);

      return (
        Property.find({ "portions.owner": userId })
          //return Property.find({ portions: [{ owner: userId }] })
          .lean()
          .catch((error) => {
            throw new SystemError(error.message);
          })
      );
    })
    .then((properties) => {
      //debugger;

      // sanitize

      properties.forEach((property) => {
        property.id = property._id.toString();

        delete property._id;
        delete property.__v;
      });

      return properties;
    });
}

module.exports = retrievePropertiesOfUser;
