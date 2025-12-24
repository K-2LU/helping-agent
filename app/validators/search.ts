import vine from '@vinejs/vine'

export const SearchParamsValidator = vine.compile(
    vine.object({
        searchString: vine.string().minLength(3).maxLength(12),
        limit: vine.number().optional().transform((value) =>{
            if(!value) return 3
            if (value < 1)  return 3
            if (value > 15) return 15
            
            return value
        })
    })
)

export const searchParamsMessages = {
        'searchString.required': 'A search string is required',
        'searchString.minLength': 'Search string must be at least 3 characters long',
}