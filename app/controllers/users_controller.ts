import type { HttpContext } from '@adonisjs/core/http'

import { UserService } from "#services/user_service";
import { inject } from "@adonisjs/core";

@inject()
export default class UsersController {
    constructor(
        protected userService: UserService
    ) { }

    async getAll({ request, response }: HttpContext) {
        const page = request.input('page', 1);
        const limit = request.input('limit', 10);

        const result = await this.userService.getAll(page, limit);
        
        return response.ok(result);
    }

}