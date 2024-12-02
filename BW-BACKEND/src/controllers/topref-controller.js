const prisma = require('../utils/prisma');
const ApiError = require('../errors/api-erros');

class TopReferralsController {
    async getTopReferrals(req, res, next) {
        try {
            const topUsers = await prisma.user.findMany({
                select: {
                    firstName: true,
                    referralCount: true,
                    balance: true,
                    createdAt: true,
                },
                orderBy: {
                    referralCount: 'desc'
                },
                take: 10  // Getting top 10 users as shown in frontend
            });

            // Format data to match frontend expectations
            const formattedUsers = topUsers.map(user => ({
                firstName: user.firstName,
                referralCount: user.referralCount,
                earnings: user.balance,
                date: new Date(user.createdAt).toLocaleDateString()
            }));

            return res.json({
                message: "Top referrals",
                data: formattedUsers
            });

        } catch (error) {
            next(error);
        }
    }
}

module.exports = new TopReferralsController();