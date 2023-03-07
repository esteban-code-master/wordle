import db from "../database/connection"
import UserFactory from "./user"
import GamesFactory from "./games"
import WordsFactory from "./words"
import user from "./user"

const users = UserFactory(db)
const games = GamesFactory(db)
const words = WordsFactory(db)

users.hasMany(games, {
    foreignKey: {
        name: 'userId'
    },
    as: 'games'
})

games.belongsTo(users, {
    foreignKey: 'userId',
    as: 'users'
})

games.belongsTo(words, {
    foreignKey: 'wordId',
    as: 'words'
})

export {
    users,
    games,
    words
}