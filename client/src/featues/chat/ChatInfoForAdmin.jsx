import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { Form } from "react-router-dom";

import { useGetNotTeammateUsers } from "../user/useGetNotTeammateUsers";
import { useUpdateChatGroup } from "./useUpdateChatGroup";
import SpinnerItself from "../../ui/SpinnerItself";
import MiniSpinner from "../../ui/MiniSpinner";
import ChatUsersItem from "./ChatUsersItem";
import Button from "../../ui/Button";

function ChatInfoForAdmin({ onCloseModal, chat }) {
  const inputFileRef = useRef(null);
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  const [users, setUsers] = useState([]);
  const { handleSubmit, register } = useForm({ defaultValues: chat });
  const { isUpdating, updateChat } = useUpdateChatGroup();
  const { isLoading, data } = useGetNotTeammateUsers(chat._id);

  const hasPicture = chat.picture.startsWith("default");

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
    const newData = { ...data, users, picture: file };

    updateChat({ newData, chatId: chat._id }, { onSuccess: () => onCloseModal() });
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
            src={image ? image : !hasPicture ? `http://127.0.0.1:5000/public/images/chat/${chat.picture}` : "/default-back.png"}
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
              {fetchedUsers.map((user, i) => (
                <ChatUsersItem index={i} user={user} handleUser={handleUser} />
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="w-full">
        <Button styleType="fill" customeStyle="w-full justify-center uppercase" type="submit">
          {isUpdating ? <MiniSpinner /> : "Update"}
        </Button>
      </div>
    </Form>
  );
}

export default ChatInfoForAdmin;
