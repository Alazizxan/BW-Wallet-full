const { Router } = require('express');
const { 
    create, 
    tasks, 
    passTask, 
    all, 
    updateTask, 
    deleteTask, 
    task,
} = require('../controllers/tasks-controller');

const taskRouter = Router();

taskRouter.post('/create', create);
taskRouter.post('/update/:id', updateTask);
taskRouter.get('/delete/:id', deleteTask);
taskRouter.post('/pass', passTask);
taskRouter.get('/all/:telegramId', tasks);
taskRouter.get('/all', all);
taskRouter.get('/get/:id', task);
 // Yangi route

module.exports = taskRouter;