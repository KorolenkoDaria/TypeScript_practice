import React from "react";
import { useAppDispatch, useAppSelector } from "../../hook";
import { logOut } from "../../store/auth/authOperations";

const UserMenu: React.FC = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((store) => store.auth.user);

  const handleLogout = () => {
    console.log(123);
    if (user.email) {
      dispatch(logOut({ email: user.email }));
    } else {
      console.error("Email is null");
    }
  };

  return (
    <div className="flex gap-8  ">
      <p className="text-rose-500">{user.email}</p>
      <button
        className="cursor-pointer text-slate-500 hover:text-blue-500"
        type="button"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
