import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITodo } from "../types/data";
/* import { useAppDispatch } from "../hook"; */
const REMOTE_DB = "https://todos-backend-nestjs.onrender.com";
const LOCAL_DB = "http://localhost:5000";

export const fetchTodos = createAsyncThunk<ITodo[], undefined, { rejectValue: string }>(
    'todos/fetchTodos',
    async function (_, { rejectWithValue }) {
        const response = await fetch(`${LOCAL_DB}/todos`);
        if (!response.ok) {
            return rejectWithValue('Server Error!')
        }
        const data = response.json();
        return data;
    }
);

export const addTodo = createAsyncThunk<ITodo, string, { rejectValue: string }>(
    'todos/addTodo',
    async function (text, { rejectWithValue }) {

        const todo = {
            title: text,
            completed: false
        }

        const response = await fetch(`${LOCAL_DB}/todos`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
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
    'todos/toggleStatus',
    async function (id, { rejectWithValue }) {

        const response = await fetch(`${LOCAL_DB}/todos/${id}/toggle`, {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json'
            },
        });
        if (!response.ok) {
            return rejectWithValue('Can not update task. Server Error!')
        }
        const data = response.json();
        return data;
    }
)

export const deleteTodo = createAsyncThunk<ITodo, string, { rejectValue: string }>(
    'todos/deleteTodo',
    async function (id, { rejectWithValue }) {
        const response = await fetch(`${LOCAL_DB}/todos/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json'
            },
        });

        if (!response.ok) {
            return rejectWithValue('Can not delete task. Server Error!')
        }

        const data = response.json();
        return data;
    }
)

export const updateTodo = createAsyncThunk<ITodo, { id: string, title: string }, { rejectValue: string }>(
    'todos/updateTodo',
    async function (updetedData, { rejectWithValue }) {
        const { id, title } = updetedData
        const response = await fetch(`${LOCAL_DB}/todos/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(title)
        });

        if (!response.ok) {
            return rejectWithValue('Can not delete task. Server Error!')
        }

        const data = response.json();
        return data;
    }
) 