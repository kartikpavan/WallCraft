import { fetchImages } from "@/api";
import { useDebounce } from "@/hooks/useDebounce";
import { PixabayImage } from "@/types/types";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import {
   createContext,
   useContext,
   useState,
   useEffect,
   useRef,
   useCallback,
   createRef,
} from "react";
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView } from "react-native";

type AppContextType = {
   setSearchText: (searchText: string) => void;
   clearSearch: () => void;
   handleSelectCategory: (category: string | null) => void;
   handlePresentModalPress: () => void;
   resetFilters: () => void;
   handleFilterSelect: (filterName: string, selectedItem: string) => void;
   handleApplyFilters: () => void;
   selectedCategory: string | null;
   images: PixabayImage[];
   searchText: string;
   bottomSheetModalRef: React.RefObject<BottomSheetModal>;
   selectedFilters: object;
   handleScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

const AppContext = createContext<AppContextType>({
   setSearchText: () => {},
   clearSearch: () => {},
   handleSelectCategory: () => {},
   handlePresentModalPress: () => {},
   resetFilters: () => {},
   handleFilterSelect: () => {},
   handleApplyFilters: () => {},
   selectedCategory: "",
   images: [],
   searchText: "",
   bottomSheetModalRef: createRef<BottomSheetModalMethods>(),
   selectedFilters: {},
   handleScroll: () => {},
});
let page = 1;
export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
   const [searchText, setSearchText] = useState<string>("");
   const [selectedCategory, setSlelectedCategory] = useState<string | null>(null);
   const [images, setImages] = useState<PixabayImage[]>([]);
   const [selectedFilters, setSelectedFilters] = useState({});
   const debouncedValue = useDebounce(searchText, 600);
   const bottomSheetModalRef = useRef<BottomSheetModal>(null);
   const [isEndReached, setIsEndReached] = useState(false);

   const handlePresentModalPress = useCallback(() => {
      bottomSheetModalRef.current?.present();
   }, []);

   const fetchData = async (
      page: number,
      append = false,
      searchQuery = "",
      category: string = "",
      selectedFilters = {}
   ) => {
      const params = { category, searchQuery, page, append: true, ...selectedFilters };
      const response = await fetchImages(params);
      if (response?.success && response?.data.hits) {
         if (append) {
            setImages([...images, ...response.data.hits]);
         } else {
            setImages(response.data.hits);
         }
      }
   };

   const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const contentHeight = event.nativeEvent.contentSize.height;
      const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
      const scrollOffset = event.nativeEvent.contentOffset.y;
      const bottomPosition = contentHeight - scrollViewHeight;

      if (scrollOffset >= bottomPosition) {
         if (!isEndReached) {
            setIsEndReached(true);
            ++page;
            if (debouncedValue.length > 2) {
               fetchData(page, true, debouncedValue, selectedCategory!, { ...selectedFilters });
            }
            if (selectedCategory !== "") {
               fetchData(page, true, debouncedValue, selectedCategory!, { ...selectedFilters });
            }
            fetchData(page, true, debouncedValue, selectedCategory!, { ...selectedFilters });
         }
      } else if (isEndReached) {
         setIsEndReached(false);
      }
   };

   const clearSearch = () => {
      setSearchText("");
   };

   // CATEGORIES
   const handleSelectCategory = (category: string | null) => {
      clearSearch();
      setSlelectedCategory(category === null ? "" : category);
      setImages([]);
      page = 1;
      if (category !== "") {
         fetchData(page, false, "", category!, { ...selectedFilters });
      }
   };

   // FILTERS
   const handleFilterSelect = (filterName: string, selectedItem: string) => {
      setSelectedFilters((prevFilters: any) => ({
         ...prevFilters,
         [filterName]: selectedItem,
      }));
   };

   const handleClearFilters = () => {
      if (Object.keys(selectedFilters).length > 0) {
         page = 1;
         setImages([]);
         setSelectedFilters({});
         fetchData(page, false, debouncedValue, selectedCategory!);
      }
      // Close the Bottom sheet
      bottomSheetModalRef.current?.close();
   };

   const handleApplyFilters = () => {
      // Checking if any filter is selected
      if (Object.keys(selectedFilters).length > 0) {
         page = 1;
         setImages([]);
         const newSelectedFilters = { ...selectedFilters };
         fetchData(page, false, debouncedValue, "", newSelectedFilters);
      }
      // Close the Bottom sheet
      bottomSheetModalRef.current?.close();
   };

   useEffect(() => {
      if (debouncedValue.length > 2) {
         page = 1;
         setImages([]);
         setSlelectedCategory("");
         fetchData(page, false, debouncedValue);
      }
      if (debouncedValue.length === 0) {
         page = 1;
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
            handleApplyFilters,
            resetFilters: handleClearFilters,
            selectedFilters,
            handleFilterSelect,
            handleScroll,
         }}>
         {children}
      </AppContext.Provider>
   );
};

export const useAppContext = () => {
   return useContext(AppContext);
};
