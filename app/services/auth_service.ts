import User from "#models/user";
import { SignUpPayload } from "#types/auth";
import { AccessToken } from "@adonisjs/auth/access_tokens";

export class AuthService {
  async signup(payload: SignUpPayload):
    Promise<{
      user: User;
      token: AccessToken
    }> {

    const user = await User.create({
      name: payload.name,
      phoneNumber: payload.phoneNumber,
      location: payload.location,
      password: payload.password,
      verified: false,
    })
    const token = await User.accessTokens.create(user)

    return { user, token }
  }
}