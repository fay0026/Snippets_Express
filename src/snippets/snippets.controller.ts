import { NextFunction, Request, Response } from "express";
import { snippetsRepository } from "./snippets.repository";
import { languagesRepository } from "../languages/languages.repository";
import { validationResult } from "express-validator";
import prisma from "../services/prisma";
import { isStringLiteralOrJsxExpression } from "typescript";
import { languageValidator } from "../languages/languages.middleware";

class SnippetsController {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async list(req: Request, res: Response, next: NextFunction): Promise<void> {
        console.log(req.session.user)
        const result = validationResult(req);
        if (result.isEmpty()) {
            if (req.query.lang) {
                const snippets = await snippetsRepository.find(Number(req.query.lang))
                return res.render('snippets/snippets_list', {snippets})
            } else {
                const snippets = await snippetsRepository.find(null)
                return res.render('snippets/snippets_list', {snippets})
            }
        } else {
            throw new TypeError('Le paramètre lang n\'est pas un integer');
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async newForm(req: Request, res: Response, next: NextFunction): Promise<void> {
        const langs = await languagesRepository.findAll()
        return res.render('snippets/snippet_form', {langs})
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async newSnippet(req: Request, res: Response, next: NextFunction): Promise<void> {
        const titleR = req.query.title;
        const langR = req.query.lang;
        const codeR = req.query.code;
        const descriptionR = req.query.description;
        if (typeof(titleR) == "string" && 
        typeof(langR) == "number" && await languageValidator(langR) &&
        typeof(codeR) == "string" && typeof(descriptionR) == "string") {
            const snippet = await prisma.snippet.create({
                data: {
                    title: titleR,
                    lang: langR,
                    code: codeR,
                    description: descriptionR
                }
            })
        } else {
            throw new Error('Les données transmises ne sont pas adéquates')
        }
    }
}

export const snippetsController = new SnippetsController();