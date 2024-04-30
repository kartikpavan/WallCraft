import { fetchImages } from "@/api";
import { FetchParamType, PixabayImage } from "@/types/types";
import { create } from "zustand";

type State = {
   images: PixabayImage[];
};

type Action = {
   setImages: (images: PixabayImage[], append?: boolean) => void;
   fetchData: (params: FetchParamType) => void;
};

export const useDataStore = create<State & Action>((set) => ({
   images: [],
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
}));
