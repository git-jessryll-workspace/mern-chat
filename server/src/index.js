import mongoose from "mongoose"
import app from "./app.js";
import logger from "./configs/logger.config.js";

const PORT = process.env.PORT | 8000;

let server;

const {DATABASE_URL} = process.env;

// exit on mongoose error

mongoose.connection.on('error', (err) => {
    logger.error(`Mongodb connection error: ${err}`)
    process.exit(1)
})

// mongodb debug mode
if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true);
}


//mongodb connection
mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    logger.info('Connected moongoDB')
})

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
