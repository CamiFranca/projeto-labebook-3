import express from "express"
import { PostBusiness } from "../business/PostsBusiness"
import { PostController } from "../controller/PostsController"
import { PostDatabase } from "../database/PostsDatabase"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"

export const postRouter = express.Router()

const postController = new PostController(

    new PostBusiness(
        new PostDatabase(),
        new IdGenerator(),
        new TokenManager()

    ),
)

postRouter.get("/", postController.getPosts)
// postRouter.get("/:id", postController.getPostById)
postRouter.post("/", postController.createPost)
postRouter.put("/:id", postController.editePost)
