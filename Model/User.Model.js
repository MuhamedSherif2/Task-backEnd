const mongoose = require('mongoose')
const model = mongoose.Schema
const bcrypt = require('bcryptjs')

const UserModel = new model({
    name:String,
    email:String,
    password: String,
    role: String,
})

UserModel.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password , this.password)
}

module.exports = mongoose.model('users' , UserModel)