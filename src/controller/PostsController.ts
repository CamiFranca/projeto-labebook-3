
import { Posts } from "../models/Posts";
import { TPosting, TPosts } from "../type";
import { PostDatabase } from "../database/PostsDatabase"
import { Request, Response } from "express";
import { PostBusiness } from "../business/PostsBusiness";
import { PostsDTO } from "../dtos/PostsDTO";


export class PostController {
    constructor(
        private postsDTO: PostsDTO
    ) { }

    public getPosts = async (req: Request, res: Response) => {

        try {

            const q = req.query.q as string | undefined

            const postDatabase = new PostDatabase()

            const postDB = await postDatabase.getPost(q)

            res.status(200).send(postDB)

        } catch (error) {
            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public getPostById = async (req: Request, res: Response) => {

        try {

            const id = req.params.id

            const postBusiness = new PostBusiness()
            const output = await postBusiness.getPostById(id)

            res.status(200).send(output)

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
    }

    public posting = async (res: Response, req: Request) => {

        try {

            const post = this.postsDTO.createPostInputDTO(
                req.body.id,
                req.body.content
            )

            const postBusiness = new PostBusiness()
            const output = await postBusiness.createPost(post)


            res.status(201).send(output)

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


    }
}
