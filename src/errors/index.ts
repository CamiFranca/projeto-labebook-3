import express, { Request, Response } from 'express'
import cors from 'cors'
// import { PostController } from "../controller"
import { userRouter } from "../router/userRouter"


const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

// app.get("/ping", async (req: Request, res: Response) => {
//     try {
//         res.status(200).send({ message: "Pong!" })
//     } catch (error) {
//         console.log(error)

//         if (req.statusCode === 200) {
//             res.status(500)
//         }

//         if (error instanceof Error) {
//             res.send(error.message)
//         } else {
//             res.send("Erro inesperado")
//         }
//     }
// })


app.use("/users", userRouter)

// const postController = new PostController()

// app.post("/posts", postController.userPost)


// app.post("/users/signup", async (req: Request, res: Response) => {


//     try {
//         const { newId, newName, newEmail, newPassword, newRole } = req.body

//         const newUser = new User {

//             newId,
//             newName,
//             newEmail,
//             newPassword,
//             newRole,
//             new Date().toISOString()


//     }

//     const newUserDB: TUsers = {

//         id: newUser.getId(),
//         name: newUser.getName(),
//         email: newUser.getEmail(),
//         password: newUser.getPassword(),
//         role: newUser.getRule(),
//         created_at: newUser.getcreated_at()

//     }


// })

//     } catch (error) {
//     console.log(error)

//     if (req.statusCode === 200) {
//         res.status(500)
//     }

//     if (error instanceof Error) {
//         res.send(error.message)
//     } else {
//         res.send("Erro inesperado")
//     }
// }




// app.post("/users/login", async (res:Response, req:Request)=>{

// try {
//     const {email, password} = req.body

//     if (typeof email !== "string") {
//         res.status(400)
//         throw new Error("'email' deve ser string")
//     }
//     if (typeof password !== "string") {
//         res.status(400)
//         throw new Error("'password' deve ser string")
//     }

//    const emailExists = await BaseDatabase.connection(UserDatabase.TABLE_USERS).where({email})

//     if(!emailExists){
//         res.status(400)
//         throw new Error ("o Email não existe")
//     }

//     res.status(201).send("token: 'um token jwt'")

// } catch (error) {
//     console.log(error)

//     if (req.statusCode === 200) {
//         res.status(500)
//     }

//     if (error instanceof Error) {
//         res.send(error.message)
//     } else {
//         res.send("Erro inesperado")
//     }
// }

// })

//--------------------------------POST-------------------------------------

// app.post("/posts", async (res: Response, req: Request) => {

//     try {
//         const content = req.body

//         if (content !== undefined) {

//             if (typeof content !== "string") {
//                 res.status(400)
//                 throw new Error(" 'content' deve ser string")
//             }
//         }

//         await BaseDatabase
//             .connection(PostDatabase.TABLE_POSTS)
//             .insert(content)
//         //    .where()

//     } catch (error) {
//         console.log(error)

//         if (req.statusCode === 200) {
//             res.status(500)
//         }

//         if (error instanceof Error) {
//             res.send(error.message)
//         } else {
//             res.send("Erro inesperado")
//         }
//     }


// })

// app.get("/posts/:id", async (res: Response, req: Request) => {

//     try {
//         const id = req.params.id

//         if (id !== undefined) {

//             if (typeof id !== "string") {
//                 res.status(400)
//                 throw new Error("O 'id' deve ser uma string")
//             }
//         }

//         const idExist = await db("posts").where({ id })

//         if (idExist.legth === 0) {
//             throw new Error("o id não existe")
//         }

//         res.status(200).send(idExist)
//     } catch (error) {
//         console.log(error)

//         if (req.statusCode === 200) {
//             res.status(500)
//         }

//         if (error instanceof Error) {
//             res.send(error.message)
//         } else {
//             res.send("Erro inesperado")
//         }
//     }

// })

// app.put("/posts/:id", async (res: Response, req: Request) => {

// try {
//     const { id, content } = req.body

//     if (typeof id !== "string") {
//         res.status(400)
//         throw new Error("'email' deve ser string")
//     }

//     if (typeof content !== "string") {
//         res.status(400)
//         throw new Error("'email' deve ser string")
//     }
// } catch (error) {
//     console.log(error)

//     if (req.statusCode === 200) {
//         res.status(500)
//     }

//     if (error instanceof Error) {
//         res.send(error.message)
//     } else {
//         res.send("Erro inesperado")
//     }
// }

// })









