
export type TUsers = {
    id: string,
    name: string,
    email: string,
    password: string,
    role: string,
    created_at: string
}
export type TUsersSignUp ={
    id: string,
    name: string,
    email: string,
    password: string
}

export type TUsersLogin ={
    email:string,
    password:string
}

export type TPosting = {
    email: string,
    content: string
}

export type TPosts = {
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    deslikes: number,
    created_at: string,
    update_at: string
}

export type TEdite = {
    id:string
    content:string
}

export type TLikes_deslikes = {
    user_id: string,
    post_id: string,
    like: string
}
