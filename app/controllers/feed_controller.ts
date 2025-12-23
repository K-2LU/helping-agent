import type { HttpContext } from '@adonisjs/core/http'

import { inject } from "@adonisjs/core";
import { paginationValidatorWithDefault } from '#validators/paginate';
import { FeedService } from '#services/feed_service';

@inject()
export default class FeedController {
    constructor(
        protected feedService: FeedService
    ) { }

    async getAllUsers({ request, response }: HttpContext) {
        const payload = await request
            .validateUsing(paginationValidatorWithDefault)

        const result = await this.feedService
            .getAllUsers(payload.page, payload.limit);

        return response.ok(result);
    }

}