import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import "react-native-gesture-handler";

// Import screen components
import HomeScreen from "./screens/HomeScreen";
import EmployeeScreen from "./screens/EmployeeScreen";
import AddScreen from "./screens/AddScreen";
import { EmployeeProvider } from "./components/EmployeeContext";

//import navigation stack and tabs
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Main screen
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Employees") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "Manage Employee") {
            iconName = focused ? "person-add" : "person-add-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      {/* //two main tabs and click it to the screen */}
      <Tab.Screen name="Employees" component={EmployeeScreen} />
      <Tab.Screen name="Manage Employee" component={AddScreen} />
    </Tab.Navigator>
  );
}

// App
export default function App() {
  return (
    //set up employee provider
    <EmployeeProvider>
      {/* set up navigation stack */}
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </EmployeeProvider>
  );
}
