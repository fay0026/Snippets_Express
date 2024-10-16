import { Snippet } from "@prisma/client";
import prisma from "../services/prisma";

class SnippetsRepository {
    async findAll(languageId: number|null): Promise<Snippet[]> {
        if (languageId) {
            const snippets = await prisma.snippet.findMany({
                include: {
                    language: true,
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
                }
            });
            return snippets
        }
    }
}

export const snippetsRepository = new SnippetsRepository();