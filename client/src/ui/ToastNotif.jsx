import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMode } from "../context/Mode";

function ToastNotif() {
  const { mode } = useMode();

  return (
    <ToastContainer
      position="top-right"
      style={{ top: "75px", boxShadow: mode == !"dark" ? "0px 5pxpx 10px rgba(0,0,0,0.2)" : "" }}
      hideProgressBar={false}
      closeOnClick={true}
      theme={mode === "dark" ? "dark" : "light"}
      autoClose={3000}
      pauseOnHover={false}
    />
  );
}

export default ToastNotif;
