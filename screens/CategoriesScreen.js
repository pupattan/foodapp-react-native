import { FlatList, View, StyleSheet } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import CategoryGridTitle from "./CategoryGridTile";

function renderItemHandler(itemData, navigation) {
  function onPressHandler() {
    navigation.navigate("MealsOverview", { categoryId: itemData.item.id });
  }

  return (
    <CategoryGridTitle
      color={itemData.item.color}
      title={itemData.item.title}
      onPress={onPressHandler}
    />
  );
}
function CategoryScreen({ navigation }) {
  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => renderItemHandler(itemData, navigation)}
      numColumns={2}
      horizontal={false}
    />
  );
}
export default CategoryScreen;
