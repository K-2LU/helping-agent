import vine from '@vinejs/vine'
import { paginationSchemaWithDefault } from './paginate.js'

export const SearchParamsValidator = vine.compile(
    vine.object({
        searchString: vine.string().minLength(3).maxLength(12).optional(),
        ...paginationSchemaWithDefault,
    })
)

export const searchParamsMessages = {
        'searchString.required': 'A search string is required',
}