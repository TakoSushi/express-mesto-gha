const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const {
  getAllUsers,
  getUserData,
  getUserById,
  changeUserData,
  changeUserAvatar,
} = require('../controllers/users');

router.get('/', getAllUsers);

router.get('/me', getUserData);
router.patch('/me', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), changeUserData);
router.patch('/me/avatar', celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().pattern(/^(https?:\/{2}|www\.)[-._~:/?#[\]@!$&'()*+,;=\w]+#?$/),
  }),
}), changeUserAvatar);

router.get('/:userId', getUserById);

module.exports = router;
