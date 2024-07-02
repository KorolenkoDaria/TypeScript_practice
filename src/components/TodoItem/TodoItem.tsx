import { RiEdit2Line } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { FiSave } from "react-icons/fi";
import { ITodo } from "../../types/data";
import { useAppDispatch } from "../../hook";
import { useState } from "react";
import { toggleStatus, deleteTodo } from "../../store/todoOperations";
interface ITodoItem extends ITodo {
  _id: string;
  title: string;
  completed: boolean;
}

const TodoItem: React.FC<ITodoItem> = (item) => {
  const dispatch = useAppDispatch();
  const { _id, title, completed } = item;
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };
  return (
    <div>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch(toggleStatus(_id))}
      />
      {isEditing ? (
        <input type="text" defaultValue={title} />
      ) : (
        <input type="text" defaultValue={title} readOnly disabled />
      )}

      {isEditing ? (
        <button>
          <FiSave />
        </button>
      ) : (
        <button onClick={handleEdit}>
          <RiEdit2Line />
        </button>
      )}

      <button onClick={() => dispatch(deleteTodo(_id))}>X</button>
    </div>
  );
};

export default TodoItem;
