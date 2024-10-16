import { Snippet } from "@prisma/client";
import prisma from "../services/prisma";

class SnippetsRepository {
    async find(languageId: number|null): Promise<Snippet[]> {
        if (languageId) {
            const snippets = await prisma.snippet.findMany({
                include: {
                    language: true,
                    author: true,
                },
                where: {
                    languageId: languageId
                }
            });
            return snippets
        } else {
            const snippets = await prisma.snippet.findMany({
                include: {
                    language: true,
                    author: true
                }
            });
            return snippets
        }
    }
}

export const snippetsRepository = new SnippetsRepository();