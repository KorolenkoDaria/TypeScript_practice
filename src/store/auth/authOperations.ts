import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { IUser } from "../../types/data";

/* const REMOTE_DB = "https://todos-backend-nestjs.onrender.com"; */
/* const LOCAL_DB = "http://localhost:5000"; */
axios.defaults.baseURL = "http://localhost:5000";
interface UserData {
    email: string;
    password: string;
}
interface UserEmail {
    email: string;
}

export const signUp = createAsyncThunk<IUser, UserData, { rejectValue: string }>(
    'auth/signUp',
    async function (userData, { rejectWithValue }) {
        try {
            const { data } = await axios.post(`auth/signup`, userData, {
                headers: {
                    "Content-Type": 'application/json'
                }
            });
            return data;
        } catch (error) {
            return rejectWithValue('Server Error!')
        }
    }
);

export const signIn = createAsyncThunk<IUser, UserData, { rejectValue: string }>(
    'auth/signIn',
    async function (userData, { rejectWithValue }) {
        try {
            const { data } = await axios.post(`auth/signin`, userData, {
                headers: {
                    "Content-Type": 'application/json'
                }
            });
            return data;
        } catch (error) {
            return rejectWithValue('Server Error!')
        }
    }
);

export const logOut = createAsyncThunk<IUser, UserEmail, { rejectValue: string }>(
    'auth/logOut',
    async function (email, { rejectWithValue }) {
        try {
            const { data } = await axios.post(`auth/logout`, email, {
                headers: {
                    "Content-Type": 'application/json'
                }
            });
            return data;
        } catch (error) {
            return rejectWithValue('Server Error!')
        }
    }
);

export const refresh = createAsyncThunk<IUser, string, { rejectValue: string }>(
    'auth/refreshToken',
    async function (refreshToken, { rejectWithValue }) {
        console.log(refreshToken);

        try {
            const { data } = await axios.post(`auth/refresh-token`, { refreshToken }, {
                headers: {
                    "Content-Type": 'application/json'
                }
            });
            return data;
        } catch (error) {
            return rejectWithValue('Server Error!')
        }
    }
);