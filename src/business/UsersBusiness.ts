import { UserDatabase } from "../database/UserDatabase"
import { Users } from "../models/User"
import { TokenPayload, TUsers, UserDB, USER_ROLE } from "../type"
import { BadRequestError } from '../errors/BadRequestError'
import { CreateUserOutputDTO, LoginInputDTO, LoginoutputDTO, } from "../dtos/UserDTO"
import { HashManager } from "../services/HashManager"
import { TokenManager } from "../services/TokenManager"
import { IdGenerator } from "../services/IdGenerator"
import { NotFoundError } from "../errors/NotFoundError"


export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManeger: TokenManager,
        private hashManager: HashManager,
    ) { }


    public getUser = async (q: string | undefined) => {


        const usersDB: TUsers[] = await this.userDatabase.getUser(q)

        const users: Users[] = usersDB.map((user) => new Users(

            user.id,
            user.name,
            user.email,
            user.password,
            USER_ROLE.NORMAL,
            user.created_at

        ))

        return users

    }
    public getUserById = async (id: string) => {

        if (id === ":id") {
            throw new Error("informe um id")
        }


        const userDB: TUsers[] = await this.userDatabase.getUserById(id)

        if (userDB.length === 0) {
            throw new Error("Esse id não existe.")
        }

        const user: Users = new Users(

            userDB[0].id,
            userDB[0].name,
            userDB[0].email,
            userDB[0].password,
            USER_ROLE.NORMAL,
            userDB[0].created_at

        )
        return user
    }
    //--------------------------------------------------------------------------------

    public createUser = async (input: CreateUserOutputDTO) => {

        const {
            name,
            email,
            password,
        } = input

        if (name.length < 2) {
            throw new BadRequestError("'name' deve possuir pelo menos 2 caracteres")
        }

        if (!email.match(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g)) {
            throw new BadRequestError("ERROR: 'email' must be like 'example@example.example'.")
        }


        const emailExist = await this.userDatabase.findEmail(email)

        if (emailExist) {
            throw new BadRequestError("Email já cadastrado.")
        }

        const idGenerator = this.idGenerator.generate()
        const hashedPassword = await this.hashManager.hash(password)
        const role = USER_ROLE.NORMAL
        const createdAt = new Date().toISOString()

        const newUser = new Users(

            idGenerator,
            name,
            email,
            hashedPassword,
            role,
            createdAt
        )


        const userDB = newUser.toDBModel()

        await this.userDatabase.createUser(userDB)

        const payload: TokenPayload = {
            id: newUser.getId(),
            name: newUser.getName(),
            role: newUser.getRole()
        }

        const token = this.tokenManeger.createToken(payload)

        const output = {
            token: token
        }

        return output
    }

    public userLogin = async (input: LoginInputDTO): Promise<LoginoutputDTO> => {

        const { email, password } = input

        if (typeof email !== "string") {
            throw new Error("'email' deve ser string")
        }
        if (typeof password !== "string") {
            throw new Error("'password' deve ser string")
        }
        if (password.length < 5) {
            throw new Error("'password' deve possuir pelo menos 5 caracteres")
        }

        const userDB: UserDB | undefined = await this.userDatabase.userLogin(email)


        if (userDB === undefined) {
            throw new NotFoundError("o Email não existe.")
        }

        const user = new Users(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role,
            userDB.created_at
        )


        const isPasswordCorrect = await this.hashManager.compare(password, user.getPassword())

        if (!isPasswordCorrect) {
            throw new BadRequestError("password incorreto.")
        }

        const payload: TokenPayload = {
            id: user.getId(),
            name: user.getName(),
            role: user.getRole()
        }
        const token = this.tokenManeger.createToken(payload)

        const backLogin: LoginoutputDTO = {
            token: token
        }
        return backLogin
    }
}

