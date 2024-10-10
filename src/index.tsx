import React from "react";
import { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { ModalProvider } from "./context/index";
import { SortProvider } from "./context/SortContext/SortContext";

import "./index.css";

import App from "./components/App/App";
import store from "./store/index";
import RestrictedRoute from "./components/RestrictedRoute";
import PrivateRoute from "./components/PrivateRoute";

const Home = lazy(() => import("./pages/Home/Home"));
const SignUp = lazy(() => import("./pages/SignUp/SignUp"));
const SignIn = lazy(() => import("./pages/SignIn/SignIn"));
const Todos = lazy(() => import("./pages/Todos/Todos"));

const router = createBrowserRouter([
  {
    path: "/react_typescript_todo",
    element: (
      <SortProvider>
        <App />
      </SortProvider>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "signup",
        element: (
          <RestrictedRoute>
            <Suspense fallback={<div>Loading...</div>}>
              <SignUp />
            </Suspense>
          </RestrictedRoute>
        ),
      },
      {
        path: "signin",
        element: (
          <RestrictedRoute>
            <Suspense fallback={<div>Loading...</div>}>
              <SignIn />
            </Suspense>
          </RestrictedRoute>
        ),
      },
      {
        path: "todos",
        element: (
          <PrivateRoute>
            <Suspense fallback={<div>Loading...</div>}>
              <Todos />
            </Suspense>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        {" "}
        <RouterProvider router={router} />{" "}
      </ModalProvider>
    </Provider>
  </React.StrictMode>
);
