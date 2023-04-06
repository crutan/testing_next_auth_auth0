import { ComponentPropsWithoutRef } from "react";

interface AdminLayoutProps extends ComponentPropsWithoutRef<"div"> {
  theme?: "default" | "celesteal";
  children: React.ReactNode;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <h1>Admin</h1>
      {children}
    </section>
  );
}
