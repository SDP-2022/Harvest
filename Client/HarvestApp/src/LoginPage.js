import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  Button,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default function LoginPage({navigation}) {

    const toSignUp = () => {
      navigation.navigate("SignUpPage")
    }
  
    return(
      <View>
        <Text>Login Here!</Text>
        <TouchableOpacity onPress={toSignUp}> 
          <Text>Don't have an account? Sign Up!</Text>
        </TouchableOpacity>
      </View>
    )
  }

