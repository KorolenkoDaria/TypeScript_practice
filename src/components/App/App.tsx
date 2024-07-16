import { useEffect } from "react";

import { useAppDispatch } from "../../hook";
import { useAppSelector } from "../../hook";
import { fetchTodos } from "../../store/todos/todoOperations";
import { Outlet, NavLink } from "react-router-dom";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const isLogged = useAppSelector((state) => state.auth.isLoggedIn);
  console.log(isLogged);
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to="/react_typescript_todo/">Home</NavLink>
            </li>
            {!isLogged && (
              <>
                <li>
                  <NavLink to="/react_typescript_todo/signup">Sign Up</NavLink>
                </li>
                <li>
                  <NavLink to="/react_typescript_todo/signin">Sign In</NavLink>
                </li>
              </>
            )}
            {isLogged && (
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
