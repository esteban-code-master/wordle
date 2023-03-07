import { IGames, IGamesService } from "@entities/games/games"
import { IRulerGames } from "@entities/games/ruler"
import { IUser } from "@entities/user/user"
import { IWord } from "@entities/word/word"
import { IWordResponse } from "@entities/word/word_response"
import { GamesRepository } from "@repository/games/games.repository"
import { DbStatus } from "@shared/enum/bd.status"
import { Game } from "@shared/enum/game.enum"
import { Token } from "@shared/token/jwt"
import { Validate } from "@shared/utilities/validate"
import { Socket } from "socket.io"
import { GameMemory } from "../word/game_memory.service"

export class GamesServiceSocket implements IGamesService {

    private readonly sizeWord: number
    private readonly attempts: number

    constructor(
        private gameMemory: GameMemory, 
        private ruler: IRulerGames, 
        private gameRespository: GamesRepository,
        private socket: Socket
    ){
        this.attempts = ruler.attempts
        this.sizeWord = ruler.sizeWord
    }

    public newGame = () => {
        this.suscribeWord()
        clearInterval(this.gameMemory.timeInterval)
        this.gameMemory.timeInterval = setInterval(this.suscribeWord, Game.minutesRound)
    }

    public play = async ( word: string ): Promise<void> => {
        const is_permission = Validate.sizeWord({ word: word, size: this.attempts }) && Validate.isNotEmpyWord(this.gameMemory.wordCurrent)
        if(is_permission){
            if(this.gameMemory.attempts < this.attempts){
                this.gameMemory.incrementAttempt()
                const coincidences: IWordResponse = Validate.coincidencesWord({ equal: word.toUpperCase(), to: this.gameMemory.wordCurrent })
                await this.isWinner(coincidences)

                console.table({
                    word_user: word,
                    word_current: this.gameMemory.wordCurrent,
                    attempts: this.gameMemory.attempts,
                    correct_word: coincidences.correct,
                })

                console.table(coincidences.coincidences)
            }
            return
        }
    }

    private isWinner = async( coincidencesWord: IWordResponse ): Promise<void> => {
        if( coincidencesWord.correct === this.sizeWord ){
            await this.gameRespository.updateWinner(this.gameMemory.gameId)
        }

        this.socket.emit("status_game", { coincidencesWord })
    }

    private suscribeWord = async () => {
        const word: IWord = await this.gameMemory.randomWord()
        const user: any =  Token.decode(this.socket.client.request.headers.acces_token as string)
        const new_game: IGames = await this.gameRespository.suscribeGame({ userId: user.userId, wordId: word.id })
        if(new_game){
            this.gameMemory.resetAttempt()
            this.gameMemory.gameId = new_game.id ?? 0
            this.gameMemory.username = user.username

            console.table({
                word: word.name,
                username: this.gameMemory.username,
                attempts: this.gameMemory.attempts,
                message: 'new game'
            })
        }
    }
}