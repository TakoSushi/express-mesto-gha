const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const routes = require('./routes');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
mongoose.connect(DB_URL)
  .then(() => {
    console.log('connected to bd');
  })
  .catch(() => console.log('No connection'));

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(limiter, routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
