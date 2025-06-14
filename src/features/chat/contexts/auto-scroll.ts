import { createContext, useContext } from "react";

type AutoScrollContextType = {
  endRef: React.RefObject<HTMLDivElement | null>;
  scrollToBottom: () => void;
};

const AutoScrollContext = createContext<AutoScrollContextType | null>(null);

function useAutoScrollContext() {
  const context = useContext(AutoScrollContext);
  if (!context) {
    throw new Error(
      "useAutoScrollContext must be used within a AutoScrollProvider"
    );
  }
  return context;
}

export { useAutoScrollContext, AutoScrollContext };
