import React from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../hook";
import UserMenu from "./UserMenu/UserMenu";

const Header: React.FC = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  return (
    <header className="text-sm  px-4 ">
      <nav className="border-b border-teal-500">
        <ul className="flex gap-8 py-6">
          <li>
            <NavLink
              to="/react_typescript_todo/"
              className=" cursor-pointer text-slate-500 hover:text-blue-500"
            >
              Home
            </NavLink>
          </li>
          {!isLoggedIn && (
            <>
              <li>
                <NavLink
                  to="/react_typescript_todo/signup"
                  className=" cursor-pointer text-slate-500 hover:text-blue-500"
                >
                  Sign Up
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/react_typescript_todo/signin"
                  className=" cursor-pointer text-slate-500 hover:text-blue-500"
                >
                  Sign In
                </NavLink>
              </li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li>
                <NavLink
                  to="/react_typescript_todo/todos"
                  className=" cursor-pointer text-slate-500 hover:text-blue-500"
                >
                  Todos
                </NavLink>
              </li>
              <li className="ml-auto">
                <UserMenu />
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
