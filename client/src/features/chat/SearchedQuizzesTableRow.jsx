import { TbListDetails } from "react-icons/tb";

import ChatCover from "../../ui/ChatCover";
import Table from "../../ui/Table";

export default function SearchedQuizzesTableRow({ chat }) {
  return (
    <Table.Row rowStyle="grid-cols-4 p-2">
      <div className="flex justify-center">
        <ChatCover cover={chat.picture} />
      </div>
      <div>{chat.name}</div>
      <div>{chat.chatSize}</div>
      <div className="flex justify-center">
        <TbListDetails />
      </div>
    </Table.Row>
  );
}
