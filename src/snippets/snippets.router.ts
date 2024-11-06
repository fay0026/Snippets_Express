import express from 'express';
import { query, body } from 'express-validator';
import { snippetsController } from './snippets.controller';
import expressAsyncHandler from 'express-async-handler'
import { languageValidator } from '../languages/languages.middleware';
import { isAuthorConnected, isConnected } from '../auth/auth.middleware';
import { snippetValidator } from './snippets.middleware';

const router = express.Router();

router.get('/', 
    query('lang').optional().isInt().custom((value: number) => {
        return languageValidator(Number(value));
    }),
    expressAsyncHandler(snippetsController.list),
    );

router.get('/new',
    isConnected,
    expressAsyncHandler(snippetsController.newForm)
)

router.post('/new',
    isConnected,
    express.urlencoded({ extended: true }),
    body('title').isString().isLength({ min: 5, max: 50 }),
    body('lang').isInt().custom((value: number) => {
        return languageValidator(Number(value));
    }),
    body('code').isLength({ min: 1, max: 1000 }),
    body('description').isLength({ min: 0, max: 1000 }),
    expressAsyncHandler(snippetsController.newSnippet)
)

router.get('/edit/:id',
    isAuthorConnected,
    expressAsyncHandler(snippetsController.editForm)
)

router.post('/edit/:id',
    isAuthorConnected,
    express.urlencoded({ extended: true }),
    body('currentId').custom((value: number) => {
        return snippetValidator(Number(value))
    }),
    body('lang').isInt().custom((value: number) => {
        return languageValidator(Number(value));
    }),
    body('code').isLength({ min: 1, max: 1000 }),
    body('description').isLength({ min: 0, max: 1000 }),
    expressAsyncHandler(snippetsController.editSnippet)
)

export default router;