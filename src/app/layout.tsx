import { ComponentPropsWithoutRef } from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils/twHelpers";
import AuthContext from "@/components/Layouts/AuthContext";

import { Navigation } from "@/components";
import "@styles/globals.css";

interface MainLayoutProps extends ComponentPropsWithoutRef<"div"> {
  theme?: "default" | "celesteal";
  children: React.ReactNode;
}

const MainLayoutTypes = cva(["bg-onyx-900"], {
  variants: {
    theme: {
      default: "bg-onyx-500 bg-gradient-to-br from-celesteal-700 to-onyx-900",
      celesteal: "bg-celesteal-500",
    },
  },
});

const RootLayout = async ({
  theme = "default",
  className,
  children,
  ...props
}: MainLayoutProps) => {
  return (
    <html lang="en">
      <body className="bg-onyx-800 text-onyx-25 contrast-more:bg-onyx-900 contrast-more:text-onyx-0">
        <div className={cn(MainLayoutTypes({ theme }), className)} {...props}>
          <AuthContext>
            <Navigation />
            {children}
          </AuthContext>
        </div>
        <footer>
          <p>Footer</p>
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
