const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const { regexpLink } = require('../utils/regexp');
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
    avatar: Joi.string().pattern(regexpLink),
  }),
}), changeUserAvatar);

router.get('/:userId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().required().alphanum().length(24),
  }),
}), getUserById);

module.exports = router;
