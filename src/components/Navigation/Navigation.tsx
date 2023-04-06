import { Link } from "ui/Link";

import { Login } from "./components/Login";

const nav = [{ name: "Home", path: "/" }];

const Navigation = () => {
  return (
    <nav className="flex w-full justify-end p-5">
      {/* <Heading size="h1">
        <span className="sr-only">HoneyComb</span>
        HoneyComb
      </Heading> */}
      <ul className="flex gap-3">
        {nav &&
          nav.map((item) => (
            <li className="text-celesteal-400" key={item.name}>
              <Link className="text-celesteal-400" href={item.path}>
                {item.name}
              </Link>
            </li>
          ))}
        <Login />
      </ul>
    </nav>
  );
};

export default Navigation;
