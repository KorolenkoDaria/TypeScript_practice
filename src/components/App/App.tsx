import TodoList from "../TodoList/TodoList";
import NewTodoForm from "../NewTodoForm/NewTodoForm";

const App: React.FC = () => {
  return (
    <div>
      <NewTodoForm />
      <div>
        <TodoList />
      </div>
    </div>
  );
};

export default App;
