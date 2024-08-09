import { createAsyncThunk } from "@reduxjs/toolkit";

import { IUser } from "../../types/data";

/* const REMOTE_DB = "https://todos-backend-nestjs.onrender.com"; */
const LOCAL_DB = "http://localhost:5000";

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
        const response = await fetch(`${LOCAL_DB}/auth/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(userData)
        });
        if (!response.ok) {
            return rejectWithValue('Server Error!')
        }
        const data = await response.json();
        return data;
    }
);

export const signIn = createAsyncThunk<IUser, UserData, { rejectValue: string }>(
    'auth/signIn',
    async function (userData, { rejectWithValue }) {
        const response = await fetch(`${LOCAL_DB}/auth/signin`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(userData)
        });
        if (!response.ok) {
            return rejectWithValue('Server Error!')
        }
        const data = await response.json();
        return data;
    }
);

export const logOut = createAsyncThunk<IUser, UserEmail, { rejectValue: string }>(
    'auth/logOut',
    async function (email, { rejectWithValue }) {
        const response = await fetch(`${LOCAL_DB}/auth/logout`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(email)
        });
        if (!response.ok) {
            return rejectWithValue('Server Error!')
        }
        const data = await response.json();
        return data;
    }
);

export const refresh = createAsyncThunk<IUser, string, { rejectValue: string }>(
    'auth/refreshToken',
    async function (refreshToken, { rejectWithValue }) {
        console.log("refreshToken", refreshToken);
        const response = await fetch(`${LOCAL_DB}/auth/refresh-token`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({ refreshToken: refreshToken })
        });
        if (!response.ok) {
            return rejectWithValue('Server Error!')
        }
        const data = await response.json();
        return data;
    }

)