const prisma = require('../utils/prisma');
const ApiError = require('../errors/api-erros')

class TasksController {
    async create(req, res, next) {
        try {
            const {title, description, cost, link} = req.body;

            const task = await prisma.task.create({
                data: {
                    title: title,
                    description: description,
                    link: link,
                    cost: Number(cost)
                }
            })


            return res.json({message: "Task created", data: task});
        } catch (error) {
            next(error)
        }
    }

    async updateTask(req, res, next) {
        try {
            const task = await prisma.task.update({ where: { id: Number(req.params.id) }, data: req.body })
            console.log(task);
            
            return res.json({ message: "Task updated", data: task })
        } catch (error) {
            next(error)
        }
    }

    async deleteTask(req, res, next) {
        try {
            await prisma.userTask.deleteMany({ where: { taskId: Number(req.params.id) } })
            await prisma.task.delete({where: { id: Number(req.params.id) }});

            return res.json({ message: "Task deleted", data: true })
        } catch (error) {
            next(error)
        }
    }

    async all(req, res, next) {
        try {
            const tasks = await prisma.task.findMany({})
            
            return res.json({ message: "All tasks", data: tasks })
        } catch (error) {
            next(error)
        }
    }

    async task(req, res, next) {
        try {
            const task = await prisma.task.findFirst({ where: { id: Number(req.params.id )} })
            if (!task) return res.json({ message: "Task not found", data: [] })
            
            return res.json({ message: "Task", data: task })
        } catch (error) {
            next(error)
        }
    }

    // get tasks
    async tasks(req, res, next) {
        try {
            const tasks = await prisma.task.findMany();
            const user = await prisma.user.findFirst({ where: { telegramId: req.params.telegramId.toString() } });

            if (!user) return res.json({ message: "Tasks", data: {passedTasks: [], tasks: tasks }});

            const passedTasks = await prisma.userTask.findMany({
                where: { userId: req.params.id }
            });


            const passedTaskIds = new Set(passedTasks.map(task => task.taskId));

            const data = {
                passedTasks: [],
                tasks: []
            };

            tasks.forEach(task => {
                if (passedTaskIds.has(task.id)) {
                    data.passedTasks.push(task);
                } else {
                    data.tasks.push(task);
                }
            });

            return res.json({ message: "Tasks", data });
        } catch (error) {
            next(error);
        }
    }

    // pass task
    async passTask(req, res, next) {
        try {
            const { taskId, telegramId } = req.body

            const task = await prisma.task.findFirst({ where: {id: taskId} })
            const user = await prisma.user.findFirst({where: {telegramId: telegramId.toString()} });

            if (!task || !user) throw ApiError.BadRequest('Task not found')
            
            await prisma.user.update({where: { id: user.id }, data: { balance: user.balance+task.cost }})
            const passedTask = await prisma.userTask.create({ data: { taskId: taskId, userId: user.id } })

            return res.json({ message: "Task passed", data: passedTask });
        } catch (error) {
            next(error)
        }
    }



    // Yangi metod - top referrallarni olish
    async getTopReferrals(req, res, next) {
        try {
            const topReferrals = await prisma.user.findMany({
                select: {
                    firstName: true,
                    telegramId: true,
                    balance: true,
                    referralCount: true,
                    date: true,
                    time: true
                },
                orderBy: {
                    referralCount: 'desc'
                },
                take: 10
            });

            return res.json({ 
                message: "Top referrals", 
                data: topReferrals 
            });
        } catch (error) {
            next(error)
        }
    }

    //
}

module.exports = new TasksController()
