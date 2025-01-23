import { useAppSelector } from "../../hook";
import TodoItem from "../TodoItem/TodoItem";
import ButtonsForSorting from "../../components/ButtonsForSorting/ButtonsForSorting";

const TodoList: React.FC = () => {
  const todos = useAppSelector((state) => state.todos.todos);
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
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date();
  const date = today.getDate();
  const year = today.getFullYear();
  const month = monthNames[today.getMonth()];
  const day = dayNames[today.getDay()];
  return (
    <div className="px-4 pt-8">
      <div className="mb-3">
        <h3 className="text-3xl text-blue-500 font-bold">Today</h3>
        <p className="text-slate-500">
          {date} {month} {year}, {day}
        </p>
      </div>
      <ButtonsForSorting />
      <div style={{ width: "250px", margin: "right" }}></div>
      {todos.map((todo) => (
        <TodoItem key={todo._id} {...todo} />
      ))}
    </div>
  );
};

export default TodoList;
