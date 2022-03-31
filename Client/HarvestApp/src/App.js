/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {Node} from 'react';
import WelcomePage from './WelcomePage';
import GardenPage from './GardenPage';

const Stack = createNativeStackNavigator();

/*
All new pages should be added in the stack navigator below.
*/

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: () => null
        }}
      >
        <Stack.Screen
          name="WelcomePage"
          component={WelcomePage}
        />
        <Stack.Screen
          name="GardenPage"
          component={GardenPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
};

export default App;
