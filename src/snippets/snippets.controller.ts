import { NextFunction, Request, Response } from "express";
import { snippetsRepository } from "./snippets.repository";
import { validationResult } from "express-validator";

class SnippetsController {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async list(req: Request, res: Response, next: NextFunction): Promise<void> {
        const result = validationResult(req);
        if (result.isEmpty()) {
            if (req.query.lang) {
                const snippets = await snippetsRepository.findAll(Number(req.query.lang))
                return res.render('snippets/snippets_list', {snippets})
            } else {
                const snippets = await snippetsRepository.findAll(null)
                return res.render('snippets/snippets_list', {snippets})
            }
        } else {
            throw new TypeError('Le paramètre lang n\'est pas un integer');
        }
    }
}

export const snippetsController = new SnippetsController();