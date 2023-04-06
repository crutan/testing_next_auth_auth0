import { UIBasePropsWithRef } from "ui/shared.types";

type LinkProps = Omit<UIBasePropsWithRef<"a">, "as">;

const Link = ({ children, ...props }: LinkProps) => {
  return <a {...props}>{children}</a>;
};

export default Link;
