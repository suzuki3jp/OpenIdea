type ContainerItemProps = {
  className?: string | undefined;
  children: React.ReactNode;
  label?: string | null;
};

export function SettingContainer({
  className = undefined,
  label = null,
  children,
}: ContainerItemProps) {
  return (
    <div>
      {label && (
        <header className="border-[#946B54] border-b border-solid bg-[#DADADA40] py-2 pl-25 text-lg">
          {label}
        </header>
      )}

      <div className={`border-[#946B54] border-b border-solid ${className}`}>
        {children}
      </div>
    </div>
  );
}
