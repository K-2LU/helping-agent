import Occupation from "#models/occupation";
import { PaginatedResult } from "#types/common";
import { CreateOccupationDTO, PublicOccupationType } from "#types/occupation";

export class OccupationService {
  async create(payload: CreateOccupationDTO) {
    const query = await Occupation.create({
      name: payload.name,
      details: payload.details,
      createdBy: payload.createdBy
    })

    return query;
  }

  async get(page: number, limit: number)
    : Promise<PaginatedResult<PublicOccupationType>> {

    const occupationList = await Occupation.query()
      .select('name', 'details')
      .orderBy('created_at', 'desc')
      .paginate(page, limit)

    const serializedData = occupationList.serialize()

    const publicOccupations: PublicOccupationType[] = occupationList.all()
      .map((occupation) => {
        return {
          name: occupation.name,
          details: occupation.details,
        }
      })

    return {
      meta: serializedData.meta,
      data: publicOccupations
    }
  }
}