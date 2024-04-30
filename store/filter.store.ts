import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { create } from "zustand";
import { useDataStore } from "./data.store";
import { useSearchStore } from "./search.store";

type State = {
   filters: { [key: string]: string };
   category: null | string;
};

type Action = {
   setFilters: (filters: State["filters"]) => void;
   setCategory: (category: State["category"]) => void;
   handleClearFiltersAndFetchData: (ref: React.RefObject<BottomSheetModal>) => void;
   handleApplyFiltersAndFetchData: (ref: React.RefObject<BottomSheetModal>) => void;
};

export const useFilterStore = create<State & Action>((set, get) => {
   const { searchQuery } = useSearchStore.getState();
   const { setImages, fetchData } = useDataStore.getState();

   return {
      filters: {},
      category: null,
      setCategory: (category) => set((state) => ({ ...state, category: category })),
      setFilters: (newFilters) => {
         set((state) => ({
            ...state,
            filters: {
               ...state.filters,
               ...newFilters,
            },
         }));
      },
      handleClearFiltersAndFetchData: (modalRef: React.RefObject<BottomSheetModal>) => {
         const { filters, category } = get(); // getting the local state
         if (Object.keys(filters).length > 0) {
            setImages([]);
            set((state) => ({ ...state, filters: {} }));
            fetchData({
               page: 1,
               searchQuery: searchQuery,
               append: false,
               category: category !== null ? category : "",
            });
         }
         // Close the Bottom sheet
         modalRef.current?.close(); // Assuming bottomSheetModalRef is accessible
      },
      handleApplyFiltersAndFetchData: (modalRef: React.RefObject<BottomSheetModal>) => {
         const { filters, category } = get();
         if (Object.keys(filters).length > 0) {
            setImages([]);
            fetchData({
               page: 1,
               searchQuery: searchQuery,
               append: false,
               category: category !== null ? category : "",
               ...filters,
            });
         }
         // Close the Bottom sheet
         modalRef.current?.close();
      },
   };
});
