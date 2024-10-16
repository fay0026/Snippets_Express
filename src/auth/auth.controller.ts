import { NextFunction, Request, Response } from "express";
import { userRepository } from "./user.repository";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { validationResult } from "express-validator";

class AuthController {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loginForm(req: Request, res: Response, next: NextFunction): void {
        return res.render('auth/login_form');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        
        const result = validationResult(req);

        if (! result.isEmpty()) {
            res.send({ errors: result.array() })
        } else {
            const authUser: User = await userRepository.find(req.body.name)

            if (authUser !== null) {

                if (bcrypt.compareSync(req.body.password, authUser.hashedPassword)) {
                    req.session.regenerate((err) => {
                        if (! err) {
                            req.session.user = authUser
                            return res.redirect('/');
                        }
                    })
                    
                } else {
                    throw new Error('Mauvais mot de passe');
                }

            } else {
                throw new Error('Mauvais identifiant');
            }
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
        req.session.destroy(() => {})
        return res.redirect('/');
    }
}

export const authController = new AuthController();