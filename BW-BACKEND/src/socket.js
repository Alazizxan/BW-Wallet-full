const { getAndEmitCountdown } = require('./utils/countdown');

function initializeSocket(io) {
  io.on('connection', (socket) => {
    getAndEmitCountdown(socket);

    console.log('connected');
    

    socket.on('disconnect', () => {});
  });
}

module.exports = { initializeSocket };
