import { BadRequestError } from "../errors/BadRequestError";

export interface GetPostOutputDTO {
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    deslikes: number,
    created_at: string,
    update_at: string
}

export class PostDTO {


    
}