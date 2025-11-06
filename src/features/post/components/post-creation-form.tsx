"use client";

import { X as DeleteTagIcon } from "lucide-react";
import React, { type Dispatch, type SetStateAction, useState } from "react";
import * as v from "valibot";
import { TagBadge } from "@/features/tags/components/tag-badge";
import { tagNameSchema } from "@/features/tags/schemas";
import type { TagType } from "@/features/tags/types";
import { createPost } from "../actions/create-post";
import {
  postFreeContentSchema,
  postPaidContentSchema,
  postTitleSchema,
} from "../schemas";
import type { NewPost } from "../types";

export function PostCreationForm() {
  const [title, setTitle] = useState("");
  const [freeContent, setFreeContent] = useState("");
  const [paidContent, setPaidContent] = useState("");
  const [tags, setTags] = useState<TagType[]>([]);

  const [isTitleError, setIsTitleError] = useState(false);
  const [isFreeContentError, setIsFreeContentError] = useState(false);
  const [isPaidContentError, setIsPaidContentError] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isDisabledButton =
    !title ||
    !freeContent ||
    !paidContent ||
    isSubmitting ||
    isTitleError ||
    isFreeContentError ||
    isPaidContentError;

  async function handleAction() {
    if (isSubmitting) return;
    const post: NewPost = {
      postTitle: title,
      freeContent: freeContent,
      paidContent: paidContent,
    };
    await createPost(post, tags);
    setIsSubmitting(false);
  }

  function deleteTag(index: number) {
    setTags((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="mx-10 my-10">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex w-full max-w-2xl flex-col space-y-5 rounded-xl bg-[#FFFEEE] p-6 shadow-xl">
          <Input
            variant="input"
            label="タイトル"
            name="title"
            setValue={setTitle}
            setIsError={setIsTitleError}
            schema={postTitleSchema}
          />
          <Input
            variant="textarea"
            label="無料テキスト"
            name="freeContent"
            setValue={setFreeContent}
            setIsError={setIsFreeContentError}
            schema={postFreeContentSchema}
          />
          <Input
            variant="textarea"
            label="有料テキスト"
            name="paidContent"
            setValue={setPaidContent}
            setIsError={setIsPaidContentError}
            schema={postPaidContentSchema}
          />
          {/* タグ */}
          <TagForm setTags={setTags} />
          <ul className="flex flex-wrap space-x-2 space-y-1">
            {tags.map((tag, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <li key={index} className="flex">
                <button type="button" onClick={(e) => deleteTag(index)}>
                  <DeleteTagIcon size={20} />
                </button>
                <TagBadge tag={tag} />
              </li>
            ))}
          </ul>
        </div>
        {/* 投稿ボタン */}
        <button
          type="button"
          onClick={handleAction}
          disabled={isDisabledButton}
          className="w-1/2 max-w-sm rounded-full bg-linear-to-r from-[#FFF7A0] to-[#FFAFAB] py-2 shadow-xl hover:cursor-pointer disabled:cursor-not-allowed"
        >
          投稿する
        </button>
      </div>
    </div>
  );
}

type InputProps = {
  variant: "input" | "textarea";
  label: string;
  name: string;
  setIsError: Dispatch<SetStateAction<boolean>>;
  setValue: Dispatch<SetStateAction<string>>;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  schema: v.BaseSchema<any, any, any>;
};

function Input({
  variant,
  label,
  name,
  setIsError,
  setValue,
  schema,
}: InputProps) {
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) {
    const value = e.target.value;
    setValue(value);

    const result = v.safeParse(schema, value);

    if (!result.success) {
      setError(result.issues[0].message);
      setIsError(true);
    } else {
      setError(null);
      setIsError(false);
    }
  }

  return (
    <div className="flex flex-col">
      <label htmlFor={name}>{label}</label>
      {variant === "input" ? (
        <input
          type="text"
          name={name}
          id={name}
          onChange={(e) => handleChange(e)}
          className="rounded-md bg-linear-to-r from-[#F7FBFD] to-[#E3F2F4] shadow-inner"
        />
      ) : (
        <textarea
          name={name}
          id={name}
          onChange={(e) => handleChange(e)}
          className="resize-none rounded-md bg-linear-to-r from-[#F7FBFD] to-[#E3F2F4] shadow-inner"
        ></textarea>
      )}

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

type TagFormProps = {
  setTags: Dispatch<SetStateAction<TagType[]>>;
};

function TagForm({ setTags }: TagFormProps) {
  const [tagName, setTagName] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleChangeTagInput(e: React.ChangeEvent<HTMLInputElement>) {
    setTagName(e.target.value);
    const result = v.safeParse(tagNameSchema, e.target.value);
    if (!result.success) {
      setError(result.issues[0].message);
    } else {
      setError(null);
    }
  }

  function handleAddTag(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (error || !tagName) return;

    setTags((prev) => {
      if (prev.some((tag) => tag.tagName === tagName)) {
        setError("同じタグ名は追加できません");
        return prev;
      }
      const newTag: TagType = {
        tagName: tagName,
        tagId: "",
      };
      return [...prev, newTag];
    });

    setTagName("");
  }

  return (
    <div className="">
      <form onSubmit={(e) => handleAddTag(e)} className="flex space-x-2">
        <input
          type="text"
          value={tagName}
          onChange={(e) => handleChangeTagInput(e)}
          className="resize-none rounded-md bg-linear-to-r from-[#F7FBFD] to-[#E3F2F4] shadow-inner"
        />
        <button type="submit" className="w-full rounded-md bg-green-200">
          追加
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
