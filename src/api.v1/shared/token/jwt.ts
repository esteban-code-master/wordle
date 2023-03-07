import jwt from 'jsonwebtoken'
import { IUser } from '@entities/user/user'
import { config } from '@environment/environment'

const expireTimeStamp: number = Date.now() + 60 * 1000

export class Token{
    
    public static create(user: IUser){
        const payload = {
            userId: user.id,
            username: user.username,
            iat: Math.floor(Date.now() / 1000),
            exp: expireTimeStamp
        }
    
        return jwt.sign(payload, config.secretToken)
    }

    public static verify( token: string ){
        return jwt.verify(token, config.secretToken)
    }

    public static decode( token: string ){
        return jwt.decode(token)
    }
}