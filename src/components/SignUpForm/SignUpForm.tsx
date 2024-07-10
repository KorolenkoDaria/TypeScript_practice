import { useAppDispatch } from "../../hook";

import { signUp } from "../../store/auth/authOperations";

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
    dispatch(
      signUp(/* {
        email: email.value.trim(),
        password: password.value.trim(),
      } */)
    );
  };
  return (
    <form action="" onSubmit={handleSubmitForm}>
      <input type="email" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Password" />
      <input
        type="password"
        name="repeatPassword"
        placeholder="Repeat password"
      />
      <button type="submit">Sign up</button>
    </form>
  );
};

export default SignUpForm;
