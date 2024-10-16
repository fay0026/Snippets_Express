import express from 'express';
import { query } from 'express-validator';
import { snippetsController } from './snippets.controller';
import expressAsyncHandler from 'express-async-handler'
import { languageValidator } from '../languages/languages.middleware';

const router = express.Router();

router.get('/', 
    query('lang').optional().isInt().custom((value: number) => {
        return languageValidator(Number(value));
    }),
    expressAsyncHandler(snippetsController.list),
    );

export default router;