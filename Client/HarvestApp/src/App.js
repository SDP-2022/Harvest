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
import InitialPage from './InitialPage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: () => null
        }}
      >
        <Stack.Screen
          name="InitialPage"
          component={InitialPage}
        />
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
        />
        <Stack.Screen
          name="SignUpPage"
          component={SignUpPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
};

export default App;
