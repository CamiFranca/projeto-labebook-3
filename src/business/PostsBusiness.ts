import { PostDatabase } from "../database/PostsDatabase"
import { CreatePostIntputDTO } from "../dtos/PostsDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { Posts } from "../models/Posts"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"

export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
    ) { }

    // public getPost = async (input: getPostInputDTO): Promise<GetPostOutputDTO> => {

    //try {
            //     const { token } = input

    //     if (!token) {
    //         throw new BadRequestError("o token não existe.")
    //     }

    //     const payloade = this.tokenManager.getPayload(token)

    //     if (!payloade) {
    //         throw new BadRequestError("token inválido.")
    //     }
    //     const postsAndCreator : postAndCreatorDB[] = 
    //     await this.postDatabase.getPostWhithCreator()

    //     const formatPost  = postsAndCreator.map((post) => {
    //         const posts = new Posts(
    //             postsAndCreator.id,
    //             postsAndCreator.content,
    //             postsAndCreator.likes,
    //             postsAndCreator.deslikes,
    //             postsAndCreator.createdAt,
    //             postsAndCreator.updateAt,
    //             postsAndCreator.creatorId,
    //             postsAndCreator.creatorName

    //         )

    //         return posts.toBusinessModel()
    //     })

    //     const output : GetPostOutputDTO = formatPost
    //     return output


    // }
    //} catch (error) {
        
    //}


    //     //-----------------------------------------------------------
    public createPost = async (input: CreatePostIntputDTO): Promise<void> => {

        try {
            
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
          const postDB = post.toBusinessModel()
          
          await this.postDatabase.insert(postDB)
          
        } catch (error) {
            
        }


    }
}