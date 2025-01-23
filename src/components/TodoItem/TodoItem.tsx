import { RiEdit2Line } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { FiSave } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
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
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

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

  const getDate = new Date(updateDate);
  const year = getDate.getFullYear();
  const day = getDate.getDate();
  const month = monthNames[getDate.getMonth()];

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
    <div className="rounded-3xl shadow-[0_4px_10px_rgba(0,0,0,0.25)] mb-6 py-6 px-8 flex flex-col gap-5">
      <div className="flex justify-between">
        <p className="text-xs text-slate-500">
          <span className="text-sm text-teal-500">
            {day} {month} {year}
          </span>
        </p>
        <div className="flex gap-6">
          <button className="w-5 h-5 ml-auto" onClick={handleEdit}>
            <RiEdit2Line className="text-blue-500 w-6 h-6 hover:text-blue-700" />
          </button>
          <button onClick={() => dispatch(deleteTodo(_id))}>
            <MdDeleteForever className="text-rose-500 w-6 h-6 hover:text-rose-700" />
          </button>
        </div>
      </div>

      {isEditing ? (
        <div>
          <input
            style={{ width: "800px", height: "50px" }}
            type="text"
            value={editTitle}
            onChange={handleChangeTitle}
            onKeyDown={handleOnKeyDown}
          />
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
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <div className="flex gap-10 items-center">
            <div
              className={` w-3 h-3 rounded-full ${
                priorityMap[priority] === "high"
                  ? "bg-rose-400"
                  : priorityMap[priority] === "medium"
                  ? "bg-teal-400"
                  : priorityMap[priority] === "low"
                  ? "bg-blue-400"
                  : "bg-slate-400"
              }`}
            ></div>
            <div className="w-5 relative">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={completed}
                  onChange={() => dispatch(toggleStatus(_id))}
                  className="hidden peer"
                />
                <span
                  className="w-6 h-6  top-0 border border-slate-400 rounded-md flex-shrink-0 cursor-pointer
                 peer-checked:border-none"
                ></span>
              </label>
            </div>
          </div>
          <div className="w-full bg-white text-slate-600">
            <p>{title}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
