import mongoose from "mongoose"
import {Server} from "socket.io";
import app from "./app.js";
import logger from "./configs/logger.config.js";
import SocketServer from "./SocketServer.js";

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


//socket.io
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.CLIENT_ENDPOINT
  }
})

io.on("connection", (socket) => {
  logger.info('socketio connected success')
  SocketServer(socket)
  socket.on('sendMessage', (msg) => {
    console.log(msg)
    io.emit('receiveMessage', msg+' received');
  })
})


//handle server errors
const exitHandler = () => {
  if (server) {
    logger.info("Server closed.");
    process.exit(1);
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
