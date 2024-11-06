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

router.get('/new',
    expressAsyncHandler(snippetsController.newForm)
)

router.post('/new',
    query('title').isString().isLength({ min: 5, max: 50 }),
    query('lang').isInt().custom((value: number) => {
        return languageValidator(Number(value));
    }),
    query('code').isLength({ min: 1, max: 1000 }),
    query('description').isLength({ min: 0, max: 1000 }),
)

export default router;