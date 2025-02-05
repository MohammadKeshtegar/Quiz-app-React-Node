import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMode } from "../context/Mode";

function ToastNotif() {
  const { mode } = useMode();

  return (
    <ToastContainer
      position="top-right"
      hideProgressBar={false}
      closeOnClick={true}
      theme={`${mode === "dark" ? "dark" : "light"}`}
      autoClose={3000}
      pauseOnHover={false}
    />
  );
}

export default ToastNotif;
