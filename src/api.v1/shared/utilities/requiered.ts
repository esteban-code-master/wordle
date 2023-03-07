import { IUser } from "@entities/user/user"

export class Requiered {

    public static isValidUser(user: IUser){
        return user.password !== "" && user.username !== ""
    }
}