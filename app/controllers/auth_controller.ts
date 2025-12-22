import User from '#models/user'
import { AuthService } from '#services/auth_service';
import { loginValidator, signupValidator } from '#validators/auth';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http'
import { SimpleMessagesProvider } from '@vinejs/vine';

@inject()
export default class AuthController {

    constructor(protected authService: AuthService) { }

    async signup({ request, response }: HttpContext) {
        const payload = await request.validateUsing(
            signupValidator,
            {
                messagesProvider: new SimpleMessagesProvider({
                    'phoneNumber.database.unique': 'Phone number already in use.',
                    'password.minLength': 'Your password must be 8+ characters.',
                    'phoneNumber.required' : 'Phone Number is required',
                    'required': '{{ field }} field is required.'
                })
            }
        );

        const { user, token } = await this.authService.signup(payload);

        return response.created({
            type: 'bearer ',
            token: token.value?.release(),
            user,
        })
    }

    async login({ request, response }: HttpContext) {
        const { phoneNumber, password } = await request.validateUsing(loginValidator, {
            messagesProvider: new SimpleMessagesProvider({
                'required': 'Enter required {{ field }}'
            })
        });

        const { token } = await this.authService.login({
            phoneNumber,
            password
        })

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