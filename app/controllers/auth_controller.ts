import User from '#models/user'
import { loginValidator, signupValidator } from '#validators/auth';
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
    async signup({ request, response }: HttpContext) {
        const payload = await request.validateUsing(signupValidator);
        const user = await User.create({
            name: payload.name,
            phoneNumber: payload.phoneNumber,
            location: payload.location,
            password: payload.password,
            verified: true,
        })

        const token = await User.accessTokens.create(user)

        return response.created({
            type: 'bearer ',
            token: token.value?.release(),
            user,
        })
    }

    async login({ request, response }: HttpContext) {
        const { phoneNumber, password } = await request.validateUsing(loginValidator);

        const user = await User.verifyCredentials(phoneNumber, password);

        const token = await User.accessTokens.create(user);

        return response.ok({
            type: 'bearer ',
            token: token.value?.release(),
        })
    }
}