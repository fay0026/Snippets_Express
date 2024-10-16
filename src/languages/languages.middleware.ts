import { snippetsRepository } from "../snippets/snippets.repository";

export async function languageValidator(languageId: number): Promise<boolean> {
    const snippets = await snippetsRepository.find(languageId)
    console.log(snippets)
    if (snippets.length == 0) {
        throw new TypeError('Le paramètre lang n\'est pas un language')
    } else {
        return true;
    }
}
