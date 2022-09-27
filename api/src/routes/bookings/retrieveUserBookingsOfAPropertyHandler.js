const {
  runWithErrorHandling,
  createLogger,
  verifyToken,
} = require("../../utils");
const {
  bookings: { retrieveUserBookingsOfAProperty },
} = require("../../logic");
const logger = createLogger(module);

module.exports = (req, res) => {
  runWithErrorHandling(
    () => {
      const userId = verifyToken(req);
      const { propertyId } = req.params;

      return retrieveUserBookingsOfAProperty(userId, propertyId).then(
        (bookings) => res.status(200).json(bookings)
      );
    },
    res,
    logger
  );
};
