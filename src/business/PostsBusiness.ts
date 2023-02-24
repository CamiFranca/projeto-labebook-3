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

        if (content !== "string") {
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
            throw new BadRequestError("o token não existe.")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("o payload não existe.")
        }

        if (content !== "string") {
            throw new BadRequestError("Content precisa ser do tipo string.")
        }

        const idExistDB: PostDB | undefined = await this.postDatabase.idExist(idToEdite)

        if (!idExistDB) {
            throw new NotFoundError("O id não existe.")
        }

        if (idExistDB.creator_id !== payload.id) {
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

        const updatePost = post.toDBModel

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
    public likeOrDeslike = async (input: LikeOrDeslikeInputDTO): Promise<void> => {

        const { idLikeOrDeslike, token, like } = input

        if (!token) {
            throw new BadRequestError("O token está ausente.")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("o token é inválido")
        }

        const idToLikeOrDeslike = await this.postDatabase.findPostWhithCreator(idLikeOrDeslike)

        if (!idToLikeOrDeslike) {
            throw new NotFoundError("O id não existe.")
        }

        if (typeof like !== "boolean") {
            throw new BadRequestError("O like/deslike precisa ser do tipo boolean.")
        }

        const formattingLikeForSQL = like ? 1 : 0

        const likeOrDeslike: LikeOrDeslikeDB = {
            user_id: payload.id,
            post_id: idToLikeOrDeslike.id,
            like: formattingLikeForSQL
        }


        const post = new Posts(
            idToLikeOrDeslike.id,
            idToLikeOrDeslike.content,
            idToLikeOrDeslike.likes,
            idToLikeOrDeslike.deslikes,
            idToLikeOrDeslike.created_at,
            idToLikeOrDeslike.update_at,
            idToLikeOrDeslike.creator_id,
            idToLikeOrDeslike.creator_name
        )

        const likeDeslikeExists = await this.postDatabase.findLikeDeslike(likeOrDeslike)

        if (likeDeslikeExists === POST_LIKE.ALREADY_LIKED) {
            if (like) {
                await this.postDatabase.removeLikeOrDeslike(likeOrDeslike)
                post.deleteLike()
            } else {
                await this.postDatabase.updateLikeOrDeslike(likeOrDeslike)
                post.deleteLike()
                post.addDeslike()
            }


        } else if (likeDeslikeExists === POST_LIKE.ALREADY_DESLIKED) {
            if (like) {
                await this.postDatabase.removeLikeOrDeslike(likeOrDeslike)
                post.removeDeslike()
                post.addLike()
            } else {
                await this.postDatabase.updateLikeOrDeslike(likeOrDeslike)
                post.removeDeslike()
            }

        } else {
            await this.postDatabase.likeOrDeslike(likeOrDeslike)

            if (like) {
                post.addLike()
            } else {
                post.addDeslike()
            }


        }
        const updatePost = post.toDBModel()

        await this.postDatabase.update(idLikeOrDeslike, updatePost)



    }

}