import { useAppSelector, useAppDispatch } from "../../hook";
import { Outlet, NavLink } from "react-router-dom";
import { useEffect } from "react";
import { refresh } from "../../store/auth/authOperations";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const refreshToken = localStorage.getItem("refreshToken");
  useEffect(() => {
    if (refreshToken) {
      dispatch(refresh(refreshToken));
    }
  }, [dispatch, refreshToken]);

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to="/react_typescript_todo/">Home</NavLink>
            </li>
            {!isLoggedIn && (
              <>
                <li>
                  <NavLink to="/react_typescript_todo/signup">Sign Up</NavLink>
                </li>
                <li>
                  <NavLink to="/react_typescript_todo/signin">Sign In</NavLink>
                </li>
              </>
            )}
            {isLoggedIn && (
              <li>
                <NavLink to="/react_typescript_todo/todos">Todos</NavLink>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>Footer content</p>
      </footer>
    </div>
  );
};

export default App;
