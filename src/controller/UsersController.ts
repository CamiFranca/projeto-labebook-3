import { Request, Response } from "express"
import { UserBusiness } from "../business/UsersBusiness"
import { LoginInputDTO} from "../dtos/UserDTO"
import { BaseError } from "../errors/BaseError"
import { UserDTO } from "../dtos/UserDTO"



export class UserController {
    constructor(
        private userBusiness: UserBusiness,
        private userDTO : UserDTO

    ) { }
    public getUsers = async (req: Request, res: Response) => {

        try {

            const q = req.query.q as string

            const output = await this.userBusiness.getUser(q)

            res.status(200).send(output)

        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado.")
            }
        }
    }

    public getUsersById = async (req: Request, res: Response) => {

        try {

            const id = req.params.id as string

            const output = await this.userBusiness.getUser(id)

            res.status(200).send(output)

        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado.")
            }
        }
    }
    //----------------------------------------------------------------------
    public createUser = async (req: Request, res: Response) => {

        try {
           
            const input = this.userDTO.createUserDTO(
                req.body.name,
                req.body.email,
                req.body.password

            )

            const output = await this.userBusiness.createUser(input)

            res.status(201).send(output)

        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado.")
            }

        }
    }

    public userLogin = async (req: Request, res: Response) => {

        try {

            const input: LoginInputDTO = {
                email: req.body.email,
                password: req.body.password

            }

            const output = await this.userBusiness.userLogin(input)

            res.status(200).send(output)

        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado.")
            }
        }

    }
}

