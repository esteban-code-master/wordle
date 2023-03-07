import { IWord } from "@entities/word/word"
import { words } from "@models/index"
import { Sequelize } from "sequelize"

export class WordRepository {

    public async findOne(): Promise<IWord | any>{

        const [word]: any = await words.findAll({
            order: [Sequelize.literal('random()')],
            limit: 1
        })

        return word
    }
}