"use client"

import { createPost } from "../actions/create-post"

export function PostCreationForm() {
    return (
        <form action={createPost}>
            <label htmlFor="title">タイトル</label>
            <input type="text" name="title" id="title" />
            <label htmlFor="freeContent">無料部分</label>
            <textarea name="freeContent" id="freeContent"></textarea>
            <label htmlFor="paidContent">有料部分</label>
            <textarea name="paidContent" id="paidContent"></textarea>
            <button type="submit">送信</button>
        </form>
    )
}
