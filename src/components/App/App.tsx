import { useAppSelector, useAppDispatch } from "../../hook";
import { useSort } from "../../context/SortContext/SortContext";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { setupAxiosInterceptors } from "../../api/interceptors";
import { fetchTodos } from "../../store/todos/todoOperations";
import { fetchUser } from "../../store/auth/authOperations";
import Header from "../Header";

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
    <div className="w-2/3 mx-auto">
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>{/*    <p>Footer content</p> */}</footer>
    </div>
  );
};

export default App;
