import { IRulerGames } from "@entities/games/ruler"
import { GamesRepository } from "@repository/games/games.repository"
import { WordRepository } from "@repository/word/word.repository"
import { Socket } from "socket.io"
import { GamesServiceSocket } from "../services/games.socket/games.service"
import { GameMemory } from "../services/word/game_memory.service"

export const  WordSocketIO = async (socket: Socket) => {
    const __ruler_game: IRulerGames = {
        sizeWord: 5,
        attempts: 5
    }
    const __wordRepository = new WordRepository()
    const __gameRepository = new GamesRepository()
    const __gameMemory = new GameMemory(__wordRepository)
    const __gamesService = new GamesServiceSocket(
        __gameMemory, 
        __ruler_game,
        __gameRepository,
        socket
    )

    socket.on('verify_word_socket', __gamesService.play)
    socket.on('new_game_socket', __gamesService.newGame)
}