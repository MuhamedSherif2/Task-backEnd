const mongoose = require('mongoose')
const Model = mongoose.Schema

const TaskModels = new Model({
    title: String,
    description: String,
    status: String
})

module.exports = mongoose.model('Tasks' , TaskModels)