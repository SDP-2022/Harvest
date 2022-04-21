import {NavigationContainer} from '@react-navigation/native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from "@react-navigation/drawer";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Node, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  Button,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import GardenPage from "./GardenPage.js";
import BarGraphPage from "./BarGraphPage.js";
import PieChartPage from "./PieChartPage.js";

const Drawer = createDrawerNavigator();

export default function GardenNavigation({navigation, route}) {

    const {userIDToken, userAccessToken, authUsername, userID} = route.params;
  
    return (
        <Drawer.Navigator 
          initialRouteName="GardenPage"
        >
          <Drawer.Screen 
            name="GardenPage" 
            component={GardenPage} 
            initialParams={{userIDToken: userIDToken, userAccessToken : userAccessToken, authUsername: authUsername, userID : userID}}
          />
          <Drawer.Screen 
            name="BarGraphPage" 
            component={BarGraphPage} 
            initialParams={{userIDToken: userIDToken, userAccessToken : userAccessToken, authUsername: authUsername, userID : userID}}
          />
          <Drawer.Screen 
            name="PieChartPage"
            component={PieChartPage}
            initialParams={{userIDToken: userIDToken, userAccessToken : userAccessToken, authUsername: authUsername, userID : userID}}
          />
        </Drawer.Navigator>
    );
  }