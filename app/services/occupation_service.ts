import Occupation from "#models/occupation";
import { CreateOccupationDTO } from "#types/occupation";

export class OccupationService {
  async create(payload: CreateOccupationDTO)    {
    const query = await Occupation.create({
        name: payload.name,
        details: payload.details,
        createdBy: payload.createdBy
    })

    return query;
  }
}