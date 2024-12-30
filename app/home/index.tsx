import CategoryList from "@/components/CategoryList";
import FilterModel from "@/components/FilterModel";
import ImageList from "@/components/ImageList";
import { theme } from "@/constants/theme";
import { useDebounce } from "@/hooks/useDebounce";
import { useDataStore } from "@/store/data.store";
import { useFilterStore } from "@/store/filter.store";
import { useSearchStore } from "@/store/search.store";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcon from "@expo/vector-icons/MaterialIcons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./home.styles";

const HomeScreen = () => {
  const { searchQuery, updateSearchQuery, clearSearchQuery } = useSearchStore((state) => state);
  const { filters, setCategory, category } = useFilterStore((state) => state);
  const { fetchData, setImages, images, changePageNumber, resetPageNumber, page } = useDataStore(
    (state) => state
  );
  const debouncedValue = useDebounce(searchQuery, 600);
  const scrollRef = useRef<ScrollView | null>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isEndReached, setIsEndReached] = useState(false);

  const handleScrollToTop = () => {
    scrollRef?.current?.scrollTo({ x: 0, y: 0, animated: true });
  };

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleInfiniteScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    const scrollOffset = event.nativeEvent.contentOffset.y;
    const bottomPosition = contentHeight - scrollViewHeight;

    if (scrollOffset >= bottomPosition) {
      if (!isEndReached) {
        setIsEndReached(true);
        changePageNumber();
        fetchData({
          page: page + 1,
          searchQuery: debouncedValue,
          append: true,
          category: category !== null ? category : "",
          ...filters,
        });
      }
    } else if (isEndReached) {
      setIsEndReached(false);
    }
  };

  useEffect(() => {
    setImages([]);
    setCategory(null);
    fetchData({
      page: 1,
      searchQuery: debouncedValue.length > 2 ? debouncedValue : "",
      append: false,
    });
  }, [debouncedValue]);

  useEffect(() => {
    resetPageNumber();
  }, [category, filters]);

  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 20 : 0;
  return (
    <View style={[styles.mainContainer, { paddingTop }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title} onPress={handleScrollToTop}>
          WallCraft
        </Text>
        <Pressable onPress={handlePresentModalPress} style={{ position: "relative" }}>
          {Object.keys(filters).length > 0 && <View style={styles.indicator} />}
          <MaterialIcon name="filter-list" size={30} color={theme.colors.text} />
        </Pressable>
      </View>
      <ScrollView onScroll={handleInfiniteScroll} scrollEventThrottle={5} ref={scrollRef}>
        {/* SearchBar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={24} color="#9fb9d0" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={searchQuery}
            onChangeText={updateSearchQuery}
            placeholder="Search..."
            placeholderTextColor="#9fb9d0"
            autoCorrect={true}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={clearSearchQuery} style={styles.icon}>
              <Ionicons name="close" size={24} color="#9fb9d0" />
            </TouchableOpacity>
          ) : null}
        </View>
        {/* Category List */}
        <View>
          <CategoryList />
        </View>
        {/* Images List */}
        {images?.length > 0 ? <ImageList /> : null}
        {/* Loading */}
        <View style={{ marginBottom: 50, marginTop: images?.length > 0 ? 10 : 50 }}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      </ScrollView>

      {/* Filter Bottom Sheet*/}
      <FilterModel filterRef={bottomSheetModalRef} />
    </View>
  );
};

export default HomeScreen;
