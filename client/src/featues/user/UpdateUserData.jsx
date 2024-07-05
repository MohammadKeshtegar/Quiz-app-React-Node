import { useForm } from "react-hook-form";
import { Form } from "react-router-dom";
import FormRow from "../../ui/FormRow";
import { useState } from "react";
import Button from "../../ui/Button";
import { useUpdateUserData } from "./useUpdateUserData";
import MiniSpinner from "../../ui/MiniSpinner";

function UpdateUserData({ user, onCloseModal }) {
  const [file, setFile] = useState();
  const { register, handleSubmit } = useForm({ defaultValues: user });
  const { isUpdating, updateUserData } = useUpdateUserData();
  const defaultPhoto = user.photo?.includes("default");

  function onSubmitData(data) {
    updateUserData({ data });
  }

  function handlePhoto(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <Form onSubmit={handleSubmit(onSubmitData)} className="flex flex-col gap-3 px-3 w-1/2">
      <div className="flex w-full">
        <div className="w-44 h-44">
          <img
            src={file ? file : !defaultPhoto ? `http://127.0.0.1:5000/public/images/users/${user.photo}` : "/default-user.png"}
            className="w-36 h-36 border-4 border-blue-500 rounded-full overflow-hidden z-20"
            alt="user-img"
          />
        </div>
        <div className="flex flex-col gap-2 w-5/6 ml-12">
          <FormRow htmlFor="photo" text="User photo">
            <input
              type="file"
              accept="image/*"
              id="photo"
              className="bg-neutral-600 input-file rounded cursor-pointer text-neutral-400 focus:ring-[2px] focus:ring-blue-600 focus:border-none focus:outline-none w-full"
              {...register("photo")}
              onChange={handlePhoto}
            />
          </FormRow>
          <FormRow htmlFor="name" text="Username">
            <input type="text" name="username" id="username" className="input-auth-style" {...register("username")} placeholder="Username" />
          </FormRow>
          <FormRow htmlFor="email" text="Email">
            <input type="email" name="email" id="email" className="input-auth-style" {...register("email")} placeholder="Email" />
          </FormRow>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <FormRow htmlFor="Telegram" text="Telegram">
          <input type="text" name="telegram" id="telegram" className="input-auth-style" {...register("telegram")} placeholder="Telegram link" />
        </FormRow>
        <FormRow htmlFor="Discord" text="Discord">
          <input type="text" name="discord" id="discord" className="input-auth-style" {...register("discord")} placeholder="Discord link" />
        </FormRow>
        <FormRow htmlFor="Reddit" text="Reddit">
          <input type="text" name="reddit" id="reddit" className="input-auth-style" {...register("reddit")} placeholder="Reddit link" />
        </FormRow>
        <FormRow htmlFor="Twitter (X)" text="Twitter (X)">
          <input type="text" name="twitter" id="twitter" className="input-auth-style" {...register("twitter")} placeholder="Twitter link" />
        </FormRow>
        <FormRow htmlFor="Instagram" text="Instagram">
          <input type="text" name="instagram" id="instagram" className="input-auth-style" {...register("instagram")} placeholder="Instagram link" />
        </FormRow>
        <FormRow htmlFor="Linkedin" text="Instagram">
          <input type="text" name="linkedin" id="linkedin" className="input-auth-style" {...register("linkedin")} placeholder="Linkedin link" />
        </FormRow>
      </div>

      <div>
        <Button styleType="fill" customeStyle="ml-auto mt-5 px-7" type="submit">
          {isUpdating ? <MiniSpinner /> : "Update"}
        </Button>
      </div>
    </Form>
  );
}

export default UpdateUserData;
