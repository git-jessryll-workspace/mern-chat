import app from "./app.js";
import logger from "./configs/logger.config.js";

const PORT = process.env.PORT | 8000;

let server;

server = app.listen(PORT, () => {
  logger.info(`Listen to ${PORT}`);
});

//handle server errors
const exitHandler = () => {
  if (!server) {
    process.exit(1);
  } else {
    logger.info("Server closed.");
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
