import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import DataProviders from "@/providers/data-providers";
import "./index.css";

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <DataProviders />
    </StrictMode>
  );
}
