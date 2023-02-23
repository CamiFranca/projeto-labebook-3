import { PostDatabase } from "../database/PostsDatabase"
import { CreatePostIntputDTO, EditePostInputDTO, getPostInputDTO, GetPostOutputDTO } from "../dtos/PostsDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { Posts } from "../models/Posts"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { postAndCreatorDB, PostDB } from "../type"

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

        const idExistDB : PostDB | undefined = await this.postDatabase.idExist(idToEdite)

        if (!idExistDB){
            throw new NotFoundError("O id não existe.")
        }

        if(idExistDB.creator_id !== payload.id){
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




}