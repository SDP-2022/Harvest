import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Auth0 from 'react-native-auth0';
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

const auth0 = new Auth0({
  domain: 'dev-q8h6rzir.us.auth0.com',
  clientId: 'M3DKab5D4L1TS1MvCwYf2I1dPfpKhlWV',
});

export default function WelcomePage({navigation}) {
  let [accessToken, setAccessToken] = useState(null);
  let [idToken, setIDToken] = useState(null);
  let [username, setUsername] = useState(null);

  // Keeping this function for later :)
  // const onLogout = () => {
  //   auth0.webAuth
  //     .clearSession({})
  //     .then(success => {
  //       Alert.alert('Logged out!');
  //       setAccessToken(null);
  //     })
  //     .catch(error => {
  //       console.log('Log out cancelled');
  //     });
  // };

  const toGarden = () => {
    navigation.navigate('GardenPage', {userIDToken: idToken, authUsername: username})
  }

  // This function gets the user profile from
  // Auth0 to get their username.
  const getUserProfile = (accTok, _callback) => {
    auth0.auth
      .userInfo({token: accTok})
      .then(Json => {
        setUsername(String(Json['https://dev-q8h6rzir:us:auth0:com/username']))
        _callback();
      })
      .catch(console.error);
  }

  // Function to log in the user
  const onLogin = async (_callback) => {
    auth0.webAuth
      .authorize({
        scope: 'openid profile email',
      })
      .then(credentials => {
        setAccessToken(credentials.accessToken);
        setIDToken(credentials.idToken);
        console.log("Completed Login")
        _callback();
      })
      .catch(error => console.log(error));
  };

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.headingView}>
        <Text style={styles.textHeading}>Harvest</Text>
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity 
        onPress={async () => {
          await onLogin(function(){
            console.log(idToken);
            console.log(accessToken);
            getUserProfile(accessToken, function(){
              toGarden();
            })
          })
          } 
        }
        style={styles.button}
        >
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
      </View>
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
    textTransform: 'uppercase',
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
