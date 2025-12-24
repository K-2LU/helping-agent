import vine from '@vinejs/vine'

export const paginationSchema = {
        page: vine.number().min(1),
        limit: vine.number().min(1).max(50).optional(),
}

export const paginationSchemaWithDefault = {
        page: vine.number().optional().transform((value) => {
            if (!value || value < 1) return 1;
            return value;
        }),
        limit: vine.number().optional().transform((value) => {
            if (!value) return 10;
            if (value > 50) return 50;
            if (value < 1) return 10;
            return value;
        }),
    }

export const paginationValidator = vine.compile(
    vine.object(paginationSchema)
)

export const paginationValidatorWithDefault = vine.compile(
    vine.object(paginationSchemaWithDefault)
)
