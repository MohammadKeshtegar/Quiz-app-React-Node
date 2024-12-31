import { PLAYERS_HEADER } from "../../constant/constant";
import { useGetAllUsers } from "./useGetAllUsers";
import PlayerRowNoChat from "./PlayerRowNoChat";
import PageSpinner from "../../ui/PageSpinner";
import PlayerRowChat from "./PlayerRowChat";
import Table from "../../ui/Table";

function PlayersList() {
  const { isLoading, data } = useGetAllUsers(true);
  if (isLoading) return <PageSpinner />;
  const { data: players } = data;

  console.log(players);

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
          <Table.Header headerTitles={PLAYERS_HEADER} headerStyle="grid-cols-5" />

          <Table.Body
            data={players}
            render={(player, i) => {
              if (player.chat) return <PlayerRowChat key={i} index={i} player={player} bodyStyle="border border-neutral-700/50" />;
              else return <PlayerRowNoChat key={i} index={i} player={player} bodyStyle="border border-neutral-700/50" />;
            }}
            bodyStyle="border border-neutral-700/50"
          />

          <Table.Footer>
            <Table.Pagination itemsLength={players.length} />
          </Table.Footer>
        </Table>
      </div>
    </div>
  );
}

export default PlayersList;
