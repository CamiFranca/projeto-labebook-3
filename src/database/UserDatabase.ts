import { TUsers, UserDB } from "../type"
import { BaseDatabase } from "./BaseDatabase";



export class UserDatabase extends BaseDatabase {

    public static TABLE_USERS = "users"

    public async getUser(q:string|undefined) {
        let usersDB 
        
        if(q){
            const saveUsersDB: TUsers[]  = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .where("name","LIKE",`%${q}%`)
            usersDB = saveUsersDB
        }else{
            const saveUsersDB: TUsers[]  = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            usersDB = saveUsersDB
        }
        return usersDB 
    }

    public async getUserById(id:string) {
        const saveUsersDB: TUsers[]  = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .where({id:id})

        return saveUsersDB
    }

    
    public async createUser(userDB: UserDB):Promise<void> {
        console.log("DB",userDB)
        await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .insert(userDB)
    }

    public async findEmail(email:string): Promise<UserDB|undefined>  {
        const emailExists :UserDB[] = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        // .select()
        .where({email})
        return emailExists[0]

    }

    public async userLogin (email:string): Promise<UserDB|undefined>  {
        const loginExists :UserDB[] = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .select()
        .where({email:email})

         return loginExists[0]
     }
     
}

