import express from 'express';
import {
    authUser,
    registerUser,
    getUserProfile,
    addUserAddress,
    deleteUserAddress
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile);
router.route('/profile/address').post(protect, addUserAddress);
router.route('/profile/address/:id').delete(protect, deleteUserAddress);

export default router;
