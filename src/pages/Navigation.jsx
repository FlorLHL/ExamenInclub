import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../view/screens/HomeScreen";
import { Profile } from "./Profile";

// export type RootStackParams = {
//   HomeScreen: undefined;
//   DetailScreen: undefined;
//   ActorDetailScreen: { actor: Cast };
//   QRScanScreen: undefined;
//   SearchScreen: undefined;
// };

const Stack = createStackNavigator();

export const Navigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};
