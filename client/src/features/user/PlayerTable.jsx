import { PLAYERS_HEADER } from "../../constant/constant";
import { useGetAllUsers } from "./useGetAllUsers";
import PlayerRowNoChat from "./PlayerRowNoChat";
import PlayerRowChat from "./PlayerRowChat";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";

export default function PlayerTable({ username }) {
  const { isLoading, data } = useGetAllUsers({ username });

  if (isLoading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  const { data: players } = data;

  return (
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
  );
}
