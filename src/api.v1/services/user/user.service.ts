import { IUser } from "@entities/user/user"
import { Bcrypt } from "@shared/utilities/bcrypt"
import { UserRepository } from "../../repository/user/user.repository"

export class UserService {

    constructor(private readonly userRepository: UserRepository){}

    public async create(user: IUser): Promise<IUser>{
        const hashPassword: string = await Bcrypt.encript(user.password)

        return await this.userRepository.create({
            username: user.username,
            password: hashPassword
        })
    }
}