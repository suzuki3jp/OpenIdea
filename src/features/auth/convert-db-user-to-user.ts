export interface User {
  id: string;
  displayName: string | null;
  iconPath: string | null;
  bannerPath: string | null;
  level: number;
  selfIntroduction: string | null;
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function convertDBUserToUser(dbUser: any): User {
  return {
    id: dbUser.user_id,
    displayName: dbUser.display_name ?? null,
    iconPath: dbUser.icon_path ?? null,
    bannerPath: dbUser.banner_path ?? null,
    level: dbUser.level,
    selfIntroduction: dbUser.self_introduction ?? null,
  };
}
