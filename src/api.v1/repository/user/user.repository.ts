import { users } from "@models/index"
import { IUser } from "@entities/user/user"

export class UserRepository {

    public async create( user: IUser ): Promise<any> {
        return await users.create({
            username: user.username,
            password: user.password
        })
    }

    public async findOne( username: string ): Promise<IUser | any>{
        return await users.findOne({ 
            where: {
                username: username
            }
        }) 
    }
}