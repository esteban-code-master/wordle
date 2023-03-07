import bcrypt from 'bcrypt'

export class Bcrypt { 

    public static async encript(password: string): Promise<string>{
        const hash = await bcrypt.hash( password,10 )
        return hash
    }

    public static async compare(password: { plain:string, hash: string }){
        return await bcrypt.compare(password.plain, password.hash)
    }
}