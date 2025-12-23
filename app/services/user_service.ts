import User from "#models/user";
import { PublicUserType } from "#types/user";
import { DateTime } from "luxon";

export class UserService {
  async getAll(): Promise<PublicUserType[]> {
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
          .limit(1)
      })

    const publicUsers: PublicUserType[] = dbUsers.map((user) => {
      const activeJob = user.occupations[0] || null;

      return {
        data: {
          name: user.name,
          phoneNumber: user.phoneNumber,
          location: user.location,
          verified: user.verified,
        },
        occupation: activeJob ? activeJob.name : null,
      }
    })

    return publicUsers;
  }
}