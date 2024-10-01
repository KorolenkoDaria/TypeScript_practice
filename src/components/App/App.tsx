import { useAppSelector, useAppDispatch } from "../../hook";
import { useSort } from "../../context/SortContext/SortContext";
import { Outlet, NavLink } from "react-router-dom";
import { useEffect } from "react";
import { setupAxiosInterceptors } from "../../api/interceptors";
import { fetchTodos } from "../../store/todos/todoOperations";
import { fetchUser } from "../../store/auth/authOperations";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sortBy } = useSort();
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchUser(token)); // Восстановление пользователя
    }
  }, [dispatch]);

  useEffect(() => {
    setupAxiosInterceptors(); // Настройка перехватчиков
    if (isLoggedIn) {
      dispatch(fetchTodos(sortBy)); // Загрузка данных только если пользователь авторизован
    }
  }, [dispatch, sortBy, isLoggedIn]);

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
