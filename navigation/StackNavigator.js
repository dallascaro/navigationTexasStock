import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Pages/Home";
import Events from "../Pages/Events";
import Profile from "../Pages/Profile";
import Services from "../Pages/Services";
import Settings from "../Pages/Settings";
import CreateEvent from "../Pages/CreateEvent";
import CreateBrand from "../Pages/CreateBrand";
import Comments from "../Pages/Comments";
import Reports from '../Pages/Reports';
import Products from '../Pages/Products';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { db, writeUserData } from "../firebase";
import { collection, getDocs, addDoc, doc, setDoc } from "firebase/firestore/lite";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const PullData = async () => {
  const myDoc = collection(db, 'BarNotification')
  const snapShot = await getDocs(myDoc);
  const snapList = snapShot.docs.map(doc => doc.data());
}

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
        <Stack.Screen name="Events1" component={Events} options={{headerShown: false}} />
        <Stack.Screen name = "Comments" component={Comments} options={{headerShown: false}} />
        <Stack.Screen name = "Reports" component={Reports} options={{headerShown: false}} />
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
        <Stack.Screen name="Products" component={Products}  options={{headerShown: false}} />
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
        ),headerShown: false}}
      />
      <Tab.Screen name="ProfileT" 
      component={ProfileStackNavigator} 
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home-account" color={color} size={size} />
        ),headerShown: false,}}
      />
      <Tab.Screen name="ServicesT" 
      component={ServicesStackNavigator }
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="hammer-wrench" color={color} size={size} />
        ),headerShown: false}}
      />
    </Tab.Navigator>
  );
};


export { MainStackNavigator, EventsStackNavigator, ProfileStackNavigator, ServicesStackNavigator, SettingsStackNavigator, TabNavigator};