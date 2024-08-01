import { useAppSelector } from "../../hook";
import { Outlet, NavLink } from "react-router-dom";

const App: React.FC = () => {
  const isLogged = useAppSelector((state) => state.auth.isLoggedIn);
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
