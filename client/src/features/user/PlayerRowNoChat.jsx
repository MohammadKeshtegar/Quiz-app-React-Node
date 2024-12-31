import PlayerRow from "./PlayerRow";

export default function PlayerRowNoChat({ index, player }) {
  return <PlayerRow index={index} player={player} hasChat={Boolean(player.chat)} />;
}
