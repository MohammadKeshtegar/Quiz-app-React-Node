import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { Form } from "react-router-dom";

import ChatUsersItem from "./ChatUsersItem";
import Button from "../../ui/Button";
import { useGetAllUsers } from "../user/useGetAllUsers";
import SpinnerItself from "../../ui/SpinnerItself";
import { useCreateChatGroup } from "./useCreateChatGroup";
import MiniSpinner from "../../ui/MiniSpinner";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

function CreateChatGroup({ onCloseModal }) {
  const currentUser = useSelector((state) => state.user);
  const inputFileRef = useRef(null);
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  const [users, setUsers] = useState([]);
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
    if (users.includes(userId)) setUsers((users) => users.filter((user) => user !== userId));
    else setUsers((users) => [...users, userId]);
  }

  function onSubmit(data) {
    createChat(
      { ...data, users: [...users, currentUser.id], picture: file },
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
          <div className="h-96 bg-neutral-900 w-full flex items-center justify-center">
            <SpinnerItself />
          </div>
        ) : (
          <>
            <input type="text" placeholder="Seach user" className="input-auth-style mb-3" />
            <ul className="bg-neutral-600 rounded p-1 max-h-96 overflow-y-auto divide-y-2 divide-neutral-500">
              {fetchedUsers.map((user, i) => user._id !== currentUser.id && <ChatUsersItem key={i} index={i} user={user} handleUser={handleUser} />)}
            </ul>
          </>
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
