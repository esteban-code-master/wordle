import { IUser } from "@entities/user/user"
import { Token } from "@shared/token/jwt"
import { Bcrypt } from "@shared/utilities/bcrypt"
import { UserRepository } from "../../repository/user/user.repository"

export class AuthService {

    constructor(private readonly userRepository: UserRepository){}

    public async authentification(user: IUser): Promise<any> {
        const foundUser: IUser = await this.userRepository.findOne(user.username)
        const checkPassword: boolean =  await Bcrypt.compare({ 
            plain: user.password,
            hash: foundUser.password 
        })

        if(checkPassword){
            const token: string = Token.create(foundUser)

            return {
                username: user.username,
                token: token
            }
        }

        throw new Error('user not found')
    }
}