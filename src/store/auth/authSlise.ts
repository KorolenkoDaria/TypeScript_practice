import { createSlice } from '@reduxjs/toolkit';
import { signUp, signIn, logOut } from "./authOperations";
import type { RootState } from "../index";

export const selectIsLoggedIn = (state: RootState): boolean => state.auth.isLoggedIn;

export type AuthState = {
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
            .addCase(signUp.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.token = payload.token;
                state.user.email = payload.email;
                state.isLoggedIn = true;
                localStorage.setItem('token', payload.token)
            })
            .addCase(signIn.pending, (state) => {
                state.loading = true
            })
            .addCase(signIn.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.token = payload.token;
                state.user.email = payload.email;
                state.isLoggedIn = true;
                localStorage.setItem('token', payload.token)
            })
            .addCase(logOut.pending, (state) => {
                state.loading = true
            })
            .addCase(logOut.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.token = null;
                state.isLoggedIn = false;
                localStorage.setItem('token', payload.token)
            })
    },
    reducers: {

    }
})

export const authReducer = authSlise.reducer; 
