import { BadRequestError } from "../errors/BadRequestError"

export interface CreateUserOutputDTO {
    name: string,
    email: string,
    password: string,
}
// export interface CreateUserInputDTO {
//     name: unknown,
//     email: unknown,
//     password: unknown
// }

// export interface CreateUserOutputDTO {
//     token: string
// }


export interface UserDbDTO {
    id: string,
    name: string,
    email: string,
    password: string,
    role: string,
    created_at: string
}
export interface LoginInputDTO {
    email: unknown,
    password: unknown
}

export interface LoginoutputDTO {
    token: string
}

export class UserDTO {

    public createUserDTO(
        name: unknown,
        email: unknown,
        password: unknown,
    ): CreateUserOutputDTO {

        if (typeof name !== "string") {
            throw new BadRequestError("'name' deve ser string")
        }

        if (typeof email !== "string") {
            throw new BadRequestError("'email' deve ser string")
        }

        if (typeof password !== "string") {
            throw new BadRequestError("'password' deve ser string")
        }

        const dto: CreateUserOutputDTO = {

            name,
            email,
            password

        }

        return dto
    }

}



























