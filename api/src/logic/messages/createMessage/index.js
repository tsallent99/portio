const { Message, Property, User } = require("../../../models");
const { validateString } = require("validators");
const { verifyObjectIdString } = require("../../../utils");

const { SystemError, NotFoundError, ConflictError } = require("errors");

function createMessage(userId, propertyId, text) {
  verifyObjectIdString(userId, "user id");
  verifyObjectIdString(propertyId, "property id");
  // TODO validate property
  validateString(text, "text");

  return User.findById(userId)
    .lean()
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((user) => {
      if (!user) throw new NotFoundError(`user with id ${userId} not found`);

      return Property.findById(propertyId).lean();
    })
    .then((property) => {
      if (!property)
        throw new NotFoundError(
          `property with id ${propertyId} does not exist`
        );

      const isOwner = property.portions.some(
        (portion) => portion.owner.toString() === userId
      );

      if (!isOwner)
        throw new ConflictError(
          `user with id ${userId} isn't owner of the property with id ${propertyId} `
        );

      return Message.create({
        user: userId,
        property: propertyId,
        text,
      }).then((message) => {});
    });
}

module.exports = createMessage;
