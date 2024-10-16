import express from 'express';
import { authController } from './auth.controller';
import expressAsyncHandler from 'express-async-handler'
import { body } from 'express-validator';

const authRouter = express.Router();

authRouter.get('/login', 
    expressAsyncHandler(authController.loginForm),
    );

authRouter.post('/login',
    express.urlencoded({ extended: true }),
    body('name').isString(),
    body('password').isString(),
    expressAsyncHandler(authController.login),
    );

authRouter.get('/logout',
    expressAsyncHandler(authController.logout),
)

export default authRouter;