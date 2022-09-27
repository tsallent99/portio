const { Message, User } = require("../../../models");
const { SystemError, ConflictError, NotFoundError } = require("errors");
const { verifyObjectIdString } = require("../../../utils");

function retrieveMessages(userId, propertyId) {
  verifyObjectIdString(userId, "user id");
  verifyObjectIdString(propertyId, "user id");

  return User.findById(userId)
    .then((user) => {
      if (!user)
        throw new NotFoundError(`user with id ${userId} doesn't exist`);
    })
    .then(() => {
      return Message.find({ property: propertyId }).populate({
        path: "user",
        select: "name photo",
      });
    });
}
module.exports = retrieveMessages;
