export function ProfileDisplayName({ displayName }: { displayName: string }) {
  return (
    <h2 className="mt-4 font-bold text-base text-black">{displayName || ""}</h2>
  );
}

export function ProfileSelfIntroduction({
  selfIntroduction,
}: {
  selfIntroduction: string;
}) {
  return (
    <div className="h-9 w-full overflow-hidden">
      <p className="text-[#5E5E5E] text-[15px]">{selfIntroduction}</p>
    </div>
  );
}
