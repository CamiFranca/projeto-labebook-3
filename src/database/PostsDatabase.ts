import { PostsDB } from "../dtos/PostsDTO";
import { Posts } from "../models/Posts"
import { TPosting } from "../type"
import { BaseDatabase } from "./BaseDatabase";



export class PostDatabase extends BaseDatabase {

    public static TABLE_POSTS = "posts" // não entendo!!

    public async  getPost(q: string | undefined){

        let postDB

        if(q === undefined){
            const savePostDB : PostsDB[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
             postDB = savePostDB 
            return postDB
        }else{
            const savePostDB : PostsDB[]= await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .where("name", "LIKE", `%${q}%`)
            postDB = savePostDB
            return postDB
        }
    }

    public async getPostsById(id:string): Promise<PostsDB> {
        const postDB: PostsDB[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .where({id})

        return postDB[0]
    }


    public async insertContent(postDB:PostsDB,id:string) {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .insert(postDB)
            .where(id)
    }

    public async findUserLogged(id:string){
      const postingDB =  await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .where({id})

        return postingDB
    }
}
