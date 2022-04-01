import {NavigationContainer} from '@react-navigation/native';
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

import AtlasPage from './AtlasPage';
import GardenPage from './GardenPage';

const Tab = createBottomTabNavigator();

export default function Navigation({navigation, route}) {
  const {userIDToken, authUsername} = route.params;
  console.log(userIDToken);
  console.log(authUsername);

  return (
    <Tab.Navigator
    screenOptions={{
        header: () => null
      }}
    >
      <Tab.Screen
        name="GardenPage"
        component={GardenPage}
        initialParams={{userIDToken: userIDToken, authUsername: authUsername}}
      />
      <Tab.Screen
        name="AtlasPage"
        component={AtlasPage}
        initialParams={{userIDToken: userIDToken, authUsername: authUsername}}
      />
    </Tab.Navigator>
  );
}