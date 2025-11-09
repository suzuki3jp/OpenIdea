import { MobileMenu } from "@/features/menu/components/mobile";

export default function ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <MobileMenu />
    </>
  );
}
