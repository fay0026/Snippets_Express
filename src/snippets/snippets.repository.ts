import { Snippet } from "@prisma/client";
import prisma from "../services/prisma";

class SnippetsRepository {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async findAll(): Promise<Snippet[]> {
        const snippets = await prisma.snippet.findMany();
        return snippets
    }
}

export const snippetsRepository = new SnippetsRepository();