import { games } from "@models/index"
import { IGames } from "@entities/games/games"
import sequelize from "sequelize"

export class GamesRepository {

    public async suscribeGame( game: IGames ): Promise<any> {
        return await games.create({
            userId: game.userId,
            wordId: game.wordId
        })
    }

    public async updateWinner( gameId: number,winner: boolean = true ){
        return await games.update({ winner: winner },
            {
                where: {
                    id: gameId
                }
            }
        )
    }

    public async findTopGames(limit: number){
        return await games.findAll({
            order: [[ 'count_winner', 'DESC' ]],
            where: { winner: true },
            include: {
                association: 'users',
                attributes: ['username'],
                required: true
            },
            attributes: ['userId', [sequelize.fn('count', sequelize.col('winner')), 'count_winner']],
            group: ['users.id','games.userId'],
            limit: limit
        })
    }

    public async findTopWord(limit: number){
        return await games.findAll({
            order: [[ 'count_word', 'DESC' ]],
            where: { winner: true },
            attributes: [[sequelize.fn('count', sequelize.col('wordId')), 'count_word']],
            include: {
                association: 'words',
                required: true
            },
            group: ['games.wordId','words.id'],
            limit: limit
        })
    }
}