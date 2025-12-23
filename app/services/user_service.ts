import User from "#models/user";
import { PaginatedResult } from "#types/common";
import { PublicUserType } from "#types/user";
import { DateTime } from "luxon";

export class UserService {
  async getAll(page: number, limit: number)
  : Promise<PaginatedResult<PublicUserType>> 
  {
    const currentDate = DateTime.now().toISODate();

    const dbUsers = await User.query()
      .preload('occupations', (query) => {
        query
          .wherePivot('starting_date', "<=", currentDate)
          .andWhere((group) => {
            group
              .whereNullPivot('ending_date')
              .orWherePivot('ending_date', ">=", currentDate)
          })
          .orderBy('starting_date', 'desc')
      })
      .paginate(page, limit)

    const publicUsers: PublicUserType[] = dbUsers.all().map((user) => {
      const mostRecentJob = user.occupations[0] || null;

      return {
        data: {
          name: user.name,
          phoneNumber: user.phoneNumber,
          location: user.location,
          verified: user.verified,
        },
        occupation: mostRecentJob ? mostRecentJob.name : 'None',
      }
    })

    const serializedData = dbUsers.serialize();

    return {
      meta: serializedData.meta,
      data: publicUsers
    }
  }
}