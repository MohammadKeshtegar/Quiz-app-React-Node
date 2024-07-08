import { useRouteError } from "react-router-dom";

function ErrorRoute() {
  const error = useRouteError();

  console.error(error);
  console.error(error);

  return (
    <div className="bg-neutral-900 w-full h-screen flex items-center justify-center">
      <p className="text-neutral-400 text-2xl bg-neutral-800 inline-block px-3 py-2 rounded shadow-md">💥 {error.message} 💥</p>
    </div>
  );
}

export default ErrorRoute;
