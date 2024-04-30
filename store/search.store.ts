import { create } from "zustand";

type State = {
   searchQuery: string;
};

type Action = {
   updateSearchQuery: (searchQuery: State["searchQuery"]) => void;
   clearSearchQuery: () => void;
};

export const useSearchStore = create<State & Action>((set) => ({
   searchQuery: "",
   updateSearchQuery: (searchQuery) => set({ searchQuery }),
   clearSearchQuery: () => set({ searchQuery: "" }),
}));
