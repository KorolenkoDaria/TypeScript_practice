import TodoList from "../../components/TodoList/TodoList";
import React from "react";
import AddNewTask from "../../components/AddNewTask/AddNewTask";
import { useModal } from "../../context/ModalContext/ModalContext";
import { SortProvider } from "../../context/SortContext/SortContext";
import AddTodoModal from "../../components/AddTodoModal/AddTodoModal";
import ButtonsForSorting from "../../components/ButtonsForSorting/ButtonsForSorting";

const Todos: React.FC = () => {
  const { isOpen } = useModal();

  return (
    <>
      {/*   <NewTodoForm /> */}
      <SortProvider>
        <ButtonsForSorting />
        <TodoList />
        {isOpen ? <AddTodoModal /> : <AddNewTask />}
      </SortProvider>
    </>
  );
};
export default Todos;
