const prisma = require('./prisma');

async function getLatestCountdown() {
  return prisma.countdown.findFirst({ orderBy: { id: 'desc' } });
}

async function getAndEmitCountdown(socket) {
  try {
    const countdownDate = await getLatestCountdown();
    if (countdownDate) {
      socket.emit('countdownDate', countdownDate.date.getTime());
    }
  } catch (error) {
    console.error('Error fetching countdown:', error);
  }
}

module.exports = { getLatestCountdown, getAndEmitCountdown };