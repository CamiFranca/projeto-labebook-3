import express, { Request, Response } from 'express'
import cors from 'cors'
import { PostController } from './controller/PostsController'
import { userRouter } from './router/userRouter'
import { postRouter } from './router/postRouter'
import dotenv from 'dotenv'

const app = express()

dotenv.config()

app.use(cors())
app.use(express.json())

app.listen(Number(process.env.PORT), () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`)
})

app.get("/ping", async (req: Request, res: Response) => {
    try {
        res.status(200).send({ message: "Pong!" })
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


app.use("/users", userRouter)
app.post("/posts", postRouter)


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

app.put("/posts/:id", async (res: Response, req: Request) => {

try {
    const id = req.params.id
    const newContent  = req.body.content as string

    if (id !== undefined){
    
    if (typeof id !== "string") {
        res.status(400)
        throw new Error("'id' deve ser string")
    }

    if (id[0] !== "p") {
        res.status(400)
        throw new Error("'id' deve começar com a letra 'p'")
    }
    if (id.length < 3) {
        res.status(400)
        throw new Error("'id' deve ter pelo menos três digitos")
    }
   }

    if (typeof newContent !== "string") {
        res.status(400)
        throw new Error("'o conteúdo' deve ser string")
    }


} catch (error) {
    console.log(error)

    if (req.statusCode === 200) {
        res.status(500)
    }

    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
}

})

app.delete("posts/:id", async(res: Response, req: Request)=>{

    try {
        const id = req.params.id

        if (id !== undefined){
    
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id' deve ser string")
            }
        
            if (id[0] !== "p") {
                res.status(400)
                throw new Error("'id' deve começar com a letra 'p'")
            }
            if (id.length < 3) {
                res.status(400)
                throw new Error("'id' deve ter pelo menos três digitos")
            }
           }
            // const idExist = await db.("post").where(id)




    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }
    
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


// app.get("/posts", async (req: Request, res: Response)=>{

//     try {

//         const q = req.query.q

//         if(q === undefined){
//             const result = await.db("posts")
//             res.status(200).send(result)
//         }else{
//             const result = await.db("posts").where("name", "LIKE", `%${q}%`)
//             res.status(200).send(result)
//         }
  
//     } catch (error) {
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









