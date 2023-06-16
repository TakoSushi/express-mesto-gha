const User = require('../models/user');

const createUser = (req, res) => {
  const newUser = req.body;
  User.create(newUser)
    .then(() => res.send({ ...newUser }))
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
  User.find({}, '-__v')
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId, '-__v')
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.send({ ...user });
    })
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
};

const changeUserData = (req, res) => {
  const newUserData = req.body;
  User.findByIdAndUpdate(req.user._id, newUserData, { new: true, fields: '-__v' })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }

      return res.send({ user });
    })
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

const changeUserAvatar = (req, res) => {
  const newUserAvatar = req.body;
  User.findByIdAndUpdate(req.user._id, newUserAvatar, { new: true, fields: '-__v' })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      const {
        _id, name, about, avatar,
      } = user;
      return res.send({
        _id, name, about, avatar,
      });
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  changeUserData,
  changeUserAvatar,
};
