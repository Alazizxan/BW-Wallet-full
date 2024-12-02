const prisma = require('../utils/prisma');
const time = require('../utils/time');

class UsersController {
    async register(req, res, next) {
        try {
            const { firstName, profileImage, telegramId, referall } = req.body;
            const candidate = await prisma.user.findFirst({ where: { telegramId: telegramId.toString() } });

            if (candidate) return res.json({ message: "This user already exists", data: candidate });
            else {
                if (referall) {
                    const reffer = await prisma.user.findFirst({ where: { telegramId: referall.toString() } })
                    if (reffer) {
                        await prisma.user.update({ where: { telegramId: referall }, data: { balance: reffer.balance + 100, referralCount: reffer.referralCount + 1 } })
                    }
                }

                const user = await prisma.user.create({
                    data: {
                        firstName: firstName,
                        profileImage: profileImage,
                        telegramId: telegramId.toString(),
                        referall: referall.toString(),
                        date: time(new Date().toString()).formattedDate,
                        time: time(new Date().toString()).formattedTime
                    }
                });

                return res.json({ message: "User created", data: user });
            }

        } catch (error) {
            next(error);
        }
    }

    async count(req, res, next) {
        try {
            const count = await prisma.user.count()
            return res.json({ message: "Count", data: count });
        } catch (error) {
            next(error);
        }
    }


    async friends(req, res, next) {
        try {
            const friends = await prisma.user.findMany({ where: { referall: req.params.id.toString() } })
            return res.json({ message: "Friends", data: friends });
        } catch (error) {
            next(error);
        }
    }
}


module.exports = new UsersController();
