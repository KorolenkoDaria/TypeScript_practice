import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITodo } from "../../types/data";
import axios from 'axios';
import { api } from "../../api/interceptors";

/* const REMOTE_DB = "https://todos-backend-nestjs.onrender.com"; */
axios.defaults.baseURL = "http://localhost:5000";

interface TodoData {
    title: string;
    priority: number;
}

export const fetchTodos = createAsyncThunk<ITodo[], string, { rejectValue: string }>(
    'todos/fetchTodos',
    async function (criteria, { rejectWithValue }) {
        try {
            const { data } = await api.get(`/todos`, {
                params: { criteria },
                headers: {
                    "Content-Type": 'application/json'
                }
            });
            return data;
        } catch (error) {
            return rejectWithValue('Server Error!')
        }
    });

export const addTodo = createAsyncThunk<ITodo, TodoData, { rejectValue: string }>(
    'todos/addTodo',
    async function (todoData, { rejectWithValue }) {
        const addDate = new Date().toISOString()
        const updateDate = new Date().toISOString()
        const todo = {
            ...todoData,
            completed: false,
            addDate,
            updateDate
        }
        try {
            const { data } = await api.post('/todos', todo, {
                headers: {
                    "Content-Type": 'application/json',
                },
            });
            return data;
        } catch (error) {
            return rejectWithValue('Server Error!')
        }
    }
);

export const toggleStatus = createAsyncThunk<ITodo, string, { rejectValue: string }>(
    'todos/toggleStatus',
    async function (id, { rejectWithValue }) {

        try {
            const { data } = await api.patch(`/todos/${id}/toggle`, {
                headers: {
                    "Content-Type": 'application/json',
                },
            });
            return data;
        } catch (error) {
            return rejectWithValue('Can not update task. Server Error!')
        }
    }
)

export const deleteTodo = createAsyncThunk<ITodo, string, { rejectValue: string }>(
    'todos/deleteTodo',
    async function (id, { rejectWithValue }) {
        try {
            const { data } = await api.delete(`/todos/${id}`, {
                headers: {
                    "Content-Type": 'application/json',
                },
            });
            return data;
        } catch (error) {
            return rejectWithValue('Can not delete task. Server Error!')
        }
    }
);

export const updateTodo = createAsyncThunk<ITodo, { id: string, editTitle: string, priority: number }, { rejectValue: string }>(
    'todos/updateTodo',
    async function (updatedData, { rejectWithValue }) {
        try {
            const updateDate = new Date().toISOString()
            const { id, editTitle, priority } = updatedData
            const { data } = await api.patch(`/todos/${id}`, { editTitle, priority, updateDate }, {
                headers: {
                    "Content-Type": 'application/json',
                }
            });
            return data;
        } catch (error) {
            return rejectWithValue('Can not update task. Server Error!')
        }
    }
)


