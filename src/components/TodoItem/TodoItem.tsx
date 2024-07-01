import { ITodo } from "../../types/data";
import { useAppDispatch } from "../../hook";
/* import { toggleComplete, removeTodo } from "../../store/todoSlice"; */
import { toggleStatus, deleteTodo } from "../../store/todoOperations";
interface ITodoItem extends ITodo {
  _id: string;
  title: string;
  completed: boolean;
}

const TodoItem: React.FC<ITodoItem> = (item) => {
  const dispatch = useAppDispatch();
  const { _id, title, completed } = item;
  return (
    <div>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch(toggleStatus(_id))}
      />
      <p>{title}</p>
      <button onClick={() => dispatch(deleteTodo(_id))}>X</button>
    </div>
  );
};

export default TodoItem;
