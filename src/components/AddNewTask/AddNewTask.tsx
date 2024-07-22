import React from "react";
import { IoMdAddCircle } from "react-icons/io";
import { useModal } from "../../context";

const AddNewTask: React.FC = () => {
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <div>
      <IoMdAddCircle />
      <button onClick={openModal}>Add new task</button>
    </div>
  );
};

export default AddNewTask;
