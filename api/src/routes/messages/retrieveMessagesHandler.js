const {
  runWithErrorHandling,
  createLogger,
  verifyToken,
} = require("../../utils");
const {
  messages: { retrieveMessages },
} = require("../../logic");
const { NotFoundError, FormatError } = require("errors");
const logger = createLogger(module);

module.exports = (req, res) => {
  runWithErrorHandling(
    () => {
      const userId = verifyToken(req);
      const { propertyId } = req.params;

      return retrieveMessages(userId, propertyId)
        .then((messages) => res.status(200).json(messages))
        .catch((error) => {
          if (error instanceof NotFoundError)
            res.status(409).json({ error: error.message });
          else if (error instanceof FormatError)
            res.status(409).json({ error: error.message });
          else res.status(500).json({ error: "system error" });

          logger.error(error);

          return;
        });
    },
    res,
    logger
  );
};
