"use client";

import { type Dispatch, type SetStateAction, useState } from "react";
import * as v from "valibot";
import { tagNameSchema } from "../schemas";
import type { TagType } from "../types";

type TagFormProps = {
  maxTag?: number;
  setTags: Dispatch<SetStateAction<TagType[]>>;
};

export function TagForm({ maxTag = 5, setTags }: TagFormProps) {
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
      if (maxTag && maxTag <= prev.length) {
        setError("タグの上限に達しています");
        return prev;
      }

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
    <div>
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
