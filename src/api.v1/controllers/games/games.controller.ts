import { NextFunction, Request, Response } from 'express'
import { route, POST, GET, before } from 'awilix-express'
import { Http } from '@shared/enum/http.enum'
import { authenticateMiddleware } from '@shared/middleware/auth'
import { GamesService } from '@service/games/games.service'


@route('/ranking')
export class GamesController {
	constructor(private gamesService: GamesService){}

    @route('/users')
	@GET()
    @before([authenticateMiddleware])
	public async getTopGames(req: Request, res: Response, next: NextFunction): Promise<void> {
		try
		{
			const games = await this.gamesService.findTopGames()

			res.status(Http.OK).json({
				status: res.statusCode,
                data: games
			})
			
		}
		catch(error: any){
			next(error)
		}
	}

    @route('/words')
    @GET()
    @before([authenticateMiddleware])
	public async getTopWords(req: Request, res: Response, next: NextFunction): Promise<void> {
		try
		{
			const games = await this.gamesService.findTopWord()
			res.status(Http.OK).json({
				status: res.statusCode,
                data: games
			})
			
		}
		catch(error: any){
			next(error)
		}
	}
}
