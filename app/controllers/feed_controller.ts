import type { HttpContext } from '@adonisjs/core/http'

import { inject } from "@adonisjs/core";
import { paginationValidator } from '#validators/paginate';
import { FeedService } from '#services/feed_service';

@inject()
export default class UsersController {
    constructor(
        protected feedService: FeedService
    ) { }

    async getAllUsers({ request, response }: HttpContext) {
        const payload = await request.validateUsing(paginationValidator)

        const page = payload.page || 1;
        const limit = payload.limit || 10;

        const result = await this.feedService.getAllUsers(page, limit);
        
        return response.ok(result);
    }

}