import { scan } from "react-scan";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import ServiceProviders from "@/providers/service";
import "@/index.css";
import AppProvider from "@/providers/app";

scan({
  enabled: true
});

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ServiceProviders>
        <AppProvider />
      </ServiceProviders>
    </StrictMode>
  );
}
