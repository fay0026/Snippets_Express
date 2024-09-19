class SnippetsRepository {
    public findAll(): unknown {
        throw new Error("Ceci est un message d'erreur");
    }
}

export const snippetsRepository = new SnippetsRepository();