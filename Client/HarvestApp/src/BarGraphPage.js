import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Auth0 from 'react-native-auth0';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  Alert,
  ActivityIndicator,
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

export default function BarGraphPage({navigation}) {
    return (
        <SafeAreaView>
            <Text>This is the Bar Graph Page</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    body: {
      flex: 1,
    },
    headingView: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonView: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textHeading: {
      color: '#000',
      fontSize: 35,
    },
    text: {
      color: '#000',
      fontSize: 25,
    },
    button: {
      margin: 15,
      padding: 15,
      width: 300,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 30,
      backgroundColor: '#A1E8AF',
    },
  });