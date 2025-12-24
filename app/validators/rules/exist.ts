import db from '@adonisjs/lucid/services/db';
import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types';

type Options = {
    table: string;
    column: string;
}

// rule to ensure the given data is in database
async function exists(
    value: unknown,
    options: Options,
    field: FieldContext) {

    if (typeof value !== 'string'
        && typeof value !== 'number')
        return

    const row = await db
        .from(options.table)
        .where(options.column, value)
        .first()

    if (!row) {
        field.report('This selected {{ field }} is invalid',
            'exists', field);
    }
}

export const existsRule = vine.createRule(exists);