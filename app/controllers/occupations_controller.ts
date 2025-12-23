import { AuthService } from '#services/auth_service';
import { OccupationService } from '#services/occupation_service';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class OccupationsController {
    constructor(
        protected authService: AuthService,
        protected occupationService: OccupationService
    ) { }

    async create({ auth, request, response }: HttpContext) {
        const user = auth.getUserOrFail();

        const name = request.input('name');
        const details = request.input('details')
        const createdBy = user.id;

        const result = await this.occupationService
            .create({ name, details, createdBy })

        return response.created(result)
    }
}