import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from "@reduxjs/toolkit";
import { ITodo } from "../types/data";

type TodosState = {
    todos: ITodo[];
}

const initialState: TodosState = {
    todos: []
}
const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<string>) {
            state.todos.push({
                id: nanoid(),
                title: action.payload,
                completed: false,
            })
        },
        toggleComplete(state, action: PayloadAction<string>) {
            const toggledTodo = state.todos.find(todo => todo.id === action.payload);
            if (toggledTodo) {
                toggledTodo.completed = !toggledTodo.completed;
            }
        },
        removeTodo(state, action: PayloadAction<string>) {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        }
    }

});

export const { addTodo, toggleComplete, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;