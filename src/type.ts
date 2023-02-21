
export type TUsers = {
    id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLE,
    created_at: string
}
export type TUsersSignUp = {
    id: string,
    name: string,
    email: string,
    password: string
}

export type TUsersLogin = {
    email: string,
    password: string
}


export type TPosting = {
    id: string,
    content: string
}

export type TEdite = {
    id: string
    content: string
}

export type TLikes_deslikes = {
    user_id: string,
    post_id: string,
    like: string
}

export interface UserModel{
    id :string,
    name :string,
    email:string,
    password:string,
    role :USER_ROLE,
    createdAt:string
}
export enum USER_ROLE {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export interface UserDB{
    id :string,
    name :string,
    email:string,
    password:string,
    role:USER_ROLE,
    created_at:string
}
export interface TokenPayload {
    id: string,
	name: string,
    role: USER_ROLE
}
export interface PostDB {
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    deslikes: number;
    created_at :string,
    update_at :string
}
export interface postAndCreatorDB extends PostDB {
    creator_name: string
}
export interface PostModel {

    "id": string,
    "content": string,
    "likes": number,
    "deslikes": number,
    "createdAt": string,
    "updatedAt": string,
    "creator": {
        "id": string,
        "name": string

    }
}