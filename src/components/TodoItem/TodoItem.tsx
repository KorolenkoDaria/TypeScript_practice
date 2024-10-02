import { RiEdit2Line } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { FiSave } from "react-icons/fi";
import { ITodo } from "../../types/data";
import { useAppDispatch } from "../../hook";
import { useState } from "react";
import Priority from "../Priority/Priority";
import { useSort } from "../../context/SortContext/SortContext";
import {
  toggleStatus,
  deleteTodo,
  updateTodo,
  fetchTodos,
} from "../../store/todos/todoOperations";
interface ITodoItem extends ITodo {
  _id: string;
  title: string;
  completed: boolean;
  priority: number;
  addDate: string;
  updateDate: string;
}

const TodoItem: React.FC<ITodoItem> = (item) => {
  const dispatch = useAppDispatch();
  const { sortBy } = useSort();
  const {
    _id,
    title,
    completed,
    updateDate,
    priority: itemsPriority,
    addDate,
  } = item;
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [priority, setPriority] = useState<number>(itemsPriority);
  const priorityMap: string[] = ["high", "medium", "low", "none"];

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    await dispatch(updateTodo({ id: _id, editTitle, priority }));
    setIsEditing(false);
    setEditTitle(title);
    /*   await dispatch(fetchTodos(sortBy)).unwrap(); */
  };

  const handleChangePriority = (newPriority: number) => {
    setPriority(newPriority);
  };
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };

  const handleOnKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    evt
  ) => {
    if (evt.key === "Enter") {
      dispatch(updateTodo({ id: _id, editTitle, priority }));
      setEditTitle(title);
      setIsEditing(false);
    }
  };
  const handleCancel = () => {
    setIsEditing(false);
    /*     setPriority(itemsPriority); */
  };
  return (
    <div style={{ marginBottom: "50px", border: "1px solid red" }}>
      <p>added: {addDate}</p>
      <p>updated: {updateDate}</p>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch(toggleStatus(_id))}
      />
      {isEditing ? (
        <input
          style={{ width: "800px", height: "50px" }}
          type="text"
          value={editTitle}
          onChange={handleChangeTitle}
          onKeyDown={handleOnKeyDown}
        />
      ) : (
        <>
          <input
            style={{ width: "800px", height: "50px" }}
            type="text"
            value={title}
            readOnly
            disabled
          />
          <div>
            <p>priority: {priorityMap[priority]}</p>
          </div>
        </>
      )}

      {isEditing ? (
        <div>
          <div>
            <button onClick={handleSave}>
              <FiSave />
            </button>
            <button onClick={handleCancel}>
              <MdCancel />
            </button>
          </div>
          <Priority
            onPriorityChange={handleChangePriority}
            selectedPriority={Number(priority)}
          />
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
