const Card = require('../models/card');

const getAllCards = (req, res) => {
  Card.find({}, '-__v')
    .populate('owner', '-__v')
    .populate('likes', '-__v')
    .then((Cards) => res.status(200).send(Cards))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const createCard = (req, res) => {
  const newCard = req.body;
  newCard.owner = req.user._id;
  Card.create(newCard)
    .populate('owner', '-__v')
    .then((card) => res.status(201).send(card))
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
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      return res.send({ data: card });
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const addLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate('likes', '-__v')
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      return res.send({ likes: card.likes });
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate('likes', '-__v')
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      return res.send({ likes: card.likes });
    })
    .catch((err) => console.log(err));
};

module.exports = {
  getAllCards,
  createCard,
  deleteCardById,
  addLike,
  deleteLike,
};
