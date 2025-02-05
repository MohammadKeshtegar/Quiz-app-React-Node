import { Form, NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";

import MiniSpinner from "../../ui/MiniSpinner";
import AuthInput from "../../ui/AuthInput";
import { useSignup } from "./useSignup";
import Button from "../../ui/Button";

function Signup() {
  const { isSignUpgIn, signup } = useSignup();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  function onSubmit(data) {
    signup(data, {});
  }

  return (
    <div className="rounded px-5 py-2 shadow-lg border border-neutral-100 w-[600px] dark:bg-neutral-800/70 dark:border-none dark:text-neutral-400">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-center text-2xl font-bold my-4 dark:text-white uppercase">Signup</h3>

        <div className="grid grid-rows-3 grid-cols-2 gap-4">
          <AuthInput label="Name" error={errors?.name}>
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="input-auth-style"
              disabled={isSignUpgIn}
              {...register("name", { required: true })}
            />
          </AuthInput>

          <AuthInput label="username" error={errors?.username}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              className="input-auth-style"
              disabled={isSignUpgIn}
              {...register("username", { required: true })}
            />
          </AuthInput>

          <AuthInput label="Email" error={errors?.email}>
            <input
              type="text"
              placeholder="Email"
              name="email"
              className="input-auth-style"
              disabled={isSignUpgIn}
              {...register("email", { required: true })}
            />
          </AuthInput>
          <AuthInput label="Age" error={errors?.age}>
            <input
              type="text"
              placeholder="Age"
              name="age"
              className="input-auth-style"
              disabled={isSignUpgIn}
              {...register("age", { required: true })}
            />
          </AuthInput>
          <AuthInput label="Password" error={errors?.password}>
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="input-auth-style"
              disabled={isSignUpgIn}
              {...register("password", { required: true })}
            />
          </AuthInput>
          <AuthInput label="Confirm Password" error={errors?.confirmPassword}>
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              className="input-auth-style"
              disabled={isSignUpgIn}
              {...register("confirmPassword", { required: true })}
            />
          </AuthInput>
        </div>

        <div className="mt-8 mb-5">
          <Button styleType="fill" type="submit" customeStyle="w-full flex items-center justify-center">
            {isSignUpgIn ? <MiniSpinner /> : "Sign up"}
          </Button>
        </div>

        <div className="my-4">
          <NavLink to="/login" className="text-blue-500 text-sm hover:underline pl-1">
            Already have an account?
          </NavLink>
        </div>
      </Form>
    </div>
  );
}

export default Signup;
