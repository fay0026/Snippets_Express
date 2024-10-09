import express from 'express';
import { snippetsController } from './snippets.controller';
import expressAsyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/', expressAsyncHandler(snippetsController.list));

export default router;