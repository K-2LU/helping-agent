import User from '#models/user'
import { signupValidator } from '#validators/auth';
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
}