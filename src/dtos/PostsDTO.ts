import { PostModel } from "../type";

export interface getPostInputDTO {
    token :string | undefined
}

export type GetPostOutputDTO = PostModel[]

export interface CreatePostIntputDTO {
    token: string | undefined,
    content: string | undefined
}

export interface EditePostInputDTO {
    idToEdite: string,
    token: string | undefined,
    content: unknown
}

export interface DeletePostInputDTO {
    idToDelete: string,
    token: string | undefined,
    
}

// export interface GetPostByIdInputDTO {
//     id: string,
//     creator_id: string,
//     content: string,
//     likes: number,
//     deslikes: number,
//     createdAt: string,
//     updateAt: string
// }
// export interface getPostByIdDTO {
//     message: string,
//     id: string,
//     creatorId: string,
//     content: string,
//     likes: number,
//     deslikes: number,
//     createdAt: string,
//     updateAt: string
// }
// export interface PostsDB {
//     id: string,
//     creator_id: string,
//     content: string,
//     likes: number,
//     deslikes: number,
//     created_at: string,
//     update_at: string
// }







// export class PostsDTO {

//     public createPostInputDTO(
//         id: unknown,
//         content: unknown
//     ) {

//         if (!id) {
//             throw new BadRequestError("É preciso informar um id.")
//         }
//         if (id !== "string") {
//             throw new BadRequestError("O id precisa ser string.")
//         }
//         if (content !== "string") {

//             throw new BadRequestError("O id precisa ser string.")
//         }
 
//     }
    // public getPostByIsInputDTO(
    //     id: unknown,
    //     creator_id: unknown,
    //     content: unknown,
    //     likes: unknown,
    //     deslikes: unknown,
    //     createdAt: unknown,
    //     updateAt: unknown

    // ): GetPostByIdInputDTO {
    //     if (typeof id !== "string") {
    //         throw new BadRequestError("'id' deve ser string")
    //     }
    //     if (typeof creator_id !== "string") {
    //         throw new BadRequestError("'id' deve ser string")
    //     }
    //     if (typeof content !== "string") {
    //         throw new BadRequestError("'id' deve ser string")
    //     }
    //     if (typeof likes !== "number") {
    //         throw new BadRequestError("'id' deve ser string")
    //     }
    //     if (typeof deslikes !== "number") {
    //         throw new BadRequestError("'id' deve ser string")
    //     }
    //     if (typeof createdAt !== "string") {
    //         throw new BadRequestError("'id' deve ser string")
    //     }
    //     if (typeof updateAt !== "string") {
    //         throw new BadRequestError("'id' deve ser string")
    //     }

    //     const dto: GetPostByIdInputDTO = {
    //         id,
    //         creator_id,
    //         content,
    //         likes,
    //         deslikes,
    //         createdAt,
    //         updateAt
    //     }
    //     return dto
    // }
//     public EditePostInputDTO(
//         idToEdite: unknown,
//         token: unknown,
//         content: unknown
//     ): EditePostInputDTO {

//         if (typeof idToEdite !== "string") {
//             throw new BadRequestError("'id' deve ser string")
//         }
//         if (typeof token !== "string") {
//             throw new BadRequestError("'id' deve ser string")
//         }
//         if (typeof content !== "string") {
//             throw new BadRequestError("'id' deve ser string")
//         }

//         const dto :EditePostInputDTO =  {
//             idToEdite,
//             token,
//             content
//         }
//         return dto
//     }
// }