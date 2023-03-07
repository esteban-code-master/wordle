import { IUserGames } from "@entities/user/user_games"
import { IWord } from "@entities/word/word"
import { words } from "@models/index"
import { WordRepository } from "@repository/word/word.repository"

export class GameMemory implements IUserGames {

    private wordUse: Array<number>
    private _attempts: number
    public username: string
    public wordCurrent: string
    public timeInterval!: ReturnType<typeof setInterval>
    public gameId!: number

    constructor(private readonly __wordRepository: WordRepository){
        this.wordCurrent = ''
        this.wordUse = []
        this._attempts = 0
        this.username = ''
    }

    public async randomWord(): Promise<IWord | any>{
        return await this.repeatSearch()
    }

    private isWordNotUse(wordId: number): boolean {
        return !this.wordUse.includes(wordId)
    }

    private async repeatSearch (max_repeat = 10){

        const wordFound:IWord = await this.__wordRepository.findOne()
        if(this.isWordNotUse(wordFound.id)){
            this.wordUse.push(wordFound.id)
            this.wordCurrent = wordFound.name
            return wordFound
        }

        if(max_repeat === 0){
            this.wordCurrent = "@none/word"
            return wordFound
        }

        this.repeatSearch(max_repeat - 1)
    }

    public incrementAttempt(){
        this._attempts++
    }

    public resetAttempt(){
        this._attempts = 0
    }

    public get attempts(){
        return this._attempts
    }
}