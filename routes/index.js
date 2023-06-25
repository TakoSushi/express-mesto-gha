const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const authRouter = require('./auth');
const auth = require('../middlewares/auth');
const errorsHandler = require('../middlewares/errorshandler');
const NotFoundError = require('../errors/not-found-err');

router.use('', authRouter);

router.use(auth);

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

router.use('*', () => {
  // res.status(404).send({ message: 'Указан неверный путь' });
  throw new NotFoundError('Указан неверный путь');
});

router.use(errorsHandler);

module.exports = router;
