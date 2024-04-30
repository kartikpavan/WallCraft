import { fetchImages } from "@/api";
import { FetchParamType, PixabayImage } from "@/types/types";
import { create } from "zustand";

type State = {
   images: PixabayImage[];
   page: number;
};

type Action = {
   setImages: (images: PixabayImage[], append?: boolean) => void;
   fetchData: (params: FetchParamType) => void;
   changePageNumber: () => void;
   resetPageNumber: () => void;
};

export const useDataStore = create<State & Action>((set) => ({
   images: [],
   page: 1,
   setImages: (images, append = false) => {
      set((state) => ({
         images: append ? [...state.images, ...images] : images,
      }));
   },
   fetchData: async (params) => {
      console.log(params);
      const response = await fetchImages(params);
      if (response?.success && response?.data.hits) {
         if (params.append) {
            set((state) => ({ images: [...state.images, ...response.data.hits] }));
         } else {
            set({ images: response.data.hits });
         }
      }
   },
   changePageNumber: () => set((state) => ({ ...state, page: state.page + 1 })),
   resetPageNumber: () => set((state) => ({ ...state, page: 1 })),
}));
