import { NextFunction, Request, Response } from 'express'
import { route, POST, GET, before } from 'awilix-express'
import { UserService } from '@service/user/user.service'
import { Requiered } from '@shared/utilities/requiered'
import { Http } from '@shared/enum/http.enum'
import { authenticateMiddleware } from '@shared/middleware/auth'

@route('/user')
export class UserController {
	constructor(private userService: UserService){}

	@POST()
	public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
		try
		{
			const { username = '', password = '' } = req.body
			if(Requiered.isValidUser({ username, password })){
				const user = await this.userService.create({
					username: username,
					password: password
				})

				res.status(Http.CREATED).json({
					status: res.statusCode,
					message: 'new user create',
					user: user.username
				})

				return 
			}

			res.status(Http.NOT_FOUND).json({
				status: res.statusCode,
				message: 'error to created user',
			})
			
		}
		catch(error: any){
			next(error)
		}
	}
}
