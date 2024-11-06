import { snippetsRepository } from "../snippets/snippets.repository";

export async function snippetValidator(SnipId: number): Promise<boolean> {
    const snippet = await snippetsRepository.findOne(SnipId)
    if (! snippet) {
        throw new TypeError('Le paramètre lang n\'est pas un language')
    } else {
        return true;
    }
}
