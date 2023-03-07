import { server } from './app'
import { config } from '@environment/environment'

server.listen(config.serverPort, () => {
	console.log(`Listening http://localhost:${config.serverPort}`)
})
