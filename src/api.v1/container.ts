import type { Application } from 'express'
import { asClass, createContainer } from 'awilix'
import { scopePerRequest } from 'awilix-express'
import { UserRepository } from './repository/user/user.repository'
import { GamesRepository } from '@repository/games/games.repository'

import { UserService } from './services/user/user.service'
import { AuthService } from './services/auth/auth.service'
import { GamesService } from '@service/games/games.service'

export default (app: Application): void => {
	const container = createContainer({
		injectionMode: 'CLASSIC'
	})

	container
		.register({
			gamesRepository: asClass(GamesRepository).scoped(),
			userRepository: asClass(UserRepository).scoped(),
			userService: asClass(UserService).scoped(),
			gamesService: asClass(GamesService).scoped(),
			authService: asClass(AuthService).scoped(),
		})
	app.use(scopePerRequest(container))
}
