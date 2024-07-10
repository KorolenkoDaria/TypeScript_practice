import { createSlice } from '@reduxjs/toolkit';
import { signUp } from "./authOperations";

type AuthState = {
    user: {
        name: string | null,
        email: string | null,
    },
    avatarURL: string | null,
    token: string | null,
    isRefreshing: boolean,
    isLoggedIn: boolean,
    loading: boolean,
    error: string | null,
};


const initialState: AuthState = {
    user: {
        name: null,
        email: null,
    },
    loading: false,
    error: null,
    token: null,
    isRefreshing: false,
    isLoggedIn: false,
    avatarURL: null,
}

const authSlise = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state) => {
                state.loading = true
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.loading = false
            })
    },
    reducers: {

    }
})

export const authReducer = authSlise.reducer; 
