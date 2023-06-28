const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const BadRequestError = require('../errors/bad-request-err');

const createUser = (req, res, next) => {
  const newUser = req.body;
  if (!newUser.password || !newUser.email) {
    throw new UnauthorizedError('Вы забыли указать почту или пароль');
  }

  bcrypt.hash(newUser.password, 10)
    .then((hash) => User.create({
      name: newUser.name,
      about: newUser.about,
      avatar: newUser.avatar,
      email: newUser.email,
      password: hash,
    }))
    .then(({
      name, about, avatar, _id, email,
    }) => res.status(201).send({
      name, about, avatar, _id, email,
    }))
    .catch(next);
};

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch(next);
};

const getUserData = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch(next);
};

const changeUserData = (req, res, next) => {
  const newUserData = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    newUserData,
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.send({ user }))
    .catch(next);
};

const changeUserAvatar = (req, res, next) => {
  const newUserAvatar = req.body;
  User.findByIdAndUpdate(req.user._id, newUserAvatar, { new: true, runValidators: true })
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!password || !email) {
    throw new UnauthorizedError('Вы забыли указать почту или пароль');
  }
  if (password.length < 8) {
    throw new BadRequestError('Минимальная длина пароля - 8 символов');
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        { expiresIn: '7d' },
      );
      res.status(200).cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      })
        .send({ message: 'Авторизация прошла успешно' })
        .end();
    })
    .catch(next);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserData,
  getUserById,
  changeUserData,
  changeUserAvatar,
  login,
};
