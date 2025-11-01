"use server"

import * as v from 'valibot';
import { createClient } from '@/lib/supabase/server'; 

const postSchema = v.object({
    title: v.string(),
    freeContent: v.string(),
    paidContent: v.string(),
})

export async function createPost(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    console.log(user);
    if (!user) {
        return { success: false, message: "認証が必要です" };
    }
    const rawData = {
        title: formData.get("title"),
        freeContent: formData.get("freeContent"),
        paidContent: formData.get("paidContent"),
    }
    try {
        const validatedData = v.parse(postSchema, rawData);

        const {data, error} = await supabase
            .from("Posts")
            .insert({
                user_id: user.id,
                post_title: validatedData.title,
                free_content: validatedData.freeContent,
                paid_content: validatedData.paidContent,
                good_count: 0,
                bad_count: 0,
            })
        console.log(data);
        if (error) {
            console.error("supabase insert error",error);
        }
    } catch (error) {
        console.error(error);
    }
}
