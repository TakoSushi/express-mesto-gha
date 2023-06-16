const router = require('express').Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  changeUserData,
  changeUserAvatar,
} = require('../controllers/users');

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.patch('/me', changeUserData);
router.patch('/me/avatar', changeUserAvatar);

module.exports = router;
