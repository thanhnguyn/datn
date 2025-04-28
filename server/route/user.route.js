import { Router } from 'express';
import { forgotPasswordController, loginUserController, logoutController, refreshTokenController, registerUserController, removeImageFromCloudinaryController, resetPasswordController, resetPasswordController2, updateUserDetailsController, userAvatarController, userDetailsController, verifyEmailController, verifyForgotPasswordOtpController } from '../controllers/user.controller.js';
import auth from '../middlewares/auth.js';
import upload from '../middlewares/multer.js';

const userRouter = Router();

userRouter.post('/register', registerUserController);
userRouter.post('/verifyEmail', verifyEmailController);
userRouter.post('/login', loginUserController);
userRouter.get('/logout', auth, logoutController);
userRouter.put('/user-avatar', auth, upload.array('avatar'), userAvatarController);
userRouter.delete('/deleteImage', auth, removeImageFromCloudinaryController);
userRouter.put('/:id', auth, updateUserDetailsController);
userRouter.post('/forgot-password', forgotPasswordController);
userRouter.post('/verify-forgot-password-otp', verifyForgotPasswordOtpController);
userRouter.post('/reset-password', resetPasswordController);
userRouter.post('/reset-password2', resetPasswordController2);
userRouter.post('/refresh-token', refreshTokenController);
userRouter.get('/user-details', auth, userDetailsController);

export default userRouter;