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

mongoose.connect(process.env.MONGOO_URL)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ Connection error:', err)
);

app.use('/', userRouter);
app.use('/', taskRouter);
app.get('/', (req, res) => {
  res.send('API is working 🌟');
});

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`server run on port: ${port}`))