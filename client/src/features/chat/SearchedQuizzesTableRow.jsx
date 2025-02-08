import { TbListDetails } from "react-icons/tb";

import ChatPicture from "../../ui/ChatPicture";
import Table from "../../ui/Table";

export default function SearchedQuizzesTableRow({ chat }) {
  return (
    <Table.Row rowStyle="grid-cols-4 p-2">
      <div className="flex justify-center">
        <ChatPicture picture={chat.picture} pictureStyle='"rounded-full w-10"' />
      </div>
      <div>{chat.name}</div>
      <div>{chat.chatSize}</div>
      <div className="flex justify-center">
        <TbListDetails />
      </div>
    </Table.Row>
  );
}
