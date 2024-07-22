import React from "react";
import { useAppDispatch, useAppSelector } from "../../hook";
import { logOut } from "../../store/auth/authOperations";

const UserMenu: React.FC = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((store) => store.auth.user);

  const handleLogout = () => {
    if (user.email) {
      dispatch(logOut({ email: user.email }));
    } else {
      console.error("Email is null");
    }
  };

  return (
    <div>
      <p>{user.email}</p>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
