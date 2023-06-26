const router = require('express').Router();
const {
  getAllUsers,
  getUserData,
  getUserById,
  changeUserData,
  changeUserAvatar,
} = require('../controllers/users');

router.get('/', getAllUsers);

router.get('/me', getUserData);
router.patch('/me', changeUserData);
router.patch('/me/avatar', changeUserAvatar);

router.get('/:userId', getUserById);

module.exports = router;
