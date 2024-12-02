const prisma = require('../utils/prisma');
const ApiError = require('../errors/api-erros');

class WalletController {
    async createWallet(req, res, next) {
        try {
            const {userId, walletAddress} = req.body;            
    
            const wallet = await prisma.wallet.create({ data: { walletAddress: walletAddress, userId: userId } });
            return res.json({ message: "Wallet created", data: wallet });
        } catch (error) {
            next(error);
        }
    }
    

    async deleteWallet(req, res, next) {
        try {
            const { id } = req.params

            const wallet = await prisma.wallet.deleteMany({ where: { userId: Number(id) }});
            return res.json({ message: "Wallet deleted", data: wallet })
        } catch (error) {
            next(error)
        }
    }


    async widthdrawral(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }

    async getWallet(req, res, next) {
        try {
            const wallet = await prisma.wallet.findFirst({where:  { userId: Number(req.params.id) }});
            if (!wallet) return res.json({message: "Wallet not found", data: false})

            return res.json({ message: "Wallet created", data: wallet })
        } catch  (error) {
            next(error);
        }
    }
}

module.exports = new WalletController()