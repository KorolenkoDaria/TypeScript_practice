import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./components/App/App";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import store from "./store/index";

const router = createBrowserRouter([
  {
    path: "/react_typescript_todo",
    element: <App />,
  },
  {
    path: "/react_typescript_todo/signup",
    element: <SignUp />,
  },
  {
    path: "/react_typescript_todo/signin",
    element: <SignIn />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
