import "./menu.css";
import { useId } from "react";
import { HomeButton } from "@/features/menu/components/home-button";
import { ProfileButton } from "@/features/menu/components/profile-button";
import { SettingsButton } from "@/features/menu/components/settings-button";

export function MobileMenu() {
  const gradientId = useId();

  return (
    <>
      <div className="menu">
        <svg
          viewBox="0 0 393 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M393 140H0V0C57.9116 38.1462 124.993 59.9521 196.5 59.9521C268.007 59.9521 335.088 38.1462 393 0V140Z"
            fill={`url(#${gradientId})`}
          />
          <defs>
            <linearGradient
              id={gradientId}
              x1="12"
              y1="-7.50002"
              x2="378.5"
              y2="140"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFEEBE" />
              <stop offset="0.182692" stopColor="#FEE290" />
              <stop offset="0.557692" stopColor="#FACB72" />
              <stop offset="1" stopColor="#FA9E72" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="buttons">
        <ProfileButton></ProfileButton>
        <SettingsButton></SettingsButton>
      </div>

      <HomeButton></HomeButton>
    </>
  );
}
