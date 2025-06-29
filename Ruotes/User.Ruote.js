const Ruoters = require('express')
const ruoter = Ruoters()
const UserController = require('../Controller/User.Controller')
const middelWars = require('../MiddleWars/MiddleWars.Task')

ruoter.post('/register' , UserController.Register)
ruoter.get('/profile', middelWars, UserController.showName);
ruoter.post('/login' , UserController.Login)

module.exports = ruoter

