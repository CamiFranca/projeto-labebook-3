import { Posts } from "../models/Posts"
import { TPosting, TPosts } from "../type"
import { BaseDatabase } from "./BaseDatabase";



export class PostDatabase extends BaseDatabase {

    public static TABLE_POSTS = "posts" // não entendo!!

    public async  getPost(q: string | undefined){

        let postDB

        if(q === undefined){
            const savePostDB : TPosts[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
             postDB = savePostDB 
            return postDB
        }else{
            const savePostDB : TPosts[]= await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .where("name", "LIKE", `%${q}%`)
            postDB = savePostDB
            return postDB
        }
    }

    public async getPostsById(id:string): Promise<TPosts[]> {
        const postDB: TPosts[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .where({id})

        return postDB
    }


    public async insertContent(postDB:TPosts,id:string) {
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
