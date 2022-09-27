const {
  runWithErrorHandling,
  createLogger,
  verifyToken,
} = require("../../utils");
const {
  bookings: { retrieveDeletedBookings },
} = require("../../logic");
const logger = createLogger(module);

module.exports = (req, res) => {
  runWithErrorHandling(
    () => {
      const userId = verifyToken(req);

      return retrieveDeletedBookings(userId).then((deletedBookings) =>
        res.status(200).json(deletedBookings)
      );
    },
    res,
    logger
  );
};
