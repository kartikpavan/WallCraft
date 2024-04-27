import { Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import { theme } from "@/constants/theme";
import MaterialIcon from "@expo/vector-icons/MaterialIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CategoryList from "@/components/CategoryList";
import ImageList from "@/components/ImageList";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./home.styles";
import { useAppContext } from "@/context/AppContext";

const HomeScreen = () => {
   const { clearSearch, images, searchText, setSearchText } = useAppContext();

   const { top } = useSafeAreaInsets();
   const paddingTop = top > 0 ? top + 20 : 0;
   return (
      <View style={[styles.mainContainer, { paddingTop }]}>
         {/* Header */}
         <View style={styles.header}>
            <Text style={styles.title}>WallCraft</Text>
            <Pressable>
               <MaterialIcon name="menu-open" size={30} color={theme.colors.text} />
            </Pressable>
         </View>
         {/* SearchBar */}
         <View>
            <View style={styles.searchContainer}>
               <Ionicons name="search" size={24} color="#9fb9d0" style={styles.icon} />
               <TextInput
                  style={styles.input}
                  value={searchText}
                  onChangeText={setSearchText}
                  placeholder="Search..."
                  placeholderTextColor="#9fb9d0"
                  autoCorrect={true}
               />
               {searchText ? (
                  <TouchableOpacity onPress={clearSearch} style={styles.icon}>
                     <Ionicons name="close" size={24} color="#9fb9d0" />
                  </TouchableOpacity>
               ) : null}
            </View>
         </View>
         {/* Category List */}
         <View>
            <CategoryList />
         </View>
         <View>
            {/* Images List */}
            {images.length > 0 ? <ImageList /> : null}
         </View>
      </View>
   );
};

export default HomeScreen;
