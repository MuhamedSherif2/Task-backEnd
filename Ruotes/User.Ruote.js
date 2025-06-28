const Ruoters = require('express')
const ruoter = Ruoters()
const UserController = require('../Controller/User.Controller')

ruoter.post('/register' , UserController.Register)
ruoter.get('/register' , UserController.Register)
ruoter.post('/login' , UserController.Login)

module.exports = ruoter

