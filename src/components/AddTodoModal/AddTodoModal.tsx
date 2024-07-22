import React from "react";
import { useModal } from "../../context/ModalContext/ModalContext";
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
      <NewTodoForm />
    </div>
  );
};

export default AddTodoModal;
