import User from "#models/user";
import hash from "@adonisjs/core/services/hash";
import type { HttpContext } from "@adonisjs/core/http";

export default class SessionController {
    async store({request, response} : HttpContext)  {
        const { phoneNumber, password } = request.only(['phoneNumber', 'password']);

        const user = await User.findBy('phoneNumber', phoneNumber);

        if(!user)   {
            return response.abort('Invalid credentials');
        }

        const isPasswordValid = await hash.verify(user.password, password)

        if(!isPasswordValid)    {
            return response.abort('Invalid Credentials')
        }
    }
}