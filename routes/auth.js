const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const { regexpLink } = require('../utils/regexp');
const { createUser, login } = require('../controllers/users');

router.post('/signup', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regexpLink),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);
router.post('/signin', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

module.exports = router;
