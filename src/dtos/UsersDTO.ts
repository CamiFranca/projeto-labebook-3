import { BadRequestError } from "../errors/BadRequestError"

export interface CreateUserInputDTO {
    id: string,
    name: string,
    email: string,
    password: string,
    role: string

}

export class UserDTO {

    public createUserDTO(
        id: unknown,
        name: unknown,
        email: unknown,
        password: unknown,
        role: unknown
    ) {

        if (typeof id !== "string") {
            throw new BadRequestError("'id' deve ser string")
        }

        if (typeof name !== "string") {
            throw new BadRequestError("'name' deve ser string")
        }

        if (typeof email !== "string") {
            throw new BadRequestError("'email' deve ser string")
        }

        if (typeof password !== "string") {
            throw new BadRequestError("'password' deve ser string")
        }
        const dto = {
            id,
            name,
            email,
            password,
            role
        }
        return dto
    }

}



























