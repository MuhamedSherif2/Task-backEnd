const Ruoter = require('express')
const TaskController = require('../Controller/TaskController')
const middelWars = require('../MiddleWars/MiddleWars.Task')
const ruoter = Ruoter()

ruoter.post('/cart', middelWars, TaskController.createTask)
ruoter.get('/getOne',middelWars ,TaskController.getAllTasks)
ruoter.get('/cart/:id', middelWars, TaskController.getOneTask)
ruoter.put('/cart/:id', middelWars, TaskController.updateTask)
ruoter.delete('/cart/:id', middelWars, TaskController.deleteTask)

module.exports = ruoter