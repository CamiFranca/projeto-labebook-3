import { BadRequestError } from "../errors/BadRequestError"

export interface LikeOrDeslikeInputDTO{
    idLikeOrDeslike:string,
    token:string | undefined,
    like: unknown
}

export interface LikeOrDeslikeDB {
    user_id: string, 
    post_id: string, 
    like: number
}
// export class Like_deslikeDTO {
  
//     public LikeInputDTO (
//         id:unknown,
//         token:unknown,
//         like: unknown
//     ):LikeInputDTO {
//         if (!id) {
//             throw new BadRequestError("É preciso informar um id.")
//         }
//         if (id !== "string") {
//             throw new BadRequestError("O id precisa ser string.")
//         }
//         if (!token) {
//             throw new BadRequestError("É preciso informar um token.")
//         }
//         if (token !== "string") {

//             throw new BadRequestError("O token precisa ser string.")
//         }
//         if (!like) {

//             throw new BadRequestError("É preciso dar um like.")
//         }
//         if (like !== "number") {

//             throw new BadRequestError("O id precisa ser number ( 0 ou 1).")
//         }

//         const dto : LikeInputDTO = {
//             id,
//             token,
//             like
            
//         }
//          return dto
//     }
// }