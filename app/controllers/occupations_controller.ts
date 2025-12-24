import { OccupationService } from '#services/occupation_service';
import { searchParamsMessages, SearchParamsValidator } from '#validators/common';
import { CreateOccupationValidator } from '#validators/occupation';
import { paginationValidatorWithDefault } from '#validators/paginate';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http'
import { SimpleMessagesProvider } from '@vinejs/vine';

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

    async get({ request, response }: HttpContext) {
        const payload = await request.validateUsing(paginationValidatorWithDefault)
        const result =  await this.occupationService
        .get(payload.page, payload.limit)

        return response.ok(result)
    }
}