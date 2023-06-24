const router = require('express').Router();
const auth = require('../middlewares/auth');
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const authRouter = require('./auth');

router.use('', authRouter);

router.use(auth);

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

router.use('*', (req, res) => {
  res.status(404).send({ message: 'Указан неверный путь' });
});

module.exports = router;
