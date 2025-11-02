"use client"

import { BackButton } from "./back-button"

export function PostCreationHeader() {
    return (
        <div className="flex h-32 space-x-5 bg-[#FFEBB1]">
            <BackButton />
            <h1 className="my-auto text-2xl">投稿</h1>
        </div>
    )
}
