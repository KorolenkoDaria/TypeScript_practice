import { signUp } from "../../store/auth/authOperations";
import { useAppDispatch } from "../../hook";
import { NavLink } from "react-router-dom";

const SignUpForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const email = form.elements.namedItem("email") as HTMLInputElement;
    const password = form.elements.namedItem("password") as HTMLInputElement;
    const repeatPassword = form.elements.namedItem(
      "repeatPassword"
    ) as HTMLInputElement;

    console.log(email.value, password.value, repeatPassword.value);

    if (password.value.trim() !== repeatPassword.value.trim()) {
      return alert(
        "Password mismatch. Please make sure you enter the same passwords!"
      );
    }
    dispatch(
      signUp({
        email: email.value.trim(),
        password: password.value.trim(),
      })
    );
  };
  return (
    <div className="mt-16">
      <form
        action=""
        onSubmit={handleSubmitForm}
        className="flex flex-col gap-10 w-1/3 m-auto shadow-xl rounded-3xl  py-10 px-6 "
      >
        <h3 className="text-blue-500 text-center">Registration Form</h3>
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
        <input
          type="password"
          name="repeatPassword"
          placeholder="Confirm password"
          className="placeholder:text-slate-400 placeholder:text-xs outline-none border-b border-teal-500 py-2 text-slate-500"
        />
        <button
          type="submit"
          className="bg-blue-500 border border-blue-500  text-white py-2 rounded-3xl hover:bg-white hover:border hover:border-teal-500  hover:text-teal-500"
        >
          Submit
        </button>
        <div>
          <NavLink
            to="/react_typescript_todo/signin"
            className="text-sm text-slate-500 underline decoration-solid hover:text-blue-500"
          >
            Sign In
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
