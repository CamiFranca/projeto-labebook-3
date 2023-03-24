import { type } from "os"
import { PostDatabase } from "../database/PostsDatabase"
import { LikeOrDeslikeDB, LikeOrDeslikeInputDTO } from "../dtos/Like_deslikeDTO"
import { CreatePostIntputDTO, DeletePostInputDTO, EditePostInputDTO, getPostInputDTO, GetPostOutputDTO } from "../dtos/PostsDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { Posts } from "../models/Posts"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { postAndCreatorDB, PostDB, POST_LIKE, USER_ROLE } from "../type"

export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
    ) { }

    public getPost = async (input: getPostInputDTO): Promise<GetPostOutputDTO> => {

        const { token } = input

        if (!token) {
            throw new BadRequestError("o token não existe.")
        }

        const payloade = this.tokenManager.getPayload(token)

        if (!payloade) {
            throw new BadRequestError("token inválido.")
        }
        const postsAndCreator: postAndCreatorDB[] =
            await this.postDatabase.getPostWhithCreator()

        const formatPost = postsAndCreator.map((post) => {
            const posts = new Posts(
                post.id,
                post.content,
                post.likes,
                post.deslikes,
                post.created_at,
                post.update_at,
                post.creator_id,
                post.creator_name

            )

            return posts.toBusinessModel()
        })

        const output: GetPostOutputDTO = formatPost
        return output


    }


    //     //-----------------------------------------------------------
    public createPost = async (input: CreatePostIntputDTO): Promise<void> => {


        const { token, content } = input

       
        if (!token) {
            throw new BadRequestError("o token não existe.")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("o payload não existe.")
        }

        if (typeof content !== "string") {
            throw new BadRequestError("Content precisa ser do tipo string.")
        }

        const id = this.idGenerator.generate()
        const createdAt = new Date().toISOString()
        const updatAt = new Date().toISOString()
        const creatorId = payload.id
        const creatorName = payload.name

        const post = new Posts(
            id,
            content,
            0,
            0,
            createdAt,
            updatAt,
            creatorId,
            creatorName
        )
       
        const postDB = post.toDBModel()

        await this.postDatabase.insert(postDB)
    }
    //-------------------------------------------------------------------------------
    public editePost = async (input: EditePostInputDTO): Promise<void> => {

        const { token, content, idToEdite } = input

        if (!token) {
            throw new BadRequestError("envie um token.")
        }
        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("o payload não existe.")
        }

        if (typeof content !== "string") {
            throw new BadRequestError("Content precisa ser do tipo string.")
        }

        const idExistDB: PostDB | undefined = await this.postDatabase.idExist(idToEdite)

        if (!idExistDB) {
            throw new NotFoundError("O id não existe.")
        }

        if (idExistDB.id !== payload.id) {
            throw new BadRequestError("você não pode ter acesso, confirme o id.")
        }

        const creatorName = payload.name

        const post = new Posts(
            idExistDB.id,
            idExistDB.content,
            idExistDB.likes,
            idExistDB.deslikes,
            idExistDB.created_at,
            idExistDB.update_at,
            idExistDB.creator_id,
            creatorName
        )

        post.setContent(content)
        post.setCreated_at(new Date().toISOString())

        const updatePost = post.toDBModel()

        await this.postDatabase.update(idToEdite, updatePost)


    }

    public deletePost = async (input: DeletePostInputDTO): Promise<void> => {

        const { token, idToDelete } = input

        if (!token) {
            throw new BadRequestError("O token está ausente.")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("o token é inválido")
        }

        const idToDeleteDB = await this.postDatabase.idExist(idToDelete)

        if (!idToDeleteDB) {
            throw new NotFoundError("O id não existe.")
        }

        const creatorIdByPayload = payload.id

        if (payload.role !== USER_ROLE.ADMIN
            && idToDeleteDB.creator_id !== creatorIdByPayload) {
            throw new BadRequestError("Apenas quem criou o post pode deletar.")
        }

        await this.postDatabase.delete(idToDelete)


    }

public likeOrDislikePost = async (input: LikeOrDeslikeInputDTO): Promise<void> => {
    const { idLikeOrDeslike, token, like } = input

    if (token === undefined) {
        throw new BadRequestError("token ausente")
    }

    const payload = this.tokenManager.getPayload(token)

    if (payload === null) {
        throw new BadRequestError("token inválido")
    }

    if (typeof like !== "boolean") {
        throw new BadRequestError("'like' deve ser boolean")
    }

    const postWithCreatorDB = await this.postDatabase.findPostWhithCreator(idLikeOrDeslike)

    if (!postWithCreatorDB) {
        throw new NotFoundError("'id' não encontrado")
    }

    const userId = payload.id
    const likeSQLite = like ? 1 : 0

    const likeDislikeDB: LikeOrDeslikeDB = {
        user_id: userId,
        post_id: postWithCreatorDB.id,
        like: likeSQLite
    }

    const post = new Posts(
        postWithCreatorDB.id,
        postWithCreatorDB.creator_name,
        postWithCreatorDB.likes,
        postWithCreatorDB.deslikes,
        postWithCreatorDB.created_at,
        postWithCreatorDB.update_at,
        postWithCreatorDB.creator_id,
        postWithCreatorDB.creator_name
    )

    const likeDislikeExists = await this.postDatabase.findLikeDislike(likeDislikeDB)

    if (likeDislikeExists === POST_LIKE.ALREADY_LIKED) {
        if (like) {
            await this.postDatabase.removeLikeDislike(likeDislikeDB)
            post.deleteLike()
        } else {
            await this.postDatabase.updateLikeDislike(likeDislikeDB)
            post.deleteLike()
            post.addDeslike()
        }

    } else if (likeDislikeExists === POST_LIKE.ALREADY_DESLIKED) {
        if (like) {
            await this.postDatabase.updateLikeDislike(likeDislikeDB)
            post.removeDeslike()
            post.addLike()
        } else {
            await this.postDatabase.removeLikeDislike(likeDislikeDB)
            post.removeDeslike()
        }

    } else {
        await this.postDatabase.likeOrDislikePost(likeDislikeDB)
        like ? post.addLike() : post.addDeslike()
    }

    const updatedpostDB = post.toDBModel()

    await this.postDatabase.update(idLikeOrDeslike, updatedpostDB)
}
}
