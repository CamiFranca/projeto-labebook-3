import { TUsers, TUsersLogin, UserDB } from "../type"
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

    
    public async createUser(UserDB: UserDB):Promise<void> {
        await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .insert(UserDB)
    }

    public async userLogin(email:string): Promise<UserDB|undefined>{
        const loginExists :UserDB[] = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .select()
        .where({email:email})

         return loginExists[0]
     }
     
}

