import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {
  Text,
  Image,
  View,
} from 'react-native';


import AtlasPage from './AtlasPage';
import GardenNavigation from './GardenNavigation';
import AddPage from './AddPage';

// This file is responsible for adding all appropriate pages to the navigation bar

const Tab = createBottomTabNavigator();

export default function Navigation({navigation, route}) {
  const {userIDToken, userAccessToken, authUsername, userID} = route.params;

  // A new page can be added between the Tab.Screen tags

  return (
    <Tab.Navigator
    screenOptions={{
        tabBarHideOnKeyboard: true,
        header: () => null,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          height: 80,
          paddingBottom: 50
        }
      }
    }
  
    >
      <Tab.Screen
        name="GardenNavigation"
        component={GardenNavigation}
        initialParams={{userIDToken: userIDToken, userAccessToken : userAccessToken, authUsername: authUsername, userID : userID}}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <Image 
                source={require('../assets/log-icon.png')} 
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#A1E8AF' : '#000'
                }}
              />
              <Text style={{color: focused ? '#A1E8AF' : '#000', fontSize: 12, top: 5}}>GARDEN</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="AddPage"
        component={AddPage}
        initialParams={{userIDToken: userIDToken, userAccessToken: userAccessToken, authUsername: authUsername, userID : userID}}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <Image 
                source={require('../assets/add-icon.png')} 
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#A1E8AF' : '#000'
                }}
              />
              <Text style={{color: focused ? '#A1E8AF' : '#000', fontSize: 12, top: 5}}>ADD</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="AtlasPage"
        component={AtlasPage}
        initialParams={{userIDToken: userIDToken, userAccessToken: userAccessToken, authUsername: authUsername, userID : userID}}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <Image 
                source={require('../assets/atlas-icon.png')} 
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#A1E8AF' : '#000'
                }}
              />
              <Text style={{color: focused ? '#A1E8AF' : '#000', fontSize: 12, top: 5}}>ATLAS</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}