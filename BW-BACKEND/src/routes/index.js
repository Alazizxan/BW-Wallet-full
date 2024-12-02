const {Router} = require('express');
const userRouter = require("./users-router");
const taskRouter = require("./task-router");
const walletRouter = require("./wallet-router");
const countdownRouter = require("./countdown-router");
const TopReferralsController = require('../controllers/topref-controller');
const AllUsersController = require("../controllers/AllUser-controller");
const errorMiddleware = require("../middlewares/error-middleware");
const userDetailsController = require("../controllers/useractivation-controller");
const transactionRouter = require('./transaction-router');
const transactionController = require('../controllers/transactionController');
const router = new Router();
const {activateUser} = require('../controllers/useractivation-controller');


router.use('/users', userRouter);
router.use('/tasks', taskRouter);
router.use('/wallet', walletRouter);
router.use('/countdown', countdownRouter);
router.get('/top-referrals', TopReferralsController.getTopReferrals);
router.get('/alluseradm', AllUsersController.getAllUser);
router.get('/user/details/:telegramId', userDetailsController.getUserDetails);
router.use('/user/activation/:telegramId', activateUser);
router.use('/transactions', transactionRouter);

router.use(errorMiddleware)

module.exports = router;