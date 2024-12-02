const {Router} = require('express');
const {createWallet, getWallet, deleteWallet} = require("../controllers/wallet-controller");

const walletRouter = Router();


walletRouter.post('/create', createWallet);
walletRouter.delete('/delete/:id', deleteWallet);
walletRouter.get('/get/:id', getWallet);


module.exports = walletRouter;