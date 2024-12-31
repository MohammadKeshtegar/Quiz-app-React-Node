import { useForm } from "react-hook-form";
import { Form } from "react-router-dom";
import { useState } from "react";

import ChatUsersItem from "./ChatUsersItem";
import Button from "../../ui/Button";

function CreateChatGroup() {
  const [file, setFile] = useState();
  const [users, setUsers] = useState([]);
  const { handleSubmit, register } = useForm();

  function handleGroupCover(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-[400px]">
      <div className="flex items-center gap-5">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="group-picture"
          {...register("picture", {
            onChange: (e) => handleGroupCover(e),
          })}
        />
        <label htmlFor="group-picture" className="w-32 h-24 flex items-center justify-center">
          <img
            src={file || "/default-back.png"}
            alt=""
            className="w-20 h-20 object-cover rounded-full cursor-pointer border-2 border-blue-500"
          />
        </label>
        <input type="text" className="input-auth-style" placeholder="Enter group name" {...register("name")} />
      </div>

      <div>
        <input type="text" placeholder="Seach user" className="input-auth-style mb-3" />
        <ul className="dark:bg-neutral-600 bg-neutral-200 rounded p-1 h-96 overflow-y-auto divide-y-2 divide-neutral-500">
          {Array.from({ length: 10 }).map((_, i) => (
            <ChatUsersItem key={i} index={i} userId={users._id} setUsers={setUsers} />
          ))}
        </ul>
      </div>

      <div className="w-full">
        <Button styleType="fill" customeStyle="w-full justify-center uppercase" type="submit">
          Create
        </Button>
      </div>
    </Form>
  );
}

export default CreateChatGroup;
