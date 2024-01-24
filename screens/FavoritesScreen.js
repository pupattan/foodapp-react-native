import { Text, StyleSheet, View } from "react-native";
import MealsList from "../components/MealList/MealList";
import { useContext } from "react";
import { MEALS } from "../data/dummy-data";
import { FavoritesContext } from "../store/context/favorites-context";
import { useSelector, useDispatch } from "react-redux";
function FavoritesScreen() {
  //   const favoriteMealsContext = useContext(FavoritesContext);
  const favoriteMealsID = useSelector(
    (state) => state.favoriteMeals.ids // from store.js
  );
  const favoritemeals = MEALS.filter((meal) =>
    //favoriteMealsContext.ids.includes(meal.id)
    favoriteMealsID.includes(meal.id)
  );
  if (favoritemeals.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>No favorites</Text>
      </View>
    );
  }
  return <MealsList items={favoritemeals} />;
}
export default FavoritesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
