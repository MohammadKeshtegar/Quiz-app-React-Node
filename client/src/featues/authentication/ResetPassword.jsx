import { Form, useParams } from "react-router-dom";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { useResetPassword } from "./useResetPassword";
import MiniSpinner from "../../ui/MiniSpinner";

function ResetPassword() {
  const { register, handleSubmit } = useForm();
  const { isResetting, resetPassowrd } = useResetPassword();
  const token = useParams();

  function handleResetPassword(data) {
    resetPassowrd({ token, ...data });
  }

  return (
    <div className="h-screen grid place-items-center bg-neutral-200 w-full dark:bg-neutral-900">
      <Form className="w-96 rounded-md p-5 flex flex-col gap-4 shadow-md bg-neutral-100 dark:bg-neutral-700/40" onSubmit={handleSubmit(handleResetPassword)}>
        <h2 className="text-center py-4 text-3xl font-semibold dark:text-white">Reset your password</h2>

        <input
          className="input-auth-style"
          type="password"
          placeholder="New password"
          name="password"
          disabled={isResetting}
          {...register("password")}
        />

        <input
          className="input-auth-style"
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          disabled={isResetting}
          {...register("confirmPassword")}
        />

        <Button type="submit" styleType={"fill"} disabled={isResetting}>
          {isResetting ? <MiniSpinner /> : "Reset"}
        </Button>
      </Form>
    </div>
  );
}

export default ResetPassword;
