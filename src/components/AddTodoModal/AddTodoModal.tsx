import React from "react";
import { useModal } from "../../context/ModalContext/ModalContext";
import { SortProvider } from "../../context/SortContext/SortContext";
import NewTodoForm from "../NewTodoForm/NewTodoForm";

const AddTodoModal = () => {
  const { isOpen, closeModal } = useModal();

  if (!isOpen) return null;

  return (
    <div>
      <button className="close" onClick={closeModal}>
        &times;
      </button>
      <h2>Add Todo</h2>
      <SortProvider>
        <NewTodoForm />
      </SortProvider>
    </div>
  );
};

export default AddTodoModal;
