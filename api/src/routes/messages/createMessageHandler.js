const {
  runWithErrorHandling,
  createLogger,
  verifyToken,
} = require("../../utils");
const {
  messages: { createMessage },
} = require("../../logic");
const { NotFoundError } = require("errors");
const logger = createLogger(module);

module.exports = (req, res) => {
  runWithErrorHandling(
    () => {
      const userId = verifyToken(req);

      const {
        body: { text },
        params: { propertyId },
      } = req;

      return createMessage(userId, propertyId, text)
        .then(() => res.status(201).send())
        .catch((error) => {
          if (error instanceof NotFoundError)
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
