import { LikeOrDeslikeDB } from "../dtos/Like_deslikeDTO";
import { EditePostInputDTO } from "../dtos/PostsDTO";
import { LikeDislikeDB, postAndCreatorDB, PostDB, POST_LIKE } from "../type"
import { BaseDatabase } from "./BaseDatabase";



export class PostDatabase extends BaseDatabase {

    public static TABLE_POSTS = "posts"
    public static TABLE_LIKE_DESLIKE = "likes_deslikes"

    public getPostWhithCreator = async (): Promise<postAndCreatorDB[]> => {
        const result: postAndCreatorDB[] = await BaseDatabase
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
            .join("users", "posts.creator_id", "=", "users.id")
        return result
    }

    public insert = async (postDB: PostDB): Promise<void> => {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .insert(postDB)
    }

    public idExist = async (idToEdite: string): Promise<PostDB | undefined> => {
        const result: PostDB[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .where({ idToEdite })
        return result[0]

    }

    public update = async (idToEdite: string, updatePost: any): Promise<void> => {
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
            .update(updatePost)
            .where({ id: idToEdite })

    }

    public delete = async (idToDelete: string): Promise<void> => {
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
            .delete()
            .where({ idToDelete })
    }

    public findPostWhithCreator = async (postId: string): Promise<postAndCreatorDB | undefined> => {
        const result: postAndCreatorDB[] = await BaseDatabase
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
            .join("users", "posts.creator_id", "=", "users.id")
            .where("posts.id", postId)
        return result[0]
    }


    public likeOrDeslike = async (likeOrDeslike: LikeOrDeslikeDB): Promise<void> => {
        await BaseDatabase.connection(PostDatabase.TABLE_LIKE_DESLIKE)
            .insert(likeOrDeslike)

    }

    public findLikeDeslike = async (likeOrDeslike: LikeOrDeslikeDB)
        : Promise<null | POST_LIKE> => {
        const [result]: PostDB[] | [] = await BaseDatabase.connection(PostDatabase.TABLE_LIKE_DESLIKE)
            .select()
            .where({
                user_id: likeOrDeslike.user_id,
                post_id: likeOrDeslike.post_id
            })

        if (likeOrDeslike) {
            return likeOrDeslike.like === 1
                ? POST_LIKE.ALREADY_LIKED
                : POST_LIKE.ALREADY_DESLIKED
        } else {
            return null
        }


    }

    public removeLikeOrDeslike = async (likeOrDeslike: LikeOrDeslikeDB): Promise<void> => {
        await BaseDatabase.connection(PostDatabase.TABLE_LIKE_DESLIKE)
            .delete()
            .where({
                user_id: likeOrDeslike.user_id,
                post_id: likeOrDeslike.post_id
            })

    }

    public updateLikeOrDeslike = async (likeOrDeslike: LikeOrDeslikeDB): Promise<void> => {
        await BaseDatabase.connection(PostDatabase.TABLE_LIKE_DESLIKE)
            .update(likeOrDeslike)
            .where({
                user_id: likeOrDeslike.user_id,
                post_id: likeOrDeslike.post_id
            })

    }

}
