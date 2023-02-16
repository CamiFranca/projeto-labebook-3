import { PostDatabase } from "../database/PostsDatabase"
import { createPostOutputDTO, getPostByIdDTO, PostsDB, PostsDTO } from "../dtos/PostsDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { Posts } from "../models/Posts"
import { TPosting} from "../type"

export class PostBusiness {

    public getPost = async (q: string | undefined) => {

        const postDatabase = new PostDatabase()

        const postsDB: PostsDB[] = await postDatabase.getPost(q)

        const posts :Posts[] = postsDB.map((post) => new Posts(
            post.id,
            post.creator_id,
            post.content,
            post.likes,
            post.deslikes,
            post.created_at,
            post.update_at
        ))

        return posts

    }
    public getPostById = async (id: string) => {

        if (id[0] !== "p") {
            throw new BadRequestError("O id precisa começar com a letra 'p'.")
        }
        if (id.length < 4) {
            throw new BadRequestError("O id precisa ter pelo menos quatro digitos.")
        }

        const postDatabase = new PostDatabase()

        const postsDB = await postDatabase.getPostsById(id)


        const post :Posts = new Posts(
            postsDB.id,
            postsDB.creator_id,
            postsDB.content,
            postsDB.likes,
            postsDB.deslikes,
            postsDB.created_at,
            postsDB.update_at

        )
        const outputPost :getPostByIdDTO = {
            message: "estes são todos os posts",
            id: post.getId(),
            creatorId: post.getCreator_id(),
            content: post.getContent(),
            likes: post.getLikes(),
            deslikes: post.getDeslikes(),
            createdAt: post.getCreated_at(),
            updateAt: post.getUpdate_at()

        }

        return outputPost
    }
//-----------------------------------------------------------
    public createPost = async (post: TPosting) => {

        const { id, content } = post
        const postDatabase = new PostDatabase()

        const Userlogged = await postDatabase.findUserLogged(id)

        if (!Userlogged) {

            throw new Error(" O usuário não está logado")
        }

        const instantiatePost = new Posts(
            "novo post" + id,
            id,
            content,
            0,
            0,
            new Date().toDateString(),
            new Date().toISOString()

        )

        const postDB : PostsDB = {

            id: instantiatePost.getId(),
            creator_id: instantiatePost.getCreator_id(),
            content: instantiatePost.getContent(),
            likes: instantiatePost.getLikes(),
            deslikes: instantiatePost.getDeslikes(),
            created_at: instantiatePost.getCreated_at(),
            update_at: instantiatePost.getUpdate_at()
        }

        await postDatabase.insertContent(postDB, id)

        const output = {
            message: "Postagem feita com sucesso!"
        }
        return output

    }
}