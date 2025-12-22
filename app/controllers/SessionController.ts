import User from "#models/user";
import type { HttpContext } from "@adonisjs/core/http";

export default class SessionController {
    async store({request } : HttpContext)  {
        const { phoneNumber, password } = request.only(['phoneNumber', 'password']);

        const user = await User.verifyCredentials(phoneNumber, password);
    }
}