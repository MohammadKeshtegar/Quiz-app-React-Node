import { Outlet, useLocation } from "react-router-dom";
import IconSidebar from "./IconSiderbar";
import Sidebar from "./Sidebar";
import Header from "./Header";

function AppLayout() {
  const currentUrl = useLocation();

  return (
    <div className="flex flex-col">
      <Header />
      <div className="w-full flex min-h-[calc(100vh-64px)]">
        {!(currentUrl.pathname === "/login" || currentUrl.pathname === "/signup" || currentUrl.pathname === "/") ? (
          currentUrl.pathname.startsWith("/chats") ? (
            <IconSidebar />
          ) : (
            <Sidebar />
          )
        ) : null}
        <div className="w-full flex items-center justify-center dark:bg-neutral-900">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
