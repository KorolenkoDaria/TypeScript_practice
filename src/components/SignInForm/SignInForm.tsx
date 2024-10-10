import React from "react";
import { useAppDispatch } from "../../hook";
import { signIn } from "../../store/auth/authOperations";
import { NavLink } from "react-router-dom";

const SignInForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const email = form.elements.namedItem("email") as HTMLInputElement;
    const password = form.elements.namedItem("password") as HTMLInputElement;

    dispatch(
      signIn({
        email: email.value.trim(),
        password: password.value.trim(),
      })
    );
  };
  return (
    <div className="mt-16">
      <form
        onSubmit={handleSubmitForm}
        className="flex flex-col gap-10 w-1/3 m-auto shadow-xl rounded-3xl  py-10 px-6"
      >
        <h3 className="text-blue-500 text-center">SignIn Form</h3>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="placeholder:text-slate-400 placeholder:text-xs outline-none border-b border-teal-500 text-slate-500 py-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          className="placeholder:text-slate-400 placeholder:text-xs outline-none border-b border-teal-500 text-slate-500 py-2"
        />
        <button
          className="bg-blue-500 border border-blue-500  text-white py-2 rounded-3xl hover:bg-white hover:border hover:border-teal-500  hover:text-teal-500"
          type="submit"
        >
          Submit
        </button>
        <div className="flex justify-between">
          <p className="text-sm text-slate-500 underline decoration-solid hover:text-blue-500 cursor-pointer">
            Forgot password?
          </p>
          <NavLink
            to="/react_typescript_todo/signup"
            className="text-sm text-slate-500 underline decoration-solid hover:text-blue-500"
          >
            Sign Up
          </NavLink>
        </div>
      </form>
    </div>
  );
};
export default SignInForm;
