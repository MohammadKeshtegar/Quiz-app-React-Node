import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { Form } from "react-router-dom";

import SelectUserFromUsersList from "./SelectUserFromUsersList";
import { useCreateChatGroup } from "./useCreateChatGroup";
import { useGetAllUsers } from "../user/useGetAllUsers";
import { useQueryClient } from "@tanstack/react-query";
import SpinnerItself from "../../ui/SpinnerItself";
import MiniSpinner from "../../ui/MiniSpinner";
import Button from "../../ui/Button";

function CreateChatGroup({ onCloseModal }) {
  const currentUser = useSelector((state) => state.user);
  const inputFileRef = useRef(null);
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { handleSubmit, register } = useForm();
  const { isLoading, data } = useGetAllUsers(true);
  const { isCreating, createChat } = useCreateChatGroup();
  const queryClient = useQueryClient();

  function handleOpenFile(e) {
    inputFileRef.current.click();
  }

  function handleGroupCover(e) {
    setImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  }

  function handleUser(userId) {
    if (selectedUsers.includes(userId)) setSelectedUsers((users) => users.filter((user) => user !== userId));
    else setSelectedUsers((users) => [...users, userId]);
  }

  function onSubmit(data) {
    createChat(
      { ...data, users: [...selectedUsers, currentUser.id], picture: file },
      {
        onSuccess: () => {
          onCloseModal();
          queryClient.invalidateQueries({ queryKey: ["chat"] });
        },
      }
    );
  }

  if (isLoading)
    return (
      <div className="w-[400px] flex items-center justify-center h-[400px]">
        <SpinnerItself />
      </div>
    );
  const { data: fetchedUsers } = data;

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-[400px]">
      <div className="flex items-center gap-5">
        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleGroupCover(e)} ref={inputFileRef} />
        <label className="w-28">
          <img
            src={image || "/default-back.png"}
            alt=""
            className="w-20 h-20 object-cover rounded-full cursor-pointer border-2 border-blue-500"
            onClick={handleOpenFile}
          />
        </label>
        <input type="text" className="input-auth-style" placeholder="Enter group name" {...register("name")} />
      </div>

      <div>
        {isLoading ? (
          <div className="h-96 dark:bg-neutral-900 w-full flex items-center justify-center">
            <SpinnerItself />
          </div>
        ) : (
          <SelectUserFromUsersList fetchedUsers={fetchedUsers} currentUser={currentUser} selectedUsers={selectedUsers} handleUser={handleUser} />
        )}
      </div>

      <div className="w-full">
        <Button styleType="fill" customeStyle="w-full justify-center uppercase" type="submit">
          {isCreating ? <MiniSpinner /> : "Create"}
        </Button>
      </div>
    </Form>
  );
}

export default CreateChatGroup;
