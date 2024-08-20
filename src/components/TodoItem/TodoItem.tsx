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
  updateDate: string;
}

const TodoItem: React.FC<ITodoItem> = (item) => {
  const dispatch = useAppDispatch();
  const { sortBy } = useSort();
  const {
    _id,
    title,
    completed,
    updateDate: date,
    priority: itemsPriority,
  } = item;
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [priority, setPriority] = useState<number>(itemsPriority);
  const priorityMap: string[] = ["high", "medium", "low", "none"];
  const updateDate = new Date()
    .toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, "-");
  const data = { id: _id, editTitle, priority, updateDate };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsEditing(false);
    await dispatch(updateTodo(data));
    /*    console.log("data===>>>", data); */
    await dispatch(fetchTodos(sortBy)).unwrap();
    /*  console.log("data", data); */
  };

  const handleChangePriority = (newPriority: number) => {
    setPriority(newPriority);
    /* console.log("newPriority", newPriority); */
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
    setPriority(itemsPriority);
  };
  return (
    <div style={{ marginBottom: "50px", border: "1px solid red" }}>
      <p>date added: {date}</p>
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
