export function ProfileLevel({ level }: { level: number }) {
  return (
    <div className="absolute z-20 mx-14 mb-[-6] flex h-[30px] w-[30px] items-center justify-center rounded-full bg-linear-to-br from-[#EBE0B8] via-[#B7D298] to-[#73C06D] pr-0.5 text-center">
      {level}
    </div>
  );
}
