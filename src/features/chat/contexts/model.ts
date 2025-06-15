import type { SupportedModelType } from "backend/ai/lib/models";
import { createContext, useContext } from "react";

type ModelContextType = {
  model: SupportedModelType | null;
  changeModel: (newModel: SupportedModelType) => Promise<null>;
};

const ModelContext = createContext<ModelContextType | null>(null);

function useModelContext() {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error("useModelContext must be used within a ModelProvider");
  }
  return context;
}

export { ModelContext, useModelContext };
