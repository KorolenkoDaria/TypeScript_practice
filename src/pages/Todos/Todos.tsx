import TodoList from "../../components/TodoList/TodoList";
import NewTodoForm from "../../components/NewTodoForm/NewTodoForm";

const Todos: React.FC = () => {
  return (
    <>
      <NewTodoForm />
      <TodoList />
    </>
  );
};
export default Todos;
