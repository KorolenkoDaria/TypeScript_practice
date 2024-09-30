import { configureStore } from "@reduxjs/toolkit";
import { todosReducer } from "./todos/todoSlice";
import { authReducer } from "./auth/authSlise";

const store = configureStore({
    reducer: {
        todos: todosReducer,
        auth: authReducer
    },
}
);
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;