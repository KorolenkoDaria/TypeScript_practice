import TodoItem from "../TodoItem/TodoItem";
import UserMenu from "../UserMenu/UserMenu";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hook";
import { fetchTodos } from "../../store/todos/todoOperations";

const TodoList = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const todos = useAppSelector((state) => state.todos.todos);

  return (
    <div>
      <div style={{ width: "250px", margin: "right" }}>
        <UserMenu />
      </div>
      {todos.map((todo) => (
        <TodoItem key={todo._id} {...todo}></TodoItem>
      ))}
    </div>
  );
};

export default TodoList;
