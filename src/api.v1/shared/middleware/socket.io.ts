import { config } from "@environment/environment"
import { Socket } from "socket.io"
import { Token } from "@shared/token/jwt"

export const authenticateMiddlewareSoketIo = (socket: Socket, next: any) => {

    const token: any = socket.handshake.headers.acces_token

    const is_verify = token? Token.verify(token) : {}
    if(is_verify){
        next()
    }
}