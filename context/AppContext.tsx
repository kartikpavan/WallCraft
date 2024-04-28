import { fetchImages } from "@/api";
import { useDebounce } from "@/hooks/useDebounce";
import { PixabayImage } from "@/types/types";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";

type AppContextType = {
   setSearchText: (searchText: string) => void;
   clearSearch: () => void;
   handleSelectCategory: (category: string | null) => void;
   handlePresentModalPress: () => void;
   selectedCategory: string | null;
   images: PixabayImage[];
   searchText: string;
   bottomSheetModalRef: React.RefObject<BottomSheetModal>;
};

const AppContext = createContext<AppContextType>({
   setSearchText: () => {},
   clearSearch: () => {},
   handleSelectCategory: () => {},
   handlePresentModalPress: () => {},
   selectedCategory: "",
   images: [],
   searchText: "",
   bottomSheetModalRef: React.createRef<BottomSheetModalMethods>(),
});

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
   const [searchText, setSearchText] = useState<string>("");
   const [selectedCategory, setSlelectedCategory] = useState<string | null>(null);
   const [images, setImages] = useState<PixabayImage[]>([]);
   const [page, setPage] = useState(1);
   const debouncedValue = useDebounce(searchText, 600);
   const bottomSheetModalRef = useRef<BottomSheetModal>(null);

   const handlePresentModalPress = useCallback(() => {
      bottomSheetModalRef.current?.present();
   }, []);

   const fetchData = async (
      page: number,
      append: boolean = false,
      query: string = "",
      category: string = ""
   ) => {
      const response = await fetchImages({
         category: category,
         searchQuery: query,
         order: "popular",
         perPage: 25,
         page: page,
         append: true,
      });
      if (response?.success && response?.data.hits) {
         if (append) {
            setImages([...images, ...response.data.hits]);
         } else {
            setImages(response.data.hits);
         }
      }
   };

   const clearSearch = () => {
      setSearchText("");
   };

   const handleSelectCategory = (category: string | null) => {
      clearSearch();
      setSlelectedCategory(category === null ? "" : category);
      setImages([]);
      setPage(1);
      if (category !== "") {
         fetchData(1, false, "", category!); // TODO : FIX this null check
      }
   };

   useEffect(() => {
      if (debouncedValue.length > 2) {
         setPage(1);
         setImages([]);
         setSlelectedCategory("");
         fetchData(page, false, debouncedValue);
      }
      if (debouncedValue.length === 0) {
         setPage(1);
         setImages([]);
         setSlelectedCategory("");
         fetchData(page, false);
      }
   }, [debouncedValue]);

   return (
      <AppContext.Provider
         value={{
            clearSearch,
            setSearchText,
            selectedCategory,
            images,
            handleSelectCategory,
            searchText,
            handlePresentModalPress,
            bottomSheetModalRef,
         }}>
         {children}
      </AppContext.Provider>
   );
};

export const useAppContext = () => {
   return useContext(AppContext);
};
