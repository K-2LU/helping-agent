import User from "#models/user";
import { LoginPayload, SignUpPayload } from "#types/auth";
import { UserData } from "#types/user";
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

  async login(payload: LoginPayload):
    Promise<{
      token: AccessToken
    }
    > {
    const user = await User.verifyCredentials(payload.phoneNumber, payload.password);

    const token = await User.accessTokens.create(user);

    return { token };
  }

  async me(user: User): Promise <UserData> {
    return {
      name: user.name,
      phoneNumber: user.phoneNumber,
      location: user.location,
      verified: user.verified,
    }
  }
}