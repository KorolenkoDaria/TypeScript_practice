import { createAsyncThunk } from "@reduxjs/toolkit";

import { IUser } from "../../types/data";

/* const REMOTE_DB = "https://todos-backend-nestjs.onrender.com"; */
const LOCAL_DB = "http://localhost:5000";

export const signUp = createAsyncThunk<IUser, undefined, { rejectValue: string }>(
    'auth/signUp',
    async function (userData, { rejectWithValue }) {
        const response = await fetch(`${LOCAL_DB}/users`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(userData)
        });
        if (!response.ok) {
            return rejectWithValue('Server Error!')
        }
        const data = response.json();
        return data;
    }
);