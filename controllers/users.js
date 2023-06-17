const User = require('../models/user');

const createUser = (req, res) => {
  const newUser = req.body;
  User.create(newUser)
    .then(({
      name, about, avatar, _id,
    }) => res.status(201).send({
      name, about, avatar, _id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: `Переданые данные некорректны.
          ${Object.values(err.errors).map(() => err.message).join(', ')}`,
        });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error('NotValidId'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Некоректный id пользователя' });
      }
      return res.status(500).send({ message: 'Ошибка сервера' });
    });
};

const changeUserData = (req, res) => {
  const newUserData = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    newUserData,
    { new: true, runValidators: true },
  )
    .orFail(new Error('NotValidId'))
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: `Переданые данные некорректны.
          ${Object.values(err.errors).map(() => err.message).join(', ')}`,
        });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

const changeUserAvatar = (req, res) => {
  const newUserAvatar = req.body;
  User.findByIdAndUpdate(req.user._id, newUserAvatar, { new: true, runValidators: true })
    .orFail(new Error('NotValidId'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: `Переданые данные некорректны.
          ${Object.values(err.errors).map(() => err.message).join(', ')}`,
        });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  changeUserData,
  changeUserAvatar,
};
