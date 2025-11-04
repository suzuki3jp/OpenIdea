interface ProfileBodyTypeSelectorProps {
  isMyProfile: boolean;
}

export function ProfileBodyTypeSelector({
  isMyProfile,
}: ProfileBodyTypeSelectorProps) {
  return isMyProfile ? (
    <MyProfileBodyTypeSelector />
  ) : (
    <OtherProfileBodyTypeSelector />
  );
}

function MyProfileBodyTypeSelector() {
  return (
    <div className="mx-auto mt-4 w-[329px] cursor-pointer rounded-full border border-none bg-[#F6F4E0] px-3 py-1 text-[#676767]">
      My Profile Body Type Selector
    </div>
  );
}

function OtherProfileBodyTypeSelector() {
  return (
    <div className="mx-auto mt-4 w-[329px] cursor-pointer rounded-full border-none bg-[#F6F4E0] text-[#676767]">
      Other User's Profile Body Type Selector
    </div>
  );
}
