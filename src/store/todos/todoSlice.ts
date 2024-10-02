import { createSlice/* , PayloadAction  */ } from '@reduxjs/toolkit';
import { ITodo } from "../../types/data";
import { fetchTodos, addTodo, toggleStatus, deleteTodo, updateTodo } from './todoOperations';


type TodosState = {
    todos: ITodo[];
    loading: boolean;
    error: string | null;
}

const initialState: TodosState = {
    todos: [],
    loading: false,
    error: null
}
const todoSlice = createSlice({
    name: "todos",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.todos = action.payload;
                state.loading = false;
            })
            .addCase(addTodo.pending, (state) => {
                state.error = null;
            })
            .addCase(addTodo.fulfilled, (state, { payload }) => {
                /* payload.priority = priorities[Number(payload.priority)]
                state.todos.push(payload); */
                /*       state.todos.sort(function (a, b) {
                          if (a.priority > b.priority) {
                              return 1;
                          }
                          if (a.priority < b.priority) {
                              return -1;
                          }
                          return 0;
                      }); */
            })
            .addCase(toggleStatus.fulfilled, (state, action) => {
                const index = state.todos.findIndex(todo => todo._id === action.payload._id);
                if (index !== -1) {
                    state.todos[index] = action.payload;
                }
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.todos = state.todos.filter((todo) => todo._id !== action.payload._id)
            })
            .addCase(updateTodo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTodo.fulfilled, (state, { payload }) => {
                state.loading = false;
                const index = state.todos.findIndex((todo) => todo._id === payload._id);
                if (index !== -1) {
                    state.todos[index].title = payload.title;
                    state.todos[index].priority = payload.priority;
                    state.todos[index].updateDate = payload.updateDate;
                }
            })
    },
    reducers: {
    }

});

export const todosReducer = todoSlice.reducer; 
