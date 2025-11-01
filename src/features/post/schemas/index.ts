import * as v from 'valibot';

export const postSchema = v.object({
    title: v.string(),
    freeContent: v.string(),
    paidContent: v.string(),
})
