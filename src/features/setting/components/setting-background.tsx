type Props = {
  children: React.ReactNode;
};

export function SettingBackground({ children }: Props) {
  return <div className="min-h-screen bg-[#FFFEEE]">{children}</div>;
}
