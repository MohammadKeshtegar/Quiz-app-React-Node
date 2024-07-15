import { useForgotPassword } from "./useForgotPassword";
import { useForm } from "react-hook-form";
import { Form } from "react-router-dom";

import MiniSpinner from "../../ui/MiniSpinner";
import Button from "../../ui/Button";

function ForgotPassword() {
  const { isSending, sendEmail } = useForgotPassword();
  const { handleSubmit, register } = useForm();
  const port = window.location.port;

  function handleSendEmail(data) {
    sendEmail({ email: data.email, port });
  }

  return (
    <div className="h-screen grid place-items-center w-full bg-neutral-900/95 bg-gradient-to-tr from-neutral-900/80 to-neutral-800 text-white">
      <Form className="w-96 rounded-md p-5 flex flex-col gap-4 shadow-md bg-neutral-700/40" onSubmit={handleSubmit(handleSendEmail)}>
        <h2 className="text-center py-4 text-3xl font-semibold">Forgot password</h2>

        {isSending && (
          <div className="bg-blue-600/30 text-blue-200/90 rounded p-2 text-sm">
            <p>We are sending an email to your email address, Please check your email to reset your password.</p>
          </div>
        )}

        <input className="input-auth-style" type="email" placeholder="Email address" name="email" disabled={isSending} {...register("email")} />

        <Button styleType={"fill"} type="submit">
          {isSending ? <MiniSpinner /> : "Submit"}
        </Button>
      </Form>
    </div>
  );
}

export default ForgotPassword;
