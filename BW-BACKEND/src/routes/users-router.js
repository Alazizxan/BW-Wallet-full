const {Router } = require('express');
const { register, friends, count } = require('../controllers/users-controller')

const userRouter = Router();

userRouter.post('/register', register);
userRouter.get('/count', count);
userRouter.get('/friends/:id', friends)

module.exports = userRouter;