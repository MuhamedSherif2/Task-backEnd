require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./Ruotes/User.Ruote');
const taskRouter = require('./Ruotes/TaskRuote');
const app = express();

app.use(express.json());

const corsOptions = {
  origin: ['https://task-front-end-beta.vercel.app'],
  credentials: true
};
app.use(cors(corsOptions));

mongoose.connect('mongodb+srv://Mag:mohammed26122003@mohammed.kxps2xh.mongodb.net/?appName=Mohammed')
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log(`MongoDB Error: ${error}`)
);

app.use('/', userRouter);
app.use('/', taskRouter);

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`server run on port: ${port}`))