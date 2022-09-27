const { runWithErrorHandling, createLogger } = require("../../utils");
const {
  bookings: { retrieveTotalBookingsOfAProperty },
} = require("../../logic");
const logger = createLogger(module);

module.exports = (req, res) => {
  runWithErrorHandling(
    () => {
      const { propertyId } = req.params;

      return retrieveTotalBookingsOfAProperty(userId, propertyId).then(
        (bookings) => res.status(200).json(bookings)
      );
    },
    res,
    logger
  );
};
