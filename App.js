import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Import screen components
import HomeScreen from "./screens/HomeScreen";
import EmployeeScreen from "./screens/EmployeeScreen";
import AddScreen from "./screens/AddScreen";
import { EmployeeProvider } from "./components/EmployeeContext";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Employees") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "Add Employee") {
            iconName = focused ? "person-add" : "person-add-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Employees" component={EmployeeScreen} />
      <Tab.Screen name="Add Employee" component={AddScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <EmployeeProvider>
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
