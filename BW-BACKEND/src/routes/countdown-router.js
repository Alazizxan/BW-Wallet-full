const {Router } = require('express');
const {getDate, updateCountdown, createCountdown} = require('../controllers/countdown-controller')

const countdownRouter = Router();

countdownRouter.get('/get', getDate);
countdownRouter.post('/update', updateCountdown);
countdownRouter.post('/create', createCountdown );


module.exports = countdownRouter;