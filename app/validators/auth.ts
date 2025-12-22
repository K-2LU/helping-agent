import vine from '@vinejs/vine'

export const signupValidator = vine.compile(
    vine.object({
        name: vine.string().trim().minLength(3),
        location: vine.string().trim(),
        phoneNumber: vine.string().
            mobile()
            .unique(async (db, value) => {
                const user = await db.from('users')
                    .where('phone_number', value)
                    .first();

                return !user;
            }),
        password: vine.string()
            .minLength(8)
            .maxLength(32)
        ,
    })
)