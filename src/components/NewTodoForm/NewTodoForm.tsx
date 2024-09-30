import { useState, useEffect, useRef } from "react";
import { useAppDispatch } from "../../hook";
import { addTodo, fetchTodos } from "../../store/todos/todoOperations";
import { useModal } from "../../context/ModalContext/ModalContext";
import { useSort } from "../../context/SortContext/SortContext";
import Priority from "../Priority/Priority";

const NewTodoForm: React.FC = () => {
  const { sortBy } = useSort();
  const dispatch = useAppDispatch();
  const [dataTitle, setDataTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [priority, setPriority] = useState(1);
  const { closeModal } = useModal();
  const data = {
    title: dataTitle,
    priority,
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  const handlePriorityChange = (newPriority: number) => {
    setPriority(newPriority);
  };
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    setDataTitle(evt.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (evt) => {
    evt.preventDefault();
    try {
      await dispatch(addTodo(data));
      await dispatch(fetchTodos(sortBy)).unwrap();

      setDataTitle("");
      closeModal();
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  const handleOnKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    evt
  ) => {
    if (evt.key === "Enter") {
      evt.preventDefault();
      dispatch(addTodo(data));
      dispatch(fetchTodos(sortBy));
      setDataTitle("");
      closeModal();
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor=""></label>
        <input
          type="text"
          name=""
          value={dataTitle}
          onChange={handleChange}
          onKeyDown={handleOnKeyDown}
          ref={inputRef}
        />
        <button type="submit">Add Todo</button>
      </div>
      <Priority onPriorityChange={handlePriorityChange} />
    </form>
  );
};

export default NewTodoForm;
