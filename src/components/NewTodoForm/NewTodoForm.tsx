import { useState, useEffect, useRef } from "react";
import { useAppDispatch } from "../../hook";
import { addTodo, fetchTodos } from "../../store/todos/todoOperations";
import { useModal } from "../../context/ModalContext/ModalContext";
import { useSort } from "../../context/SortContext/SortContext";

const NewTodoForm: React.FC = () => {
  const { sortBy } = useSort();
  const dispatch = useAppDispatch();
  const [dataTitle, setDataTitle] = useState("");
  const [priority, setPriority] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
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

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    setDataTitle(evt.target.value);
  };

  const handlePriorityChange: React.ChangeEventHandler<HTMLInputElement> = (
    evt
  ) => {
    setPriority(evt.target.value);
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
      <div>
        <div>
          <label htmlFor="high">High!!!</label>
          <input
            name="priority"
            value="0"
            type="radio"
            checked={priority === "0"}
            onChange={handlePriorityChange}
          />
        </div>
        <div>
          <label htmlFor="medium">Medium!!</label>
          <input
            name="priority"
            value="1"
            type="radio"
            checked={priority === "1"}
            onChange={handlePriorityChange}
          />
        </div>
        <div>
          <label htmlFor="low">Low!</label>
          <input
            name="priority"
            value="2"
            type="radio"
            checked={priority === "2"}
            onChange={handlePriorityChange}
          />
        </div>
        <div>
          <label htmlFor="none">None</label>
          <input
            name="priority"
            value="3"
            type="radio"
            checked={priority === "3"}
            onChange={handlePriorityChange}
          />
        </div>
      </div>
    </form>
  );
};

export default NewTodoForm;
