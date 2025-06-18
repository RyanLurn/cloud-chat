import { create } from "zustand";

interface ResumableStreams {
  isResumable: boolean;
  setIsResumable: (isResumable: boolean) => void;
}

const useResumableStreamsStore = create<ResumableStreams>()((set) => ({
  isResumable: true,
  setIsResumable: (isResumable: boolean) => set({ isResumable })
}));

export default useResumableStreamsStore;
