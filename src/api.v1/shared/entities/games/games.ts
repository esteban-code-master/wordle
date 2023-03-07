export interface IGamesService  {
    play( word: string ): void
    newGame(): void
}

export interface IGames{
    id?: number,
    userId?: number
    wordId?: number
    winner?: boolean
    date?: string
}