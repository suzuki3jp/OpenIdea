"use client";

import Image from "next/image";
import { signInWithGoogle } from "@/lib/supabase/auth-google";
import Logo from "./logo.png";

export default function () {
  const handleGoogleLogin = async () => {
    await signInWithGoogle();
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#FFFEFC]">
      <div className="mx-auto h-[78.06px] w-[284.69px]">
        <Image src={Logo} alt="Logo" w-full h-full />
      </div>
      <div className="mx-auto mt-[36.94px] h-[123px] w-[289px] rounded-[20px] bg-gradient-to-r from-[#FFFFFF] to-[#FFFEE4] shadow-[2px_4px_4px_rgba(0,0,0,0.25)]">
        <button
          type="submit"
          onClick={handleGoogleLogin}
          className="fontsize-[16px] mx-[46px] my-[42px] h-10 w-[197px] rounded-[50px] bg-gradient-to-r from-[#FFECB5] to-[#FA9F73] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
        >
          Googleでログイン
        </button>
      </div>
    </div>
  );
}
