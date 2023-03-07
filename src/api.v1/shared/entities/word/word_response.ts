export interface IWordResponse {
    correct: number,
    coincidences: Array<IWordResponseOption>
}

export interface IWordResponseOption {
    letter: string
    value: number
}