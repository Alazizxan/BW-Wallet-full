const prisma = require('../../utils/prisma');
const { Telegraf } = require('telegraf');

// Telegraf botni o'z faylingizdan to'g'ri import qilishingiz kerak
const bot = new Telegraf(process.env.BOT_TOKEN);

// Botning kanalda admin ekanligini tekshirish uchun funksiya
async function isBotAdmin(channelId) {
  try {
    const chat = await bot.telegram.getChat(channelId);
    const botId = (await bot.telegram.getMe()).id;
    const chatMember = await bot.telegram.getChatMember(channelId, botId);
    return chatMember.status === 'administrator' || chatMember.status === 'creator';
  } catch (error) {
    console.error(`Error checking if bot is admin in channel ${channelId}:`, error.message);
    return false;
  }
}

// Userni kanalda a'zo bo'lganligini tekshirish uchun funksiya
async function isUserSubscribed(channelId, userId) {
  try {
    const chatMember = await bot.telegram.getChatMember(channelId, userId);
    return ['member', 'administrator', 'creator'].includes(chatMember.status);
  } catch (error) {
    console.error(`Error checking subscription for user ${userId} in channel ${channelId}:`, error.message);
    return null;
  }
}

// Har 10 soniyada vazifalarni tekshirish funksiyasi
async function pollTasks() {
  try {
    const userTasks = await prisma.userTask.findMany({
      include: {
        user: true,
        task: true,
      },
    });

    for (const userTask of userTasks) {
      const { user, task } = userTask;

      // Kanal ID dan '@' qo'shish va URL'ni to'g'irlash
      const channelId = task.link.replace('https://t.me/', '@');

      // Avval botning admin ekanligini tekshiramiz
      const isAdmin = await isBotAdmin(channelId);
      if (!isAdmin) {
        console.log(`Bot is not an admin in channel ${channelId}, skipping task check.`);
        continue;
      }

      // Foydalanuvchi a'zo ekanligini tekshirish
      const isSubscribed = await isUserSubscribed(channelId, user.telegramId);
      
      if (isSubscribed === false) {
        await prisma.user.update({
          where: { id: user.id },
          data: { balance: user.balance - task.cost },
        });

        await prisma.userTask.delete({
          where: {
            id: userTask.id,
          },
        });

        console.log(`User ${user.firstName} did not complete task ${task.title}. Balance deducted.`);
      }
    }
  } catch (error) {
    console.error('Error polling tasks:', error);
  } finally {
    setTimeout(pollTasks, 10000); // 10 soniyadan so'ng qayta ishlatish
  }
}

// Funksiyani eksport qilish
module.exports = {
  pollTasks,
};
