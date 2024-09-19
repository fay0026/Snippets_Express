/*import { NextFunction } from "express";
import { Request, Response } from "express";*/
import { snippetsRepository } from "./snippets.repository";

class SnippetsController {
    public list(/*req: Request, res: Response, next: NextFunction*/): void {
        console.log(snippetsRepository.findAll());
    }
}

export const snippetsController = new SnippetsController();