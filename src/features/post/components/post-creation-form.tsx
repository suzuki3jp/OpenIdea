"use client";

import { type Dispatch, type SetStateAction, useState } from "react";
import * as v from "valibot";
import { createPost } from "../actions/create-post";
import {
  postFreeContentSchema,
  postPaidContentSchema,
  postTitleSchema,
} from "../schemas";

export function PostCreationForm() {
  const [title, setTitle] = useState("");
  const [freeContent, setFreeContent] = useState("");
  const [paidContent, setPaidContent] = useState("");

  const [isSubmmitting, setIsSubmitting] = useState(false);
  const [isTitleError, setIsTitleError] = useState(true);
  const [isFreeContentError, setIsFreeContentError] = useState(true);
  const [isPaidContentError, setIsPaidContentError] = useState(true);

  const isDisabledButton =
    (!title && !freeContent && !paidContent) ||
    isTitleError ||
    isFreeContentError ||
    isPaidContentError ||
    isSubmmitting;

  async function handleAction(formData: FormData): Promise<void> {
    await createPost(formData);
    setIsSubmitting(false);
  }

  return (
    <div className="mx-10 my-10">
      <form
        action={handleAction}
        onSubmit={() => setIsSubmitting(true)}
        className="flex flex-col items-center space-y-4"
      >
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
        </div>
        <button
          type="submit"
          disabled={isDisabledButton}
          className="w-1/2 max-w-sm rounded-full bg-linear-to-r from-[#FFF7A0] to-[#FFAFAB] py-2 shadow-xl hover:cursor-pointer disabled:cursor-not-allowed"
        >
          投稿する
        </button>
      </form>
    </div>
  );
}

type Props = {
  variant: "input" | "textarea";
  label: string;
  name: string;
  setValue: Dispatch<SetStateAction<string>>;
  setIsError: Dispatch<SetStateAction<boolean>>;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  schema: v.BaseSchema<any, any, any>;
};

function Input({ variant, label, name, setValue, setIsError, schema }: Props) {
  const [error, setError] = useState("");

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
      setError("");
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
          className="rounded-md bg-linear-to-r from-[#F7FBFD] to-[#E3F2F4] shadow-inner"
        ></textarea>
      )}

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
