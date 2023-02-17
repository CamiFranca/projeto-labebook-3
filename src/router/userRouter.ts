import express from "express"
import { UserBusiness } from "../business/UsersBusiness"
import { UserController } from "../controller/UsersController"
import { UserDatabase } from "../database/UserDatabase"
import { UserDTO } from "../dtos/UsersDTO"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"

export const  userRouter = express.Router()

const userController = new UserController(
    new UserDTO(),
    new UserBusiness(
    new UserDatabase(),
    new IdGenerator(),
    new TokenManager(),
    new HashManager(),
   
   
    )
)

userRouter.get("/", userController.getUsers)
userRouter.get("/:id", userController.getUsersById)
userRouter.post("/signup", userController.createtUser)
userRouter.post("/login", userController.userLogin)