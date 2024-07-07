import express from 'express'
import userController from '../controllers/userController.js';
import checkUserAuth from '../middlewares/auth-middleware.js';

const router = express.Router()

// Middleware Protection

router.use('/change-pass',checkUserAuth)
router.use('/dashboard',checkUserAuth)

// public routes

router.post('/register',userController.Registration)
router.post('/login',userController.Login)
router.post('/reset-pass',userController.ResetPasswordEmail)
router.post('/reset-pass/:id/:token',userController.ResetPassword)

// protected routes

router.post('/change-pass',userController.ChangePassword)
router.get('/dashboard',userController.LoggedUser)

export default router;