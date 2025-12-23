import type { HttpContext } from '@adonisjs/core/http'

import { UserService } from "#services/user_service";
import { inject } from "@adonisjs/core";

@inject()
export default class UsersController {
    constructor(
        protected userService: UserService
    ) { }

    async getAll({ response }: HttpContext) {
        const publicUsers = await this.userService.getAll();

        return response.ok(publicUsers);
    }

}