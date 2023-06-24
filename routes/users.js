const router = require('express').Router();
const {
  getAllUsers,
  getUserData,
  // getUserById,
  changeUserData,
  changeUserAvatar,
} = require('../controllers/users');

router.get('/', getAllUsers);
// router.get('/:userId', getUserById);

router.get('/me', getUserData);
router.patch('/me', changeUserData);
router.patch('/me/avatar', changeUserAvatar);

module.exports = router;
