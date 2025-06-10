import { scan } from "react-scan";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import DataProviders from "@/providers/data-providers";
import "./index.css";

scan({
  enabled: true
});

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <DataProviders />
    </StrictMode>
  );
}
