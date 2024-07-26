import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hook";
import { fetchTodos } from "../../store/todos/todoOperations";
import { useSort } from "../../context/SortContext/SortContext";
import TodoItem from "../TodoItem/TodoItem";
import UserMenu from "../UserMenu/UserMenu";

const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sortBy } = useSort();

  useEffect(() => {
    dispatch(fetchTodos(sortBy));
  }, [dispatch, sortBy]);

  const todos = useAppSelector((state) => state.todos.todos);

  return (
    <div>
      <div style={{ width: "250px", margin: "right" }}>
        <UserMenu />
      </div>
      {todos.map((todo) => (
        <TodoItem key={todo._id} {...todo} />
      ))}
    </div>
  );
};

export default TodoList;
