const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const { regexpLink } = require('../utils/regexp');

const {
  getAllCards,
  createCard,
  deleteCardById,
  addLike,
  deleteLike,
} = require('../controllers/cards');

router.get('/', getAllCards);

router.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(regexpLink),
  }),
}), createCard);

router.delete('/:cardId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), deleteCardById);

router.put('/:cardId/likes', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), addLike);

router.delete('/:cardId/likes', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), deleteLike);

module.exports = router;
