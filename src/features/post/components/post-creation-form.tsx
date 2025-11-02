"use client"

import * as v from 'valibot';
import { createPost } from "../actions/create-post"
import { postFreeContent, postPaidContent, postTitleSchema } from "../schemas";
import { useState } from 'react';

export function PostCreationForm() {

    async function handleAction(formData: FormData): Promise<void> {
        await createPost(formData);
    }

    return (
        <div className="mx-10 my-10">
            <form action={handleAction} className="flex flex-col items-center space-y-4">
                <div className="flex flex-col p-6 space-y-5 bg-[#FFFEEE] shadow-xl rounded-xl w-full max-w-2xl">
                    <Input label="タイトル" name="title" schema={postTitleSchema}/>
                    <Textarea label="無料テキスト" name="freeContent" schema={postFreeContent}></Textarea>
                    <Textarea label="有料テキスト" name="paidContent" schema={postPaidContent}></Textarea>
                </div>
                <button type="submit" className="py-2 w-1/2 max-w-sm shadow-xl rounded-full bg-linear-to-r from-[#FFF7A0] to-[#FFAFAB]">投稿する</button>
            </form>
        </div>
    )
}

type Props = {
    label: string,
    name: string,
    schema: v.BaseSchema<any, any, any>,
}

function Input({label, name, schema}: Props) {
    const [error, setError] = useState("");

    function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        const result = v.safeParse(schema, value);
        if(!result.success) {
            setError(result.issues[0].message);
        } else { 
            setError("");
        }
    }

    return(
        <div className="flex flex-col">
            <label htmlFor={name}>{label}</label>
            <input type="text" name={name} id={name} onChange={(e) => handleChange(e)} className="shadow-inner rounded-md bg-linear-to-r from-[#F7FBFD] to-[#E3F2F4] "/>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    )
}

function Textarea({label, name, schema}: Props){
    const [error, setError] = useState("");

    function handleChange(e:React.ChangeEvent<HTMLTextAreaElement>) {
        const val = e.target.value;
        const result = v.safeParse(schema, val);
        if(!result.success) {
            setError(result.issues[0].message);
        } else {
            setError("");
        }
    }
    
    return(
        <div className="flex flex-col">
            <label htmlFor={name}>{label}</label>
            <textarea name={name} id={name} onChange={(e) => handleChange(e)} className="shadow-inner rounded-md bg-linear-to-r from-[#F7FBFD] to-[#E3F2F4] "></textarea>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    )
}
