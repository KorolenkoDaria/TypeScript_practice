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
}

const TodoItem: React.FC<ITodoItem> = (item) => {
  const dispatch = useAppDispatch();
  const { _id, title, completed } = item;
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    const data = { id: _id, editTitle };
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
      const data = { id: _id, editTitle };
      dispatch(updateTodo(data));
    }
  };
  const handleCancel = () => {
    setIsEditing(false);
  };
  return (
    <div>
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
        <input type="text" value={title} readOnly disabled />
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
