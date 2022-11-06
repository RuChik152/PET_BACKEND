import express from 'express'
const router = express.Router()
import {
	authUser,
	getAccessToken,
	registerUser,
	getUserProfile,
	logoutUser,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser)
router.post('/login', authUser)
router.get('/login/access-token', protect, getAccessToken)
router.get('/logout', logoutUser)

router.route('/profile').get(protect, getUserProfile)

export default router
