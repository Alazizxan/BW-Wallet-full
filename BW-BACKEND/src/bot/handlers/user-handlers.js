
const prisma = require('../../utils/prisma');
const time = require('../../utils/time');
const { mainButtons } = require('../buttons');

const start = async ctx => {
    const telegramId = ctx.from?.id ? ctx.from.id.toString() : null;
    
    if (!telegramId) {
        console.error('Foydalanuvchi ID si topilmadi');
        return;
    }

    const startParam = ctx.startPayload || '';

    try {
        const mavjudFoydalanuvchi = await prisma.user.findFirst({ 
            where: { telegramId } 
        });

        if (mavjudFoydalanuvchi) {
            return await ctx.replyWithHTML(
                `Salom! 🚀 <b>Black Wallet</b>ga xush kelibsiz – kripto savdoning eng qulay platformasi! 📲 Eng so'nggi manbalarda sizning imkoniyatlaringiz cheksiz!\n\nYangi yangilik! Telegram mini-ilova 🌐 orqali bugun punktlar yig'a boshlang! 🌠\n\nDo'stlaringizni taklif qiling – ko'proq do'stlar, ko'proq imkoniyatlar! 🌱\n\n<b>Black Wallet</b>da o'sish va rivojlanish davom etadi! 💸`,
                mainButtons
            );
        }

        let taklifQiluvchiMalumot = null;
        if (startParam) {
            taklifQiluvchiMalumot = await prisma.user.findFirst({
                where: { telegramId: startParam }
            });
        }

        let profileImage = null;
        try {
            const rasmlar = await ctx.telegram.getUserProfilePhotos(ctx.from.id);
            if (rasmlar && rasmlar.photos && rasmlar.photos[0] && rasmlar.photos[0][0]) {
                profileImage = rasmlar.photos[0][0].file_id;
            }
        } catch (photoError) {
            console.error('Profil rasmini olishda xato:', photoError);
        }

        const yangiFoydalanuvchi = await prisma.user.create({
            data: {
                firstName: ctx.from?.first_name || 'Anonim Foydalanuvchi',
                telegramId: telegramId,
                profileImage: profileImage,
                date: time().formattedDate,
                time: time().formattedTime,
                referall: taklifQiluvchiMalumot ? startParam : null,
                balance: 0,
                referralCount: 0
            }
        });

        if (taklifQiluvchiMalumot) {
            await prisma.user.update({
                where: { telegramId: startParam },
                data: { 
                    balance: { increment: 100 },
                    referralCount: { increment: 1 }
                }
            });
        }

        return await ctx.replyWithHTML(
            `Salom! 🚀 <b>Black Wallet</b>ga xush kelibsiz – kripto savdoning eng qulay platformasi! 📲 Eng so'nggi manbalarda sizning imkoniyatlaringiz cheksiz!\n\nYangi yangilik! Telegram mini-ilova 🌐 orqali bugun punktlar yig'a boshlang! 🌠\n\nDo'stlaringizni taklif qiling – ko'proq do'stlar, ko'proq imkoniyatlar! 🌱\n\n<b>Black Wallet</b>da o'sish va rivojlanish davom etadi! 💸`,
            mainButtons
        );
    } catch (error) {
        console.error('Start handler xatosi:', error);
        await ctx.replyWithHTML('Kechirasiz, tizimda muammo yuz berdi. Iltimos, keyinroq qayta urinib ko\'ring.');
    }
};

module.exports = {
    start
};
