import { CHAT_MEMBERS_TABLE_HEADER } from "../../constant/constant";
import ChatMemberItem from "./ChatMemberItem";
import { useGetChat } from "./useGetChat";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";

export default function ChatInfo({ chatID }) {
  const { isLoading, data } = useGetChat(chatID);

  if (isLoading) return <Spinner />;
  const { data: chatData } = data;
  const { picture, name, members, chatSize } = chatData;
  const isDefaultChatPicture = picture?.startsWith("default");

  return (
    <div className="w-[700px]">
      <div className="flex items-center gap-10 mb-7 px-5">
        <img src={!isDefaultChatPicture ? `${picture}` : "/default-back.png"} alt="user-profile" className="w-20 h-20 rounded-full" />

        <div className="text-lg">{name}</div>
        <div className="text-lg">Members: {chatSize}</div>
      </div>
      <Table>
        <Table.Header headerTitles={CHAT_MEMBERS_TABLE_HEADER} headerStyle="grid-cols-4" />
        <Table.Body data={members} render={(member) => <ChatMemberItem key={member._id} member={member} />} bodyStyle="max-h-96 overflow-y-auto" />
      </Table>
    </div>
  );
}
