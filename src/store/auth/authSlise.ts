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

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signUp.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.token = payload.token;
                state.refreshToken = payload.refreshToken;
                state.user.email = payload.email;
                state.isLoggedIn = true;
                localStorage.setItem('token', payload.token);
                localStorage.setItem('refreshToken', payload.refreshToken);
            })
            .addCase(signUp.rejected, (state, { error }) => {
                state.loading = false;
                state.error = error.message || 'Failed to sign up';
            })
            .addCase(signIn.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signIn.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.token = payload.token;
                state.refreshToken = payload.refreshToken;
                state.user.email = payload.email;
                state.isLoggedIn = true;
                localStorage.setItem('token', payload.token);
                localStorage.setItem('refreshToken', payload.refreshToken);
            })
            .addCase(signIn.rejected, (state, { error }) => {
                state.loading = false;
                state.error = error.message || 'Failed to sign in';
            })
            .addCase(logOut.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logOut.fulfilled, (state) => {
                state.loading = false;
                state.token = null;
                state.refreshToken = null;
                state.isLoggedIn = false;
                state.user = { name: null, email: null };
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
            })
            .addCase(logOut.rejected, (state, { error }) => {
                state.loading = false;
                state.error = error.message || 'Failed to log out';
            })
            .addCase(refresh.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(refresh.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.token = payload.token;
                state.refreshToken = payload.refreshToken;
                state.isLoggedIn = true;
                localStorage.setItem('token', payload.token);
                localStorage.setItem('refreshToken', payload.refreshToken);
            })
            .addCase(refresh.rejected, (state, { error }) => {
                state.loading = false;
                state.error = error.message || 'Failed to refresh tokens';
            });
    }
});

export const authReducer = authSlice.reducer;
