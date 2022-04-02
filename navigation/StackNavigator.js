import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Pages/Home";
import Events from "../Pages/Events";
import Profile from "../Pages/Profile";
import Services from "../Pages/Services";
import Settings from "../Pages/Settings";
import CreateEvent from "../Pages/CreateEvent";
import CreateBrand from "../Pages/CreateBrand";
import BussHome from "../Pages/BussHome";
import BussProfile from "../Pages/BussProfile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
      <Stack.Screen name="BussHome" component={BussHome} options={{headerShown: false}} />
        <Stack.Screen name="BussProfile" component={BussProfile} options={{headerShown: false}}/>
      
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

  const BussStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="BussProfile" component={BussProfile} options={{headerShown: false}}/>
        <Stack.Screen name = "CreateBrand" component={CreateBrand} options = {{headerShown: false}} />
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
      <Tab.Screen name="EventsT" 
      component={EventsStackNavigator} 
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="car" color={color} size={size} />
        ),headerShown: false, tabBarBadge: '5'}}
      />
      <Tab.Screen name="Profile" 
      component={ProfileStackNavigator} 
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home-account" color={color} size={size} />
        ),headerShown: false,  tabBarBadge: '2'}}
      />
      <Tab.Screen name="Services" 
      component={ServicesStackNavigator }
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="hammer-wrench" color={color} size={size} />
        ),headerShown: false,  tabBarBadge: '3'}}
      />
    </Tab.Navigator>
  );
};

const BussTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="EventsTB" 
      component={EventsStackNavigator} 
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="car" color={color} size={size} />
        ),headerShown: false, tabBarBadge: '5'}}
      />
      <Tab.Screen name="BussProfile" 
      component={BussStackNavigator} 
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home-account" color={color} size={size} />
        ),headerShown: false,  tabBarBadge: '2'}}
      />
    </Tab.Navigator>
  );
};
export { MainStackNavigator, EventsStackNavigator, ProfileStackNavigator, BussStackNavigator, ServicesStackNavigator, SettingsStackNavigator, TabNavigator, BussTabNavigator };