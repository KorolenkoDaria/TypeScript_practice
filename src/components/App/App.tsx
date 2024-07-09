import { useEffect } from "react";
import { useAppDispatch } from "../../hook";
import { fetchTodos } from "../../store/todos/todoOperations";
import TodoList from "../TodoList/TodoList";
import NewTodoForm from "../NewTodoForm/NewTodoForm";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div>
      <NewTodoForm />
      <div>
        <TodoList />
      </div>
    </div>
  );
};

export default App;
