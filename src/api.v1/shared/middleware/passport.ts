import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt"
import { config } from "@environment/environment"

const setting: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.secretToken
}

export const passportStrategy = new Strategy( setting, async ( payload, done ) => {
	try
	{
		if (payload) {
			return done(null, payload)
		}

		return done(null, false)
	}
	catch (error)
	{
		console.log(error)
	}
})