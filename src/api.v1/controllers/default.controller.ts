import { Request, Response } from 'express'
import { route, GET } from 'awilix-express'

@route('/')
export class DefaultController {

	@route('/')
	@GET()
	public index(req: Request, res: Response): void {
		console.log('execute')
		res.send({
			title: 'Dacodes API',
			text: 'GET',
			date: new Date()
		})
	}
}
