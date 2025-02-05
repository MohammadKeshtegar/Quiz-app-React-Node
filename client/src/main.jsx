import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import React from "react";

import { SocketProvider } from "./context/Socket.jsx";
import { ModeProvider } from "./context/Mode";
import App from "./App.jsx";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ModeProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </ModeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
