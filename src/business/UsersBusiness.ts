import { UserDatabase } from "../database/UserDatabase"
import { Users } from "../models/User"
import { TokenPayload, TUsers, UserDB, USER_ROLE } from "../type"
import { BadRequestError } from '../errors/BadRequestError'
import { CreateUserInputDTO, CreateUserOutputDTO, LoginInputDTO, LoginoutputDTO, UserDbDTO } from "../dtos/UsersDTO"
import { HashManager } from "../services/HashManager"
import { TokenManager } from "../services/TokenManager"
import { IdGenerator } from "../services/IdGenerator"
import { NotFoundError } from "../errors/NotFoundError"


export class UserBusiness {
constructor(
    private userDatabase : UserDatabase,
    private idGenerator : IdGenerator,
    private tokenManeger: TokenManager,
    private hashManager :HashManager ,
){}


    public getUser = async (q: string | undefined) => {


        const usersDB: TUsers[] = await this.userDatabase.getUser(q)

        const users :Users[] = usersDB.map((user) => new Users(

            user.id,
            user.name,
            user.email,
            user.password,
            USER_ROLE.NORMAL,
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
            USER_ROLE.NORMAL,
            userDB[0].created_at

        )
        return user
    }
 //--------------------------------------------------------------------------------

    public createUser = async (input:CreateUserInputDTO):Promise<CreateUserOutputDTO> => {

        const {
            id,
            name,
            email,
            password,
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

        const idGenerator = this.idGenerator.generate()

        const newUser = new Users(

            idGenerator,
            name,
            email,
            password,
            USER_ROLE.NORMAL,
            new Date().toISOString()
        )

        // const newUserDB: UserDbDTO = {

        //     id: newUser.getId(),
        //     name: newUser.getName(),
        //     email: newUser.getEmail(),
        //     password: newUser.getPassword(),
        //     role: newUser.getRole(),
        //     created_at: newUser.getcreatedAt()

        // }

        const userDB = newUser.toDBModel()

        const payload : TokenPayload = {
            id: newUser.getId(),
            name: newUser.getName(),
            role: newUser.getRole()
        }

        const token = this.tokenManeger.createToken(payload)

        await this.userDatabase.createUser(userDB)

        const output :CreateUserOutputDTO = {
            message: "Cadastro realizado com sucesso.",
            token:token
        }

       return output
    }
 //--------------------------------------------------------------------------------

    public userLogin = async (login: LoginInputDTO):Promise<LoginoutputDTO> => {

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

        const userDB : UserDB | undefined = await this.userDatabase.userLogin(email)


        if (userDB === undefined) {
            throw new NotFoundError("o Email não existe")
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

        if(!isPasswordCorrect){
            throw new BadRequestError("password incorreto.")
        }

        const payload = {
            id: user.getId(),
            name:user.getName(),
            role:user.getRole()
        }
        const token = this.tokenManeger.createToken(payload)

        const backLogin :LoginoutputDTO = {
            token:token
        }
        return backLogin
    }
}

//--------------------------------------------------------------------------------
