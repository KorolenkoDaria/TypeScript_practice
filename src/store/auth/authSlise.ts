import { createSlice } from '@reduxjs/toolkit';
import { signUp, signIn, logOut, refresh } from "./authOperations";
import type { RootState } from "../index";

export const selectIsLoggedIn = (state: RootState): boolean => state.auth.isLoggedIn;

export type AuthState = {
    user: {
        name: string | null,
        email: string | null,
    },
    avatarURL: string | null,
    token: string | null,
    refreshToken: string | null,
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
    refreshToken: null,
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
                localStorage.setItem('refreshToken', payload.refreshToken)


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
                localStorage.setItem('refreshToken', payload.refreshToken)
            })
            .addCase(logOut.pending, (state) => {
                state.loading = true
            })
            .addCase(logOut.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.token = null;
                state.isLoggedIn = false;
                localStorage.setItem('token', payload.token)
                localStorage.setItem('refreshToken', payload.refreshToken)
            })
            .addCase(refresh.pending, (state) => {
                state.loading = true;
            })
            .addCase(refresh.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.isLoggedIn = true;
                localStorage.setItem('token', payload.token)
                localStorage.setItem('refreshToken', payload.refreshToken)
            })
    },
    reducers: {

    }
})

export const authReducer = authSlise.reducer; 
