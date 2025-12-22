import User from '#models/user'
import { AuthService } from '#services/auth_service';
import { OtpService } from '#services/otp_service';
import { loginValidator, signupValidator } from '#validators/auth';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http'
import { SimpleMessagesProvider } from '@vinejs/vine';
import vine from '@vinejs/vine';

@inject()
export default class AuthController {

    constructor(
        protected authService: AuthService,
        protected otpService: OtpService
    ) { }

    async signup({ request, response }: HttpContext) {
        const payload = await request.validateUsing(
            signupValidator,
            {
                messagesProvider: new SimpleMessagesProvider({
                    'phoneNumber.database.unique': 'Phone number already in use.',
                    'password.minLength': 'Your password must be 8+ characters.',
                    'phoneNumber.required': 'Phone Number is required',
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

    async me({ auth, response }: HttpContext) {
        const user = auth.getUserOrFail();

        const userData = await this.authService.me(user);

        return response.ok(userData);
    }

    async sendOtp({ auth, response }: HttpContext) {
        const user = auth.getUserOrFail()
        await this.otpService.send(user, 'verification')

        return response.ok({
            message: 'New OTP sent'
        })
    }

    async verifyOtp({ auth, request, response }: HttpContext) {
        const user = auth.getUserOrFail()

        const { code } = await request.validateUsing(
            vine.compile(
                vine.object({
                    code: vine.string().fixedLength(6)
                })
            )
        )

        const isValid = await this.otpService.verify(user, code, 'verification');
        if (!isValid) {
            return response.badRequest({
                message: 'Invalid or expired OTP'
            })
        }

        user.verified = true;
        await user.save()

        return response.ok({
            message: "User verification successful"
        })
    }
}