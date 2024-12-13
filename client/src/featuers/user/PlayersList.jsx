import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { PALYERS_HEADER } from "../../constant/constant";
import { useGetAllUsers } from "./useGetAllUsers";
import Spinner from "../../ui/Spinner";
import PlayerRow from "./PlayerRow";
import Table from "../../ui/Table";
import PaginationButton from "../../ui/PaginationButton";

function PlayersList() {
  const { isLoading, data } = useGetAllUsers(true);
  if (isLoading) return <Spinner />;
  const { data: players } = data;

  return (
    <div className="w-full h-full p-5 text-white flex flex-col gap-5">
      <div className="flex items-center gap-7 self-end">
        <div>
          <input
            type="text"
            placeholder="Enter user name"
            className="bg-neutral-600 rounded px-3 py-2 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <Table>
          <Table.Header headerTitles={PALYERS_HEADER} headerStyle="grid-cols-5" />

          <Table.Body
            data={players}
            render={(palyer, i) => <PlayerRow key={i} index={i} player={palyer} bodyStyle="border border-neutral-700/50" />}
            bodyStyle="border border-neutral-700/50"
          />

          <Table.Footer>
            <div>
              <p className="text-lg">
                Total players: <span className="font-semibold">{players.length}</span>
              </p>
            </div>

            <div className="border-2 rounded flex items-center">
              <PaginationButton>
                <FaChevronLeft />
              </PaginationButton>

              <div className="border-x-2 px-4 py-1 bg-neutral-600">0</div>

              <PaginationButton>
                <FaChevronRight />
              </PaginationButton>
            </div>
          </Table.Footer>
        </Table>
      </div>
    </div>
  );
}

export default PlayersList;
