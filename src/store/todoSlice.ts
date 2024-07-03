import { createSlice/* , PayloadAction  */ } from '@reduxjs/toolkit';
import { ITodo } from "../types/data";
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
            .addCase(addTodo.fulfilled, (state, action) => {
                state.todos.push(action.payload);
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
            .addCase(updateTodo.fulfilled, (state, action) => {
                const index = state.todos.findIndex((todo) => todo._id === action.payload._id);
                if (index !== -1) {
                    state.todos[index] = action.payload;
                }
            })
    },
    reducers: {
    }

});

export const todosReducer = todoSlice.reducer; 
