const Card = require('../models/card');

const getAllCards = (req, res) => {
  Card.find({}, '-__v')
    .populate('owner')
    .populate('likes')
    .then((Cards) => res.status(200).send(Cards))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const createCard = (req, res) => {
  const newCard = req.body;
  newCard.owner = req.user._id;
  Card.create(newCard)
    .then((card) => {
      res.status(201).send(card);
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

const deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new Error('NotValidId'))
    .then(() => res.status(200).send({ message: 'Пост удален' }))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Некоректный id карточки' });
      }
      return res.status(500).send({ message: 'Ошибка сервера' });
    });
};

const addLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate('likes')
    .orFail(new Error('NotValidId'))
    .then((card) => res.status(201).send({ likes: card.likes }))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Некоректный id карточки' });
      }
      return res.status(500).send({ message: 'Ошибка сервера' });
    });
};

const deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate('likes')
    .orFail(new Error('NotValidId'))
    .then((card) => res.status(200).send(card.likes))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Некоректный id пользователя' });
      }
      return res.status(500).send({ message: 'Ошибка сервера' });
    });
};

module.exports = {
  getAllCards,
  createCard,
  deleteCardById,
  addLike,
  deleteLike,
};
