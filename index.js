const express = require('express');
const app = express();
const env = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const budgetRoute = require('./routes/budget.route');

const cors = require('cors');

env.config();

mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log('Connected to mongodb!')
);

app.use(express.json());

app.use(cors());

app.use('/api/auth/user', authRoute);

// protected:
app.use('/api/budget', budgetRoute);

app.listen(process.env.LISTEN_PORT, () =>
  console.log(`Backend server running on ${process.env.LISTEN_PORT}`)
);
