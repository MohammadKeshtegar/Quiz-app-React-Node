import { Form } from "react-router-dom";
import FormRow from "../../ui/FormRow";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import { useChangePassword } from "./useChangePassword";
import MiniSpinner from "../../ui/MiniSpinner";

function UpdateUserPassword() {
  const { register, handleSubmit } = useForm();
  const { isChanging, changePassword } = useChangePassword();

  function onSubmit(data) {
    changePassword(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 px-3 w-1/2 ">
      <FormRow htmlFor="currentPassword" text="Current password">
        <input type="password" className="input-auth-style" placeholder="current password" {...register("passwordCurrent")} />
      </FormRow>

      <FormRow htmlFor="password" text="Passwrod">
        <input type="password" className="input-auth-style" placeholder="password" {...register("password")} />
      </FormRow>

      <FormRow htmlFor="confirmPassword" text="Confirm password">
        <input type="password" className="input-auth-style" placeholder="confirm password" {...register("confirmPassword")} />
      </FormRow>

      <div>
        <Button styleType="fill" customeStyle="ml-auto mt-5 px-7" type="submit">
          {isChanging ? <MiniSpinner /> : "Update"}
        </Button>
      </div>
    </Form>
  );
}

export default UpdateUserPassword;
