import { createRoot } from "react-dom/client";
import "./index.css";
import { store, persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ThemeProvider from "./components/Providers/Theme/ThemeProvider.jsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";

import "./config/i18n.js";

createRoot(document.getElementById("root")).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </PersistGate>
);
