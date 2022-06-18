// ./navigation/DrawerNavigator.js

import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { ContactStackNavigator } from "./StackNavigator";
import { MainStackNavigator,TabNavigator, SettingsStackNavigator, } from "./StackNavigator";


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={MainStackNavigator} options={{headerShown: false, swipeEnabled: false}} />
      <Drawer.Screen name="EventsT" component={TabNavigator} options={{headerShown: false}}/>
      <Drawer.Screen name ="Settings" component={SettingsStackNavigator} options={{headerShown: false}}/>
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;