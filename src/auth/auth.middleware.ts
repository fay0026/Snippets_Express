import { Request, Response, NextFunction } from 'express';
                
export default function sessionUser(req: Request, res: Response, next: NextFunction): void {
    res.locals.user = req.session.user;
    next();
}