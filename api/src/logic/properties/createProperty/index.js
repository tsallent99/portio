const { User, Property } = require("../../../models");
const { NotFoundError, SystemError } = require("errors");
const { validateString } = require("validators");
const { verifyObjectIdString } = require("../../../utils");

/**
 * Creates a note for a user.
 *
 * @param {string} userId The user id.
 
 *
 * @returns {Promise}
 *
 * @throws {TypeError} If any of the arguments does not match the expected type.
 * @throws {FormatError} If any of the arguments does not match the expected format.
 *
 * @throws {NotFoundError} If the user is not found.
 * @throws {SystemError} If an error happens in db.
 */
function createProperty(userId, adress, pictures) {
  verifyObjectIdString(userId, "user id");

  return User.findById(userId)
    .lean()
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((user) => {
      if (!user) throw new NotFoundError(`user with id ${userId} not found`);

      return Property.create({
        adress: adress,
        pictures: pictures,
        portions: [{ owner: userId, shares: 1 }],
        totalPortions: 2,
      }).catch((error) => {
        throw new SystemError(error.message);
      });
    })
    .then((property) => {});
}

module.exports = createProperty;
