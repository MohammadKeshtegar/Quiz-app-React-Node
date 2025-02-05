import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "react-router-dom";

import SelectUsersToCreateChat from "./SelectUsersToCreateChat";
import { useCreateChatGroup } from "./useCreateChatGroup";
import { useFilterUsers } from "../user/useFilterUsers";
import useDebounce from "../../hooks/useDebounce";
import Button from "../../ui/Button";

function CreateChatGroup({ onCloseModal }) {
  const { username, setFilter } = useFilterUsers();
  const [localSearchedUsername, setLocalSearchedUsername] = useState(username);
  const debouncedSearchedUsername = useDebounce(localSearchedUsername);
  const [file, setFile] = useState();
  const { handleSubmit, register, watch } = useForm();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { isCreating, createChat } = useCreateChatGroup();
  const chatName = watch("name");

  useEffect(
    function () {
      setFilter({ username: debouncedSearchedUsername });
    },
    [setFilter, debouncedSearchedUsername]
  );

  function handleGroupCover(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  function onSubmit(data) {
    createChat({ ...data, members: selectedUsers }, { onSuccess: () => onCloseModal() });
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
          <img src={file || "/default-back.png"} alt="" className="w-20 h-20 object-cover rounded-full cursor-pointer border-2 border-blue-500" />
        </label>
        <input type="text" className="input-auth-style" placeholder="Enter group name" {...register("name")} />
      </div>

      <div>
        <input type="text" placeholder="Seach user" className="input-auth-style mb-3" onChange={(e) => setLocalSearchedUsername(e.target.value)} />
        <SelectUsersToCreateChat setSelectedUsers={setSelectedUsers} selectedUsers={selectedUsers} username={username} />
      </div>

      <div className="w-full">
        <Button
          styleType="fill"
          disable={isCreating || selectedUsers.length === 0 || !chatName}
          customeStyle="w-full justify-center uppercase"
          type="submit"
        >
          Create
        </Button>
      </div>
    </Form>
  );
}

export default CreateChatGroup;
