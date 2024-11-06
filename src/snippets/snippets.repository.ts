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

    async findOne(id: number): Promise<Snippet | null> {
        const snippet = await prisma.snippet.findFirst({
            include: {
                language: true,
                author: true,
            },
            where: {
                id: id
            }
        });
        return snippet
    }
}

export const snippetsRepository = new SnippetsRepository();