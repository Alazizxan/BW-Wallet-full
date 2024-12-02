const prisma = require('./prisma');

async function createTriggerFunction() {
  try {
    await prisma.$executeRaw`
      CREATE OR REPLACE FUNCTION notify_countdown_changes()
      RETURNS trigger AS $$
      BEGIN
        PERFORM pg_notify('countdown_changes', NEW.id::text);
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `;

    await prisma.$executeRaw`DROP TRIGGER IF EXISTS countdown_changes_trigger ON "Countdown";`;
    await prisma.$executeRaw`
      CREATE TRIGGER countdown_changes_trigger
      AFTER INSERT OR UPDATE ON "Countdown"
      FOR EACH ROW
      EXECUTE FUNCTION notify_countdown_changes();
    `;
  } catch (error) {
    console.error('Error creating trigger:', error);
  }
}

async function listenToNotifications(io) {
  await prisma.$queryRaw`LISTEN countdown_changes`;

  prisma.$on('query', async (e) => {
    if (e.query.includes('NOTIFY')) {
      try {
        const latestCountdown = await prisma.countdown.findFirst({ orderBy: { id: 'desc' } });
        if (latestCountdown) {
          io.emit('countdownDate', latestCountdown.date.getTime());
        }
      } catch (error) {
        console.error('Error fetching updated countdown:', error);
      }
    }
  });
}

module.exports = { createTriggerFunction, listenToNotifications };
