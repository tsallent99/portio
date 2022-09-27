const {
  runWithErrorHandling,
  createLogger,
  verifyToken,
} = require("../../utils");
const {
  bookings: { deleteBooking },
} = require("../../logic");
const { SystemError } = require("errors");
const logger = createLogger(module);

module.exports = (req, res) => {
  runWithErrorHandling(
    () => {
      const userId = verifyToken(req);

      const { bookingId } = req.params;

      return deleteBooking(userId, bookingId)
        .then(() => res.status(204).send())
        .catch((error) => {
          if (error instanceof SystemError)
            res.status(409).json({ error: error.message });
          else res.status(500).json({ error: "Unknown error" });

          logger.error(error);

          return;
        });
    },
    res,
    logger
  );
};
