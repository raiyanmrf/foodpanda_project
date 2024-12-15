import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartContextComponent } from "./hooks/CartContext.jsx";
import MapContextComponent from "./components/MapContextComponent.jsx";
import PopupContextComponent from "./hooks/PopupContextComponent.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CartContextComponent>
        <MapContextComponent>
          <PopupContextComponent>
            <App />
          </PopupContextComponent>
        </MapContextComponent>
      </CartContextComponent>
    </QueryClientProvider>
  </StrictMode>
);
