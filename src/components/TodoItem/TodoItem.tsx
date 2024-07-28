import { RiEdit2Line } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { FiSave } from "react-icons/fi";
import { ITodo } from "../../types/data";
import { useAppDispatch } from "../../hook";
import { useState } from "react";
import {
  toggleStatus,
  deleteTodo,
  updateTodo,
} from "../../store/todos/todoOperations";
interface ITodoItem extends ITodo {
  _id: string;
  title: string;
  completed: boolean;
  priority: string;
  updateDate: string;
}

const TodoItem: React.FC<ITodoItem> = (item) => {
  const dispatch = useAppDispatch();
  const { _id, title, completed, priority, updateDate } = item;
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const data = { id: _id, editTitle, priority };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);

    dispatch(updateTodo(data));
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };

  const handleOnKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    evt
  ) => {
    if (evt.key === "Enter") {
      setIsEditing(false);
      dispatch(updateTodo(data));
    }
  };
  const handleCancel = () => {
    setIsEditing(false);
  };
  return (
    <div>
      <p>date added: {updateDate}</p>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch(toggleStatus(_id))}
      />
      {isEditing ? (
        <input
          type="text"
          value={editTitle}
          onChange={handleChangeTitle}
          onKeyDown={handleOnKeyDown}
        />
      ) : (
        <>
          <input type="text" value={title} readOnly disabled />
          <div>
            <p>priority: {priority}</p>
          </div>
        </>
      )}

      {isEditing ? (
        <div>
          <button onClick={handleSave}>
            <FiSave />
          </button>
          <button onClick={handleCancel}>
            <MdCancel />
          </button>
        </div>
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
