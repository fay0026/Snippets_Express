import { User } from "@prisma/client";
import prisma from "../services/prisma";

class UserRepository {
    async find(userName: string|undefined): Promise<User> {
        const user = await prisma.user.findUnique({
            where: {
                name: userName
            }
        })
        if (user === null) {
            throw new EvalError("Cet utilisateur n'existe pas.")
        }
        return user
    }
}

export const userRepository = new UserRepository();