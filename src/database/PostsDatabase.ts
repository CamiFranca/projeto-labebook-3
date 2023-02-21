// import { PostsDB } from "../dtos/PostsDTO";
import { PostsDB } from "../dtos/PostsDTO";
import { Posts } from "../models/Posts"
import { postAndCreatorDB, TPosting } from "../type"
import { BaseDatabase } from "./BaseDatabase";



export class PostDatabase extends BaseDatabase {

    public static TABLE_POSTS = "posts" 

    public async  getPostWhithCreator(){
        
        const result : postAndCreatorDB[] = await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .select(
            "posts.id",
            "posts.creator_id",
            "posts.content",
            "posts.likes",
            "posts.deslikes",
            "posts.created_at",
            "posts.update_at",
            "users.name AS creator_name"
        )
            .join("users","posts.creator_id", "=", "users.id")
            return result
    }

    public insert = async(postDB: PostsDB): Promise <void> => {
     await BaseDatabase
     .connection
     .insert(postDB)
    }

}
    // public async  getPost(q: string | undefined){

    //     let postDB

    //     if(q === undefined){
    //         const savePostDB : PostsDB[] = await BaseDatabase
    //         .connection(PostDatabase.TABLE_POSTS)
    //          postDB = savePostDB 
    //         return postDB
    //     }else{
    //         const savePostDB : PostsDB[]= await BaseDatabase
    //         .connection(PostDatabase.TABLE_POSTS)
    //         .where("name", "LIKE", `%${q}%`)
    //         postDB = savePostDB
    //         return postDB
    //     }
    // }

    // public async getPostsById(id:string): Promise<PostsDB> {
    //     const postDB: PostsDB[] = await BaseDatabase
    //         .connection(PostDatabase.TABLE_POSTS)
    //         .where({id})

    //     return postDB[0]
    // }


   

    // public async findUserLogged(id:string){
    //   const postingDB =  await BaseDatabase
    //     .connection(PostDatabase.TABLE_POSTS)
    //     .where({id})

    //     return postingDB
    // }

