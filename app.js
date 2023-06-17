const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const routes = require('./routes');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('connected to bd');
  })
  .catch(() => console.log('No connection'));

const app = express();

app.use(helmet());
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '6486fa388289247680e2c6c3',
  };

  next();
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
