import { Users } from "../models/User"
import { TUsers, TUsersLogin } from "../type"
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

    public async userLogin(login:TUsersLogin){
       const loginExists = await BaseDatabase
       .connection(UserDatabase.TABLE_USERS)
       .where({login})
        console.log(loginExists)
       return loginExists
    }
    
    public async createUser(newUserDB: TUsers) {
        await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .insert(newUserDB)
    }

}

