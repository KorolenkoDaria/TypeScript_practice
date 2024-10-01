import TodoList from "../../components/TodoList/TodoList";
import React from "react";
import AddNewTask from "../../components/AddNewTask/AddNewTask";
import { useModal } from "../../context/ModalContext/ModalContext";

import AddTodoModal from "../../components/AddTodoModal/AddTodoModal";
import ButtonsForSorting from "../../components/ButtonsForSorting/ButtonsForSorting";

const Todos: React.FC = () => {
  const { isOpen } = useModal();

  return (
    <>
      {/*   <NewTodoForm /> */}

      <ButtonsForSorting />
      <TodoList />
      {isOpen ? <AddTodoModal /> : <AddNewTask />}
    </>
  );
};
export default Todos;
