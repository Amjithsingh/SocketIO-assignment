const app = require('express')();
const socketIo = require('socket.io');
const http = require('http');

const server = http.createServer(app, {
    pingTimeout: 60000
});
const io = socketIo(server);

server.listen(8000);

const sendNotification = (topic, payload) => {
    try {
        io.emit(topic, payload);
    } catch (error) {
        logger.error(`Error: ${error.code}`);
    }
};

module.exports = {
    sendNotification,
    io,
    server
};
