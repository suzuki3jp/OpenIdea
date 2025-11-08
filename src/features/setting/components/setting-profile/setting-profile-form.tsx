"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { User } from "@/features/auth/convert-db-user-to-user";
import { SettingContainer } from "../setting-container";
import defaultImage from "./default-image.jpg";
import { InputImageFile } from "./input-image-file";

type SettingProfileType = {
  currentUser: User;
};

export function SettingProfileForm({ currentUser }: SettingProfileType) {
  const [banner, setBanner] = useState<File | null>(null);
  const [previewBannerUrl, setPreviewBannerUrl] = useState(
    currentUser.bannerPath ?? defaultImage.src,
  );

  const [icon, setIcon] = useState<File | null>(null);
  const [previewIconUrl, setPreviewIconUrl] = useState(
    currentUser.iconPath ?? defaultImage.src,
  );

  const [userName, setUserName] = useState("");

  async function handleClick() {
    // ToDo バケットに画像入れたい（RLSどうしても無理で一旦諦め）
  }

  // メモリリーク防止
  useEffect(() => {
    return () => {
      if (previewIconUrl) {
        URL.revokeObjectURL(previewIconUrl);
      }
      if (previewBannerUrl) {
        URL.revokeObjectURL(previewBannerUrl);
      }
    };
  }, [previewIconUrl, previewBannerUrl]);

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <form className="w-full">
        <SettingContainer label="ヘッダー" className="flex justify-center py-4">
          <label htmlFor="banner">
            <Image
              src={previewBannerUrl}
              height={100}
              width={100}
              className="h-28 w-56 rounded-md border border-solid object-cover"
              alt="banner preview"
            />
          </label>
          <InputImageFile
            setFile={setBanner}
            htmlFor="banner"
            setPreviewUrl={setPreviewBannerUrl}
          />
        </SettingContainer>

        <SettingContainer label="アイコン" className="flex justify-center py-4">
          <label htmlFor="icon">
            <Image
              src={previewIconUrl}
              height={100}
              width={100}
              className="h-22 w-22 rounded-full border border-solid object-cover"
              alt="icon preview"
            />
            <InputImageFile
              setFile={setIcon}
              htmlFor="icon"
              setPreviewUrl={setPreviewIconUrl}
            />
          </label>
        </SettingContainer>

        <SettingContainer
          label="ユーザーネーム"
          className="flex justify-center py-4"
        >
          <input
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            className="text-center text-xl"
          />
        </SettingContainer>

        <SettingContainer
          label="現在のレベル"
          className="flex justify-center py-4"
        >
          <div className="flex items-center space-x-12">
            <p className="text-xl">レベル{currentUser.level}</p>
            <p className="text-sm">次のレベルまで</p>
          </div>
        </SettingContainer>
      </form>

      <button
        type="button"
        onClick={handleClick}
        className="rounded-full bg-linear-to-r from-[#FFFFFF] to-[#B1E0F3] px-14 py-4 shadow-xl"
      >
        保存する
      </button>
    </div>
  );
}
