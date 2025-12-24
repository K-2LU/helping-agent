import vine from '@vinejs/vine'

export const CreateOccupationValidator = vine.compile(
    vine.object({
        name: vine.string().minLength(3).maxLength(20),
        details: vine.string().maxLength(255),
    })
)