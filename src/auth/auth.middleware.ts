import { Request, Response, NextFunction } from 'express';
import { snippetsRepository } from '../snippets/snippets.repository';
                
export default function sessionUser(req: Request, res: Response, next: NextFunction): void {
    res.locals.user = req.session.user;
    next();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function isConnected(req: Request, res: Response, next: NextFunction): void {
    if (! req.session.user) {
        res.render('auth/login_form');
    } else {
        next();
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function isAuthorConnected(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (! req.session.user) {
        res.render('auth/login_form');
    } else {

        const snippetCurrent = await snippetsRepository.findOne(parseInt(req.params.id))

        if (snippetCurrent) {
            const authorId = snippetCurrent.authorId;
            console.log(req.params.authorId)

            if (req.session.user.id != authorId) {
                throw new Error('Le mauvais utilisateur est connecté.')
            } else {
                next();
            }
        } else {
            throw new Error('Le snippet n\'existe pas')
        }
    }
}