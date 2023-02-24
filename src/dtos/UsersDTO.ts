import { BadRequestError } from "../errors/BadRequestError"

export interface CreateUserInputDTO {
    id: string,
    name: string,
    email: string,
    password: string,
    role: string

}

export interface CreateUserOutputDTO {
    message: string,
    token: string
}


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
        id: unknown,
        name: unknown,
        email: unknown,
        password: unknown,
        role: unknown
    ): CreateUserInputDTO {
        console.log("cu")
        console.log("antes", id)

        if (typeof id !== "string") {
            throw new BadRequestError("'id' deve ser string")
        }
        console.log("depois", id)

        if (typeof name !== "string") {
            throw new BadRequestError("'name' deve ser string")
        }

        if (typeof email !== "string") {
            throw new BadRequestError("'email' deve ser string")
        }

        if (typeof password !== "string") {
            throw new BadRequestError("'password' deve ser string")
        }
        if (typeof role !== "string") {
            throw new BadRequestError("'password' deve ser string")
        }
        const dto: CreateUserInputDTO = {
            id,
            name,
            email,
            password,
            role
        }

        return dto
    }



}



























