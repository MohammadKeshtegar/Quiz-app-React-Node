import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistGate } from "redux-persist/integration/react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import React from "react";

import { store, persisStore } from "./redux/store.js";
import { ModeProvider } from "./context/Mode";
import App from "./App.jsx";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ModeProvider>
        <PersistGate persistor={persisStore} loading={null}>
          <Provider store={store}>
            <App />
          </Provider>
        </PersistGate>
      </ModeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
