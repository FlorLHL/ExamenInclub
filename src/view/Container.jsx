import * as React from "react";
import { Image } from "react-native";
import CreateScreen from "./screens/CreateScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import icons from "../constants/icons";
import { Navigation } from "../pages/Navigation";

const homeName = "Home";
const detailsName = "Crear";
// const profileScreen = "Perfil";

const Tab = createBottomTabNavigator();
function Container() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "grey",
          tabBarLabelStyle: {
            paddingBottom: 2,
            paddingTop: 5,
            fontSize: 14,
            fontWeight: "bold",
          },
          tabBarStyle: [
            {
              display: "flex",
            },
            null,
          ],
          tabBarIcon: ({ color }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = icons.home;
            } else if (rn === detailsName) {
              iconName = icons.filter;
            }
            // else if (rn === profileScreen) {
            //   iconName = icons.profile;
            // }
            return (
              <Image
                source={iconName}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: color,
                }}
              />
            );
          },
        })}
      >
        <Tab.Screen name={homeName} component={Navigation} />
        <Tab.Screen name={detailsName} component={CreateScreen} />
        {/* <Tab.Screen name={profileScreen} component={ProfileScreen} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Container;
