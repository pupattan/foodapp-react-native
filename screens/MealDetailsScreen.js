import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useLayoutEffect, useContext } from "react";
import List from "../components/MealDetail/List.js";
import MealDetails from "../components/MealDetails.js";
import { MEALS } from "../data/dummy-data.js";
import Subtitle from "../components/MealDetail/SubTitle.js";
import IconButton from "../components/IconButton.js";
import { FavoritesContext } from "../store/context/favorites-context.js";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../store/redux/favorites.js";
function MealDetailsScreen({ route, navigation }) {
  const mealId = route.params.mealId;
  const favoriteMealsID = useSelector(
    (state) => state.favoriteMeals.ids // from store.js
  );
  const dispatch = useDispatch();
  // const favoriteMealsContext = useContext(FavoritesContext);
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);
  //const mealInFavorite = favoriteMealsContext.ids.includes(mealId);
  const mealInFavorite = favoriteMealsID.includes(mealId);

  function headerButtonPressHandler() {
    if (mealInFavorite) {
      dispatch(removeFavorite({ id: mealId }));
      // favoriteMealsContext.removeFavorites(mealId);
    } else {
      dispatch(addFavorite({ id: mealId }));
      // favoriteMealsContext.addFavorites(mealId);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon={mealInFavorite ? "star" : "star-outline"}
            color="white"
            onPress={headerButtonPressHandler}
          />
        );
      },
    });
  }, [navigation, headerButtonPressHandler]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
}

export default MealDetailsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listOuterContainer: {
    alignItems: "center",
  },
  listContainer: {
    width: "80%",
  },
});
