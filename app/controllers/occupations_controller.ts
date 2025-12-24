import { OccupationService } from '#services/occupation_service';
import { SearchParamsValidator } from '#validators/search';
import { CreateOccupationValidator } from '#validators/occupation';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class OccupationsController {
    constructor(
        protected occupationService: OccupationService
    ) { }

    async create({ auth, request, response }: HttpContext) {
        const user = auth.getUserOrFail();
        const payload = await request.validateUsing(CreateOccupationValidator);

        const result = await this.occupationService
            .create({
                name: payload.name,
                details: payload.details,
                createdBy: user.id
            })

        return response.created(result)
    }

    async index({ request, response }: HttpContext) {

        const payload = await request.validateUsing(SearchParamsValidator)
        const result = await this.occupationService
            .get(
                payload.page,
                payload.limit,
                payload.searchString
            )

        return response.ok(result)
    }
}