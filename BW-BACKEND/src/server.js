const http = require('http');
const socket = require('socket.io');
const app = require('./app');
const prisma = require('./utils/prisma');
const bot = require('./bot/index');

const { initializeSocket } = require('./socket');
const { createTriggerFunction, listenToNotifications } = require('./utils/trigger');

// Create the server
const server = http.createServer(app);
const io = new socket.Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Start the server
async function startServer() {
  try {
    // Connect to Prisma
    await prisma.$connect();
    console.log('> Connected to the database');

    // Set up database triggers and listen for notifications
    await createTriggerFunction();
    await listenToNotifications(io);

    // Initialize socket.io
    initializeSocket(io);

    // Start the Telegram bot
    bot.launch();
    console.log("> Telegram bot started");

    // Listen on the specified port, binding to 0.0.0.0 to accept inbound requests
    const port = process.env.PORT || 3000; // Use environment variable or default to 3000
    server.listen(port, '0.0.0.0', () => {
      console.log(`> Listening on port ${port}`);
    });
  } catch (error) {
    console.error('Error during server startup:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  try {
    await prisma.$disconnect();
    console.log('> Disconnected from database');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
  process.exit(1);
});

// Start the server
startServer();
