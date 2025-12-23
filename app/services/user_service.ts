import User from "#models/user";
import { PublicUserType } from "#types/user";
import db from "@adonisjs/lucid/services/db";

export class UserService {
  async getAll(): Promise<PublicUserType[]> {
    const dbUsers = await User.query()
      .select('users.*')
      .select(
        db.from('occupation_histories')
          .join('occupations', 'occupations.id', 'occupation_histories.occupation_id')
          .whereColumn('occupation_histories.user_id', 'users.id')
          .orderBy('occupation_histories.starting_date', 'desc')
          .limit(1)
          .select('occupations.name')
          .as('active_occupation_name')
      )

      const publicUsers: PublicUserType[] = dbUsers.map((user) => {
        return {
          data: {
            name: user.name,
            phoneNumber: user.phoneNumber,
            location: user.location,
            verified: !!user.verified,
          },
          occupation: user.$extras.active_occupation_name || null
        }
      })

      return publicUsers;
  }
}