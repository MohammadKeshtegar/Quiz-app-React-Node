import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ModeProvider } from "./context/Mode";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store, persisStore } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";

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
