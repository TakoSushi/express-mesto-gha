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
    name: Joi.string().min(2).max(30),
    link: Joi.string().pattern(/^(https?:\/{2}|www\.)[-._~:/?#[\]@!$&'()*+,;=\w]+#?$/),
  }),
}), createCard);
router.delete('/:cardId', deleteCardById);
router.put('/:cardId/likes', addLike);
router.delete('/:cardId/likes', deleteLike);

module.exports = router;
