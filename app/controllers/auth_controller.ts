import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine';

export default class AuthController {
    async signup({ request, response }: HttpContext) {

        const validator = vine.compile(
            vine.object({
                name: vine.string().trim().minLength(3),
                location: vine.string().trim(),
                phoneNumber: vine.string().
                    mobile()
                    .unique(async (db, value) => {
                        const user = await db.from('users')
                            .where('phone_number', value)
                            .first();

                        return !user;
                    }),
                password: vine.string().minLength(8),
            })
        )
        
        const payload = await request.validateUsing(validator);
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