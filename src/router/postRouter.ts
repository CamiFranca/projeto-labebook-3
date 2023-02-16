import express from "express"
import { PostController } from "../controller/PostsController"
import { PostsDTO } from "../dtos/PostsDTO"

export const  postRouter = express.Router()

const postController = new PostController(
new PostsDTO()
)

postRouter.get("/", postController.getPosts)
postRouter.get("/:id", postController.getPostById)
postRouter.post("/", postController.posting)
