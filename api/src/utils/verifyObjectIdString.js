const {
  Types: { ObjectId },
} = require("mongoose");

function verifyObjectIdString(objectId, explain = "Object Id") {
  if (!ObjectId.isValid(objectId))
    throw new FormatError(`${explain} is not valid`);
}

module.exports = verifyObjectIdString;
