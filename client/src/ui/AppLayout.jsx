import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";

function AppLayout() {
  const currentUrl = useLocation();

  return (
    <div className="flex flex-col">
      <Header />

      <div className="w-full flex min-h-[calc(100vh-64px)]">
        {!(currentUrl.pathname === "/login" || currentUrl.pathname === "/signup" || currentUrl.pathname === "/") && (
          <Sidebar currentUrl={currentUrl.pathname} />
        )}

        <div className="w-full flex items-center justify-center dark:bg-neutral-900 bg-neutral-200">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
