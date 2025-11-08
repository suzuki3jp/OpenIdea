type Props = {
  children: React.ReactNode;
};

export function SettingBackground({ children }: Props) {
  return (
    <div className="min-h-[calc(100vh-2rem)] bg-[#FFFEEE] pb-36">
      {children}
    </div>
  );
}
