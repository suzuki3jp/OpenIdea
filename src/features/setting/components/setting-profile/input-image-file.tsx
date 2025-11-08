"use client";

import type { Dispatch, SetStateAction } from "react";

type InputImageFileProps = {
  htmlFor: string;
  setFile: Dispatch<SetStateAction<File | null>>;
  setPreviewUrl: Dispatch<SetStateAction<string>>;
};

export function InputImageFile({
  htmlFor,
  setFile,
  setPreviewUrl,
}: InputImageFileProps) {
  function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>,
    setPreviewUrl: Dispatch<SetStateAction<string>>,
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    // 直前の preview を revoke
    setPreviewUrl((prev) => {
      if (prev) {
        URL.revokeObjectURL(prev);
      }
      const url = URL.createObjectURL(file);
      return url;
    });

    setFile(file);
  }

  return (
    <input
      id={htmlFor}
      type="file"
      accept="image/*"
      onChange={(e) => handleFileChange(e, setPreviewUrl)}
      className="hidden"
    />
  );
}
