import { NextFunction, Request, Response } from 'express'
import { route, POST } from 'awilix-express'
import { Requiered } from '@shared/utilities/requiered'
import { Http } from '@shared/enum/http.enum'
import { AuthService } from '@service/auth/auth.service'

@route('/auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @route('/login')
    @POST()
    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try
        {
            const { username = "", password = "" } = req.body

            if(Requiered.isValidUser({ username, password })){
                
                const authUser = await this.authService.authentification({
                    username: username,
                    password: password
                })

                res.status(Http.OK).json({
                    status: res.statusCode,
                    data: authUser
                })
            }
        }
        catch(error: any){
			next(error)
		}
    }
}