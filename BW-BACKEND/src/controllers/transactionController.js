const prisma = require('../utils/prisma');
const ApiError = require('../errors/api-erros');

class TransactionsController {
    // 1. Tranzaksiya yaratish
    async createTransaction(req, res, next) {
        try {
            const { cryptoName, amount, description, telegramId } = req.body;
    
            const user = await prisma.user.findFirst({
                where: { telegramId: telegramId },
            });
    
            if (!user) {
                throw ApiError.BadRequest('User not found');
            }
    
            const transaction = await prisma.transaction.create({
                data: {
                    userId: user.id,
                    cryptoName,
                    amount: parseFloat(amount),
                    description: description || "null",
                },
            });
    
            return res.json({ message: "Transaction created", data: transaction });
        } catch (error) {
            next(error);
        }
    }

    // 2. Telegram ID orqali tranzaksiyalarni olish
    async getTransactionsByTelegramId(req, res, next) {
        try {
            const { telegramId } = req.params;

            const user = await prisma.user.findFirst({
                where: { telegramId: telegramId.toString() },
            });

            if (!user) {
                return res.json({ message: "No transactions found", data: [] });
            }

            const transactions = await prisma.transaction.findMany({
                where: { userId: user.id },
            });

            return res.json({ message: "Transactions", data: transactions });
        } catch (error) {
            next(error);
        }
    }

    // 3. Hamma tranzaksiyalarni olish
    async getAllTransactions(req, res, next) {
        try {
            const transactions = await prisma.transaction.findMany({
                include: { user: true },
            });

            return res.json({ message: "All transactions", data: transactions });
        } catch (error) {
            next(error);
        }
    }

    // 4. Tranzaksiya o'chirish
    async deleteTransaction(req, res, next) {
        try {
            const { id } = req.params;

            await prisma.transaction.delete({
                where: { id: Number(id) },
            });

            return res.json({ message: "Transaction deleted", data: true });
        } catch (error) {
            next(error);
        }
    }

    // 5. Tranzaksiya yangilash
    async updateTransaction(req, res, next) {
        try {
            const { id } = req.params;
            const updatedTransaction = await prisma.transaction.update({
                where: { id: Number(id) },
                data: req.body,
            });

            return res.json({ message: "Transaction updated", data: updatedTransaction });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new TransactionsController();
