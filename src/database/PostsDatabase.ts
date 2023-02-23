import { EditePostInputDTO } from "../dtos/PostsDTO";
import { postAndCreatorDB, PostDB } from "../type"
import { BaseDatabase } from "./BaseDatabase";



export class PostDatabase extends BaseDatabase {

    public static TABLE_POSTS = "posts" 

    public  getPostWhithCreator = async():Promise <postAndCreatorDB[]> =>{
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

    public insert = async(postDB: PostDB): Promise <void> => {
     await BaseDatabase
     .connection(PostDatabase.TABLE_POSTS)
     .insert(postDB)
    }

    public idExist = async(idToEdite: string): Promise <PostDB| undefined> => {
       const result : PostDB[] = await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .where({idToEdite})
        return result[0]

    }

    public update = async(idToEdite: string, updatePost :any): Promise <void> => {
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
        .update(updatePost)
        .where({id :idToEdite})

    }
}


