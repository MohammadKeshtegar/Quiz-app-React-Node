import { useRouteError } from "react-router-dom";

function NotFound() {
  const error = useRouteError();

  console.error(error);

  return <div>{error}</div>;
}

export default NotFound;
