import { ITodo } from "../../types/data";
import { useAppDispatch } from "../../hook";
import { toggleComplete, removeTodo } from "../../store/todoSlice";

interface ITodoItem extends ITodo {
  id: string;
  title: string;
  completed: boolean;
}

const TodoItem: React.FC<ITodoItem> = (item) => {
  const dispatch = useAppDispatch();
  const { id, title, completed } = item;

  return (
    <div>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch(toggleComplete(id))}
      />
      <p>{title}</p>
      <button onClick={() => dispatch(removeTodo(id))}>X</button>
    </div>
  );
};

export default TodoItem;
