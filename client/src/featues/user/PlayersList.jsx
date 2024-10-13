import { useState } from "react";

import { ITEMS_PER_PAGE, PALYERS_HEADER } from "../../constant/constant";
import FooterPagination from "../../ui/FooterPagination";
import { useGetAllUsers } from "./useGetAllUsers";
import Spinner from "../../ui/Spinner";
import PlayerRow from "./PlayerRow";
import Table from "../../ui/Table";

function PlayersList() {
  const [username, setUsername] = useState("");
  const { isLoading, data } = useGetAllUsers(true);
  if (isLoading) return <Spinner />;
  const { data: fetchedPlayers } = data;

  fetchedPlayers.sort((a, b) => b.points - a.points);

  const players = fetchedPlayers.slice().filter((user) => user.username.startsWith(username));

  return (
    <div className="w-full h-full p-5 text-white flex flex-col gap-5">
      <div className="flex items-center gap-7 self-end">
        <div>
          <input
            type="text"
            placeholder="Search username"
            className="dark:bg-neutral-600 rounded px-3 py-2 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>

      <div>
        <Table>
          <Table.Header headerTitles={PALYERS_HEADER} headerStyle="grid-cols-5" />

          <Table.Body data={players} render={(palyer, i) => <PlayerRow key={i} index={i} player={palyer} />} />

          <Table.Footer>
            <div>
              <p className="text-lg">
                Total players: <span className="font-semibold">{players.length}</span>
              </p>
            </div>

            {players.length > ITEMS_PER_PAGE && <FooterPagination />}
          </Table.Footer>
        </Table>
      </div>
    </div>
  );
}

export default PlayersList;
