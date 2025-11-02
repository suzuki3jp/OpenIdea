"use client"

import { BackButton } from "./back-button"

export function PostCreationHeader() {
    return (
        <div className="bg-[#FFEBB1] h-32 flex space-x-5">
            <BackButton />
            <h1 className="text-2xl my-auto">投稿</h1>
        </div>
    )
}
