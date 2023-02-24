import { Posts } from "../models/Posts";
import { PostDatabase } from "../database/PostsDatabase"
import { Request, Response } from "express";
import { PostBusiness } from "../business/PostsBusiness";
import { CreatePostIntputDTO, DeletePostInputDTO, EditePostInputDTO, getPostInputDTO } from "../dtos/PostsDTO";
import { LikeOrDeslikeInputDTO } from "../dtos/Like_deslikeDTO";


export class PostController {
    constructor(
        private postBusiness: PostBusiness
    ) { }

    public getPosts = async (req: Request, res: Response) => {

        try {

            const input: getPostInputDTO = {
                token: req.headers.authorization
            }

            const postDB = await this.postBusiness.getPost(input)

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

    public createPost = async (res: Response, req: Request) => {

        try {

            const input: CreatePostIntputDTO = {
                token: req.headers.authorization,
                content: req.body.content
            }

            await this.postBusiness.createPost(input)

            res.status(201).end()

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


    public editePost = async (res: Response, req: Request) => {

        try {

            const input: EditePostInputDTO = {
                idToEdite: req.params.id,
                token: req.headers.authorization,
                content: req.body.content
            }

            await this.postBusiness.editePost(input)

            res.status(200).end()

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

    public deletePost = async (req: Request, res: Response) => {

        try {

            const input: DeletePostInputDTO = {
                token: req.headers.authorization,
                idToDelete: req.params.id
            }

            await this.postBusiness.deletePost(input)

            res.status(200).end()

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

    public likeOrDeslike = async (req: Request, res: Response) => {

        try {

            const input :LikeOrDeslikeInputDTO = {
                idLikeOrDeslike : req.params.id,
                token: req.headers.authorization,
                like: req.body.like
            }

            await this.postBusiness.likeOrDeslike(input)

            res.status(200).end

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
