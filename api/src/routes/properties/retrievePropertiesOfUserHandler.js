const {
  runWithErrorHandling,
  createLogger,
  verifyToken,
} = require("../../utils");
const {
  properties: { retrievePropertiesOfUser },
} = require("../../logic");
const logger = createLogger(module);

module.exports = (req, res) => {
  runWithErrorHandling(
    () => {
      const userId = verifyToken(req);

      return retrievePropertiesOfUser(userId).then((property) =>
        res.status(200).json(property)
      );
    },
    res,
    logger
  );
};
