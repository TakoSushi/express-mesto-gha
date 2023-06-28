const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

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
    link: Joi.string().required().pattern(/^(https?:\/{2}|www\.)[-._~:/?#[\]@!$&'()*+,;=\w]+#?$/),
  }),
}), createCard);
router.delete('/:cardId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
}), deleteCardById);
router.put('/:cardId/likes', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
}), addLike);
router.delete('/:cardId/likes', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
}), deleteLike);

module.exports = router;
