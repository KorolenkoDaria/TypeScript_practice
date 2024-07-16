import { useAppSelector } from "../../hook";
import TodoItem from "../TodoItem/TodoItem";

const TodoList = () => {
  const todos = useAppSelector((state) => state.todos.todos);

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo._id} {...todo}></TodoItem>
      ))}
    </div>
  );
};

export default TodoList;
