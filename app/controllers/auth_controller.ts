import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash';

export default class AuthController {
    async signup({ request, response }: HttpContext) {
        const data = request.only([
            'name', 'phoneNumber', 'password', 'location'
        ]);

        if(!data.name || !data.location || !data.password || !data.phoneNumber) {
            return response.abort({message: `missing required field`});
        }

        const exists = await User.query()
            .where('phone_number', data.phoneNumber)
            .first();

        if (exists) {
            return response.conflict({message: 'entry already exists'})
        }

        const user = await User.create({
            name: data.name,
            phoneNumber: data.phoneNumber,
            location: data.location,
            password: await hash.make(data.password),
            verified: false
        })

        const token = await User.accessTokens.create(user)

        return response.created({
            type: 'bearer ',
            token: token.value?.release(),
            user,
        })
    }
}