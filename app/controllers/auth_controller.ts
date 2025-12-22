import User from '#models/user'
import { loginValidator, signupValidator } from '#validators/auth';
import type { HttpContext } from '@adonisjs/core/http'
import { SimpleMessagesProvider } from '@vinejs/vine';

export default class AuthController {
    async signup({ request, response }: HttpContext) {
        const payload = await request.validateUsing(
            signupValidator,
            {
                messagesProvider: new SimpleMessagesProvider({
                    'phoneNumber.unique': 'Phone number already in use.',
                    'password.minLength': 'Your password must be 8+ characters.',
                    'required': '{{ field }} field is required.'
                })
            }
        );
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
        const { phoneNumber, password } = await request.validateUsing(loginValidator, {
            messagesProvider: new SimpleMessagesProvider({
                'required' : 'Enter required {{ field }}'
            })
        });

        const user = await User.verifyCredentials(phoneNumber, password);

        const token = await User.accessTokens.create(user);

        return response.ok({
            type: 'bearer ',
            token: token.value?.release(),
        })
    }

    async logout({ auth, response }: HttpContext) {
        const user = auth.getUserOrFail();

        const token = user.currentAccessToken.identifier;
        if (!token) {
            return response.badRequest({ message: 'Token not found' });
        }

        await User.accessTokens.delete(user, token);
        return response.ok({ message: 'Log out successfull' })
    }
}