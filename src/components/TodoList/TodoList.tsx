import { useAppSelector } from "../../hook";
import TodoItem from "../TodoItem/TodoItem";
import UserMenu from "../UserMenu/UserMenu";

const TodoList: React.FC = () => {
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
