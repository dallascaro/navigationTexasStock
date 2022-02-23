import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Pages/Home";
import Events from "../Pages/Events";
import Profile from "../Pages/Profile";
import Services from "../Pages/Services";
import Settings from "../Pages/Settings";
import CreateEvent from "../Pages/CreateEvent";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};
const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Stack.Screen name="Events" component={Events} />
    </Stack.Navigator>
  );
};
const EventsStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Events" component={Events} options={{headerShown: false}} />
       
      </Stack.Navigator>
    );
  };
  const ProfileStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
        <Stack.Screen name = "CreateEvent" component={CreateEvent} options = {{headerShown: false}} />
      </Stack.Navigator>
    );
  };
  const ServicesStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Services" component={Services}  options={{headerShown: false}} />
      </Stack.Navigator>
    );
  };
  const SettingsStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Settings" component={Settings}  options={{headerShown: false}} />
      </Stack.Navigator>
    );
  };

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Events" 
      component={EventsStackNavigator} 
      options={{headerShown: false}}
      />
      <Tab.Screen name="Profile" 
      component={ProfileStackNavigator} 
      options={{headerShown: false}}
      />
      <Tab.Screen name="Services" 
      component={ServicesStackNavigator } 
      />
    </Tab.Navigator>
  );
};
export { MainStackNavigator, EventsStackNavigator, ProfileStackNavigator, ServicesStackNavigator, SettingsStackNavigator, TabNavigator };