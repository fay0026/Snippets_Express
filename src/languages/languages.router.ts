import express from 'express';
import { languagesController } from './languages.controller';
import expressAsyncHandler from 'express-async-handler'

const languagesRouter = express.Router();

languagesRouter.get('/', 
    expressAsyncHandler(languagesController.list),
    );

export default languagesRouter;