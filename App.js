import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AddScreen from './component/AddScreen';
import HomeScreen from "./component/HomeScreen";
import Details from "./component/Details";
import Login from "./component/Login";
import API from "./component/API";
import { Provider } from "react-redux";
import { store } from "./store";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";




const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();
let persistor = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Main} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}



const Main = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          let iconName;
          if (route.name == "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name == "Détails") {
            iconName = focused ? "eye-sharp" : "eye-outline";
          } else if (route.name == "api") {
            iconName = focused ? "globe" : "globe-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "grey",
      })}
    >
      <Tabs.Screen name="Home" component={HomeScreen} initialParams={{ addData: null }} />
      <Tabs.Screen
        name="Détails"
        component={Details}
      />
      <Tabs.Screen
        name="api"
        component={API}>

      </Tabs.Screen>
    </Tabs.Navigator>
  );

}



export default App;