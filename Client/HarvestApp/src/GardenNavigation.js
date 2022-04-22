import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
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

import GardenPage from './GardenPage.js';
import BarGraphPage from './BarGraphPage.js';
import PieChartPage from './PieChartPage.js';

const Drawer = createDrawerNavigator();

export default function GardenNavigation({navigation, route}) {
  const {userIDToken, userAccessToken, authUsername, userID} = route.params;

  const CustomDrawer = props => {
    return (
      <View style={{flex: 1}}>
        <DrawerContentScrollView {...props}>
          <Text style={{color: '#000', fontSize: 20, marginLeft: 20}}>
            Hey {authUsername}
          </Text>
          <View style={{flex: 1, paddingTop: 30}}>
            <DrawerItemList {...props} />
          </View>
        </DrawerContentScrollView>
      </View>
    );
  };

  return (
    <Drawer.Navigator
      initialRouteName="GardenPage"
      screenOptions={{headerShown: false}}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Garden Log"
        component={GardenPage}
        initialParams={{
          userIDToken: userIDToken,
          userAccessToken: userAccessToken,
          authUsername: authUsername,
          userID: userID,
        }}
        options={{
          drawerActiveTintColor: '#000',
          drawerInactiveTintColor: '#000',
          drawerActiveBackgroundColor: '#A1E8Af',
          drawerIcon: () => (
            <Image
              style={{
                height: 20,
                width: 20,
              }}
              source={require('../assets/log-list-icon.png')}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Bar Graphs"
        component={BarGraphPage}
        initialParams={{
          userIDToken: userIDToken,
          userAccessToken: userAccessToken,
          authUsername: authUsername,
          userID: userID,
        }}
        options={{
          drawerActiveTintColor: '#000',
          drawerInactiveTintColor: '#000',
          drawerActiveBackgroundColor: '#A1E8Af',
          drawerIcon: () => (
            <Image
              style={{
                height: 20,
                width: 20,
              }}
              source={require('../assets/bar-graph-icon.png')}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Pie Charts"
        component={PieChartPage}
        initialParams={{
          userIDToken: userIDToken,
          userAccessToken: userAccessToken,
          authUsername: authUsername,
          userID: userID,
        }}
        options={{
          drawerActiveTintColor: '#000',
          drawerInactiveTintColor: '#000',
          drawerActiveBackgroundColor: '#A1E8Af',
          drawerIcon: () => (
            <Image
              style={{
                height: 20,
                width: 20,
              }}
              source={require('../assets/pie-chart-icon.png')}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
