const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('connected to bd');
  })
  .catch(() => console.log('No connection'));

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());

// app.use((req, res, next) => {
//   req.user = {
//     _id: '649415b270c15807c3cd774c',
//   };
//   console.log(req.cookies.jwt);

//   next();
// });

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
