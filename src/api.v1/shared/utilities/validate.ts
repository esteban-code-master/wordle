import { IWordResponse } from "@entities/word/word_response"
import { WordStatus } from "@shared/enum/word_status.enum"

export class Validate {

    public static sizeWord( parameter: { word: string, size: number }): boolean{
        return parameter.word.length === parameter.size
    }

    public static isNotEmpyWord(word: string){
        return word.length > 0
    }

    public static coincidencesWord( parameter: { equal: string, to: string }): IWordResponse { 
        const response: IWordResponse = { correct: 0, coincidences: [] }
        const destructure_word: Array<string> = parameter.equal.split('')
        const destructure_word_compare: Array<string> = parameter.to.split('')
        let countWordCorrect: number = 0

        destructure_word.forEach(( letter : string, position: number ) => {

            const wordsFound = destructure_word_compare.find(( letter_compare: string ) => letter_compare === letter )
            const wordStatus = wordsFound ? this.samePosition(()=> destructure_word_compare[position] === wordsFound ) : WordStatus.NotFound
            wordStatus !== WordStatus.correctPlace || countWordCorrect++

            response.coincidences.push({
                letter: letter,
                value: wordStatus
            })
        })

        console.log("word_user",destructure_word)
        console.log('word_comapre',destructure_word_compare)
        console.table(response.coincidences)
        response.correct = countWordCorrect

        return response
    }

    public static samePosition(callbackCompare: Function): WordStatus{
        return callbackCompare() ? WordStatus.correctPlace : WordStatus.WrongPlace
    }
}