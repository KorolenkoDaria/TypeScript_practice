import { useState, useEffect, useRef } from "react";
import { useAppDispatch } from "../../hook";
import { addTodo } from "../../store/todoOperations";

const NewTodoForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const [value, setValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    setValue(evt.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
    dispatch(addTodo(value));
    setValue("");
  };

  const handleOnKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    evt
  ) => {
    if (evt.key === "Enter") {
      evt.preventDefault();
      dispatch(addTodo(value));
      setValue("");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="">Change your task</label>
        <input
          type="text"
          name=""
          value={value}
          onChange={handleChange}
          onKeyDown={handleOnKeyDown}
          ref={inputRef}
        />
        <button type="submit">Add Todo</button>
      </div>
    </form>
  );
};

export default NewTodoForm;
