import { Form } from "react-router-dom";
import { useForm } from "react-hook-form";

import Button from "../../ui/Button";

export default function SeacrhChat() {
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <div className="flex flex-col gap-5 w-[600px]">
      <Form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2">
        <input type="text" className="input-auth-style" placeholder="Search group" {...register("chatName")} />
        <Button type="submit" styleType="fill">
          Search
        </Button>
      </Form>

      <div className="flex flex-col gap-2 overflow-y-auto h-[500px]">
        <div className="dark:bg-neutral-700 bg-neutral-100 flex items-center justify-between px-4 py-2 rounded dark:hover:bg-neutral-600 hover:bg-neutral-200 transition-all">
          <span>chat cover</span>
          <span>chat name</span>
          <span>chat size</span>
          <span>more details</span>
        </div>
      </div>
    </div>
  );
}
