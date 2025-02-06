import { SEARCH_CHATS_TABLE_HEADER } from "../../constant/constant";
import { useGetAllChats } from "./useGetAllChats";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import SearchedQuizzesTableRow from "./SearchedQuizzesTableRow";

export default function SearchedQuizzesTable({ chatName }) {
  const { isLoading, data } = useGetAllChats({ chatName });

  if (isLoading)
    return (
      <div className="w-full h-full flex justify-center">
        <Spinner />
      </div>
    );
  const { data: chats } = data;

  return chats.length > 0 ? (
    <Table>
      <Table.Header headerTitles={SEARCH_CHATS_TABLE_HEADER} headerStyle="grid-cols-4" />
      <Table.Body data={chats} render={(chat) => <SearchedQuizzesTableRow key={chat._id} chat={chat} />} />
    </Table>
  ) : (
    <div className="w-full text-center text-neutral-500 text-lg py-5">No chats found</div>
  );
}
