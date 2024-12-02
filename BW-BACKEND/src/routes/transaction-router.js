const { Router } = require('express');
const {
    createTransaction,
    getTransactionsByTelegramId,
    getAllTransactions,
    deleteTransaction,
    updateTransaction,
} = require('../controllers/transactionController');

const transactionRouter = Router();

// Tranzaksiya yaratish
transactionRouter.post('/create', createTransaction);

// Telegram ID orqali tranzaksiyalarni olish
transactionRouter.get('/user/:telegramId', getTransactionsByTelegramId);

// Hamma tranzaksiyalarni olish
transactionRouter.get('/all', getAllTransactions);

// Tranzaksiya o'chirish
transactionRouter.delete('/delete/:id', deleteTransaction);

// Tranzaksiya yangilash
transactionRouter.post('/update/:id', updateTransaction);


module.exports = transactionRouter;
