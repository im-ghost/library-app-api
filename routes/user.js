const express = require('express')
const router = express.Router()
const {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} = require('../controllers/user.js')
const { protect } = require('../middleware/authMiddleware.js')
console.log(protect)

router.post("/",registerUser)
router.get("/",protect,  getUsers)
router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)/*
router
  .route('/:id')
  .delete(protect,  deleteUser)
  .get(protect,  getUserById)
  .put(protect,  updateUser)
*/
module.exports = router
