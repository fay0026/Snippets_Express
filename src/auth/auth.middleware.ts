import { Request, Response, NextFunction } from 'express';
                
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