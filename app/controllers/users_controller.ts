import type { HttpContext } from '@adonisjs/core/http'

import { UserService } from "#services/user_service";
import { inject } from "@adonisjs/core";
import { paginationValidator } from '#validators/paginate';

@inject()
export default class UsersController {
    constructor(
        protected userService: UserService
    ) { }

    async getAll({ request, response }: HttpContext) {
        const payload = await request.validateUsing(paginationValidator)

        const page = payload.page || 1;
        const limit = payload.limit || 10;

        const result = await this.userService.getAll(page, limit);
        
        return response.ok(result);
    }

}