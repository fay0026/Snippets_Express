import { Language } from "@prisma/client";
import prisma from "../services/prisma";

class LanguagesRepository {
    async findAll(): Promise<Language[]> {
        const languages = await prisma.language.findMany({
            include: {
                _count: {
                    select: { snippets: true }
                }
            }
        });
        return languages
    }
}

export const languagesRepository = new LanguagesRepository();