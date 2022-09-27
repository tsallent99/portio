const express = require("express");
const { Router, json } = express;
const jsonBodyParser = json();
const {
  registerUserHandler,
  authenticateUserHandler,
  retrieveUserHandler,
} = require("./users");
const { retrievePropertiesOfUserHandler } = require("./properties");

const { createMessageHandler, retrieveMessagesHandler } = require("./messages");

const {
  createBookingHandler,
  retrieveTotalBookingsOfAPropertyHandler,
  retrieveUserBookingsOfAPropertyHandler,
  deleteBookingHandler,
  retrieveDeletedBookingsHandler,
} = require("./bookings");

const usersRouter = Router();

usersRouter.post("/users", jsonBodyParser, registerUserHandler);

usersRouter.post("/users/auth", jsonBodyParser, authenticateUserHandler);

usersRouter.get("/users", retrieveUserHandler);

const propertiesRouter = Router();

propertiesRouter.get(
  "/properties",
  jsonBodyParser,
  retrievePropertiesOfUserHandler
);

const bookingsRouter = Router();

bookingsRouter.post("/booking", jsonBodyParser, createBookingHandler);
bookingsRouter.delete("/booking/:bookingId/delete", deleteBookingHandler);
bookingsRouter.get(
  "/properties/:propertyId/bookings",
  jsonBodyParser,
  retrieveTotalBookingsOfAPropertyHandler
);

bookingsRouter.get(
  "/properties/deletedBookings",
  retrieveDeletedBookingsHandler
);

bookingsRouter.get(
  "/properties/:propertyId/bookings/user",
  jsonBodyParser,
  retrieveUserBookingsOfAPropertyHandler
);

const messagesRouter = Router();

messagesRouter.post(
  "/properties/:propertyId/messages",
  jsonBodyParser,
  createMessageHandler
);
messagesRouter.get("/properties/:propertyId/messages", retrieveMessagesHandler);

module.exports = {
  usersRouter,
  propertiesRouter,
  bookingsRouter,
  messagesRouter,
};
