import { Form, NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useLogin } from "./useLogin";
import MiniSpinner from "../../ui/MiniSpinner";
import AuthInput from "../../ui/AuthInput";
import Button from "../../ui/Button";

function Login() {
  const { isLoggingIn, login } = useLogin();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  function onSubmit(data) {
    login(data);
  }

  return (
    <div className="rounded px-5 py-2 shadow-2xl border border-neutral-200 w-[400px] bg-neutral-100 dark:bg-neutral-800/70 dark:border-none dark:text-neutral-300">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-center text-2xl font-bold my-4 dark:text-white uppercase">Login</h3>

        <AuthInput label="Email" error={errors?.email}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="input-auth-style"
            disabled={isLoggingIn}
            {...register("email", { required: true })}
          />
        </AuthInput>

        <AuthInput label="Password" error={errors?.password}>
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="input-auth-style"
            disabled={isLoggingIn}
            {...register("password", { required: true })}
          />
        </AuthInput>

        <div className="mt-8">
          <NavLink to="/signup" className="text-blue-500 text-sm hover:underline pl-1 block">
            Haven't an account?
          </NavLink>
          <NavLink to="/forgot-password" className="text-blue-500 text-sm hover:underline pl-1">
            Forgot your password?
          </NavLink>
        </div>

        <Button styleType="fill" type="submit" customeStyle={"w-full my-4"}>
          {isLoggingIn ? <MiniSpinner /> : "Login"}
        </Button>
      </Form>
    </div>
  );
}

export default Login;
