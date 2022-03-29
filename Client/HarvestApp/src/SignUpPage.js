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

export default function SignUpPage({navigation}) {

    const toLogin = () => {
      navigation.navigate("LoginPage")
    }
  
    return(
      <View>
        <Text>Sign Up Here!</Text>
        <TouchableOpacity onPress={toLogin}> 
          <Text>Already have an account? Login!</Text>
        </TouchableOpacity>
      </View>
    )
  }

