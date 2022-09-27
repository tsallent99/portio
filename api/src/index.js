require("dotenv").config();

const { connect, disconnect } = require("mongoose");
const { createLogger } = require("./utils");
const logger = createLogger(module);
const cors = require("cors");
const { name, version } = require("../package.json");

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;

connect(MONGODB_URI)
  .then(() => {
    logger.info("db connected");

    const express = require("express");

    const api = express();

    const {
      usersRouter,
      propertiesRouter,
      bookingsRouter,
      messagesRouter,
    } = require("./routes");

    api.use(cors());

    api.get("/", (req, res) => res.send(`${name} v${version} ;)`));

    api.use(
      "/api",
      usersRouter,
      propertiesRouter,
      bookingsRouter,
      messagesRouter
    );

    api.listen(PORT, () =>
      logger.info(`${name} v${version} started and listening in port ${PORT}`)
    );

    process.on("SIGINT", () => {
      if (!process.stopped) {
        process.stopped = true;

        logger.info("\napi stopped");

        disconnect().then(() => {
          logger.info("db disconnected");

          process.exit(0);
        });
      }
    });
  })
  .catch((error) => {
    debugger;
    logger.error(error);
  });
