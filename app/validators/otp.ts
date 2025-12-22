import vine from '@vinejs/vine'

export const OtpValidator = vine.compile(
    vine.object({
        code: vine.string().fixedLength(6)
    })
)