const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

const getAllCards = (req, res, next) => {
  Card.find({}, '-__v')
    .populate(['owner, likes'])
    .then((Cards) => res.status(200).send(Cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const newCard = req.body;
  newCard.owner = req.user._id;
  Card.create(newCard)
    .then((card) => {
      res.status(201).send(card);
    })
    .catch(next);
};

const deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => {
      if (card.owner.equals(req.user._id)) {
        return Card.findByIdAndDelete(req.params.cardId)
          .then(() => res.status(200).send({ message: 'Пост удален' }));
      }
      throw new ForbiddenError('Недостаточно прав');
    })
    .catch(next);
};

const addLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate('likes')
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => res.status(200).send({ likes: card.likes }))
    .catch(next);
};

const deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate('likes')
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => res.status(200).send(card.likes))
    .catch(next);
};

module.exports = {
  getAllCards,
  createCard,
  deleteCardById,
  addLike,
  deleteLike,
};
