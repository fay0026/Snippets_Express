import { NextFunction, Request, Response } from "express";
import { languagesRepository } from "./languages.repository";
import { validationResult } from "express-validator";

class LanguagesController {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async list(req: Request, res: Response, next: NextFunction): Promise<void> {
        const result = validationResult(req);
        if (result.isEmpty()) {
            const languages = await languagesRepository.findAll()
            return res.render('languages/languages_list', {languages})
        }
    }
}

export const languagesController = new LanguagesController();