import { NextFunction, Request, Response } from "express";
import { snippetsRepository } from "./snippets.repository";
import { languagesRepository } from "../languages/languages.repository";
import { validationResult } from "express-validator";
import prisma from "../services/prisma";

class SnippetsController {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async list(req: Request, res: Response, next: NextFunction): Promise<void> {
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
        const body = req.body;

        const result = validationResult(req);

        if (! result.isEmpty()) {
            res.send({ errors: result.array() })
        } else {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const snippet = await prisma.snippet.create({
                data: {
                    title: body.title,
                    languageId: parseInt(body.lang),
                    code: body.code,
                    description: body.description,
                    creationDate: new Date()
                }
            })

            const snippets = await snippetsRepository.find(null)
            return res.render('snippets/snippets_list', {snippets})
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async editForm(req: Request, res: Response, next: NextFunction): Promise<void> {
        const idCurrent = req.params;
        const currentSnippet = await snippetsRepository.findOne(parseInt(idCurrent.id))
        const langs = await languagesRepository.findAll()
        return res.render('snippets/snippet_form', {langs, currentSnippet})
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async editSnippet(req: Request, res: Response, next: NextFunction): Promise<void> {
        const body = req.body;

        const result = validationResult(req);

        if (! result.isEmpty()) {
            res.send({ errors: result.array() })
        } else {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const snippet = await prisma.snippet.update({
                where: {
                    id: parseInt(body.currentId)
                },
                data: {
                    languageId: parseInt(body.lang),
                    code: body.code,
                    description: body.description
                }
            })

            const snippets = await snippetsRepository.find(null)
            return res.render('snippets/snippets_list', {snippets})
        }
    }
}

export const snippetsController = new SnippetsController();