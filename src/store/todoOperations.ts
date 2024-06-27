import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITodo } from "../types/data";
/* import { useAppDispatch } from "../hook"; */


export const fetchTodos = createAsyncThunk<ITodo[], undefined, { rejectValue: string }>(
    'toods/fetchTodos',
    async function (_, { rejectWithValue }) {
        const response = await fetch('https://todos-backend-nestjs.onrender.com/todos');
        if (!response.ok) {
            return rejectWithValue('Server Error!')
        }
        const data = response.json();
        return data;
    }
);

export const addTodo = createAsyncThunk<ITodo, string, { rejectValue: string }>(
    'toods/addTodo',
    async function (text, { rejectWithValue }) {
        console.log("add");
        const todo = {
            title: text,
            userId: 1,
            completed: false
        }
        const response = await fetch('https://todos-backend-nestjs.onrender.com/todos', {
            method: 'POST',
            headers: {
                "Content- Type": 'aplication/json'
            },
            body: JSON.stringify(todo)
        });
        if (!response.ok) {
            return rejectWithValue('Can not add task. Server Error!')
        }
        const data = response.json();
        return data;
    }
);

export const toggleStatus = createAsyncThunk<ITodo, string, { rejectValue: string }>(
    'toods/toggleStatus',
    async function (id, { rejectWithValue }) {

        const response = await fetch(`https://todos-backend-nestjs.onrender.com/todos/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": 'aplication/json'
            },
            /* body: JSON.stringify() */
        });
        if (!response.ok) {
            return rejectWithValue('Can not add task. Server Error!')
        }
        const data = response.json();
        return data;
    }
)