import React from "react";
import { useAppDispatch } from "../../hook";
import { signIn } from "../../store/auth/authOperations";

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
    <form onSubmit={handleSubmitForm}>
      <input type="email" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Password" />
      <button type="submit">Sign in</button>
    </form>
  );
};
export default SignInForm;
