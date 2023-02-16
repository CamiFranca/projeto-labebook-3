import { UserDatabase } from "../database/UserDatabase"
import { Users } from "../models/User"
import { TUsers, TUsersLogin } from "../type"
import { BadRequestError } from '../errors/BadRequestError'
import { CreateUserOutputDTO } from "../dtos/UsersDTO"

export class UserBusiness {
constructor(
    private userDatabase : UserDatabase
){}


    public getUser = async (q: string | undefined) => {


        const usersDB: TUsers[] = await this.userDatabase.getUser(q)

        const users :Users[] = usersDB.map((user) => new Users(

            user.id,
            user.name,
            user.email,
            user.password,
            user.role,
            user.created_at

        ))

        return users

    }
//--------------------------------------------------------------------------------
    public getUserById = async (id: string) => {

        if (id === ":id") {
            throw new Error("informe um id")
        }


        const userDB: TUsers[] = await this.userDatabase.getUserById(id)

        if (userDB.length === 0) {
            throw new Error("Esse id não existe.")
        }

        const user :Users = new Users(

            userDB[0].id,
            userDB[0].name,
            userDB[0].email,
            userDB[0].password,
            userDB[0].role,
            userDB[0].created_at

        )
        return user
    }
 //--------------------------------------------------------------------------------

    public createUser = async (input: any) => {

        const {
            id,
            name,
            email,
            password,
            role,
        } = input

        if (id[0] !== "u") {
            throw new BadRequestError("O id precisa começar com a letra 'u'.")
        }
        if (name.length < 2) {
            throw new BadRequestError("'name' deve possuir pelo menos 2 caracteres")
        }
        if (password.length < 5) {
            throw new BadRequestError("'password' deve possuir pelo menos 5 caracteres")
        }


        const userDBExists = await this.userDatabase.getUser(id)

        if (userDBExists) {
            throw new BadRequestError("O id já existe.")
        }
        const newUser = new Users(

            id,
            name,
            email,
            password,
            role,
            new Date().toISOString()
        )

        const newUserDB: TUsers = {

            id: newUser.getId(),
            name: newUser.getName(),
            email: newUser.getEmail(),
            password: newUser.getPassword(),
            role: newUser.getRole(),
            created_at: newUser.getcreatedAt()

        }

        await this.userDatabase.createUser(newUserDB)
        const output : CreateUserOutputDTO = {
            message: "Cadastro realizado com sucesso."
        }

        return output
    }
 //--------------------------------------------------------------------------------

    public userLogin = async (login: TUsersLogin) => {

        const { email, password } = login

        if (typeof email !== "string") {
            throw new Error("'email' deve ser string")
        }
        if (typeof password !== "string") {
            throw new Error("'password' deve ser string")
        }
        if (password.length < 5) {
            throw new Error("'password' deve possuir pelo menos 5 caracteres")
        }

        const loginExists = await this.userDatabase.userLogin(login)


        if (loginExists.length === 0) {
            throw new Error("o Email não existe")
        }

        return loginExists
    }
}
//--------------------------------------------------------------------------------
