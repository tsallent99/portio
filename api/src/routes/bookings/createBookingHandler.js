const {
  runWithErrorHandling,
  createLogger,
  verifyToken,
} = require("../../utils");
const {
  bookings: { createBooking },
} = require("../../logic");
const { ConflictError } = require("errors");
const logger = createLogger(module);

module.exports = (req, res) => {
  runWithErrorHandling(
    () => {
      const userId = verifyToken(req);

      const {
        body: { propertyId, dateFrom, dateTo },
      } = req;

      return createBooking(userId, propertyId, dateFrom, dateTo)
        .then(() => res.status(201).send())
        .catch((error) => {
          if (error instanceof ConflictError)
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
