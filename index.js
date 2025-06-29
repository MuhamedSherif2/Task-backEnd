require("dotenv").config();
const express = require('express');

const cors = require('cors');
const userRouter = require('./Ruotes/User.Ruote');
const taskRouter = require('./Ruotes/TaskRuote');
const app = express();
const db = require('./mongodb')
app.use(express.json());
db();

// const corsOptions = {
//   origin: ['https://task-front-end-beta.vercel.app'],
//   credentials: true
// };
app.use(cors());



app.use('/', userRouter);
app.use('/', taskRouter);

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`server run on port: ${port}`))