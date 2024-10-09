import { Request, Response } from "express";
import { snippetsRepository } from "./snippets.repository";

class SnippetsController {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async list(req: Request, res: Response): Promise<void> {
        const snippets = await snippetsRepository.findAll()

        return res.render('snippets/snippets_list', {snippets})
    }
}

export const snippetsController = new SnippetsController();