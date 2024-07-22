import TodoList from "../../components/TodoList/TodoList";
/* import NewTodoForm from "../../components/NewTodoForm/NewTodoForm"; */
import AddNewTask from "../../components/AddNewTask/AddNewTask";
import { useModal } from "../../context/ModalContext/ModalContext";
import AddTodoModal from "../../components/AddTodoModal/AddTodoModal";

const Todos: React.FC = () => {
  const { isOpen } = useModal();
  return (
    <>
      {/*   <NewTodoForm /> */}
      <TodoList />
      {isOpen ? <AddTodoModal /> : <AddNewTask />}
    </>
  );
};
export default Todos;
