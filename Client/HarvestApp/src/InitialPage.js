import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
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

export default function InitialPage({navigation}) {
  const toLogin = () => {
    navigation.navigate('LoginPage');
  };

  const toSignUp = () => {
    navigation.navigate('SignUpPage');
  };

  return (
    <View style={styles.body}>
      <View style={styles.headingView}>
        <Text style={styles.textHeading}>Harvest</Text>
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity onPress={toLogin} style={styles.button}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toSignUp} style={styles.button}>
          <Text style={styles.text}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    justifyContent: 'center'
  },
  textHeading: {
    color: '#000',
    fontSize: 35,
    textTransform: 'uppercase'
  },
  text: {
    color: '#000',
    fontSize: 25
  },
  button: {
      bottom: 100,
      margin: 15,
      padding: 15,
      width: 200,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      backgroundColor: '#A1E8AF'
  }
});
