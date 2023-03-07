import { GamesRepository } from "@repository/games/games.repository";

export class GamesService {
    private readonly getTopGames: number = 10
    private readonly getTopWords: number = 10
    constructor(private readonly gamesRepository: GamesRepository){}

    public async findTopGames(){
        return await this.gamesRepository.findTopGames(this.getTopGames)
    }

    public async findTopWord(){
        return await this.gamesRepository.findTopWord(this.getTopWords)
    }
}