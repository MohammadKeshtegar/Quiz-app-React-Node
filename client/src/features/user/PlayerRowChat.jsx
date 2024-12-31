import { useGetChat } from "../chat/useGetChat";
import Spinner from "../../ui/Spinner";
import PlayerRow from "./PlayerRow";

export default function PlayerRowChat({ index, player }) {
  const { isLoading, data } = useGetChat(player.chat);

  if (isLoading)
    return (
      <div className="w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  const { data: chatData } = data;

  return <PlayerRow chatData={chatData} index={index} player={player} />;
}
