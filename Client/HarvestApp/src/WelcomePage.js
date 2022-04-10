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

const auth0 = new Auth0({
  audience: "https://harvest-stalkoverflow.herokuapp.com/",
  domain: 'dev-q8h6rzir.us.auth0.com',
  clientId: 'M3DKab5D4L1TS1MvCwYf2I1dPfpKhlWV',
});

// Keeping this for later
const ACCESS_TOKEN = '@save_token';

export default function WelcomePage({navigation}) {
  let accessToken, idToken, username, user_id, loginsCount, email;

  // Keeping this function for later as well
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

  // Change to Navigation.js, which will show the user their log (GardenPage.js)
  const toNavigation = async () => {
    navigation.navigate('Navigation', {userIDToken: idToken, userAccessToken: accessToken, authUsername: username, userID : user_id})
  }

  // Add a user to the database 
  const addUserToDatabase = async () => {
    console.log(user_id)
    console.log(JSON.stringify({
      UserID : user_id,
      Username : username,
      Email : email
    }))
    fetch(
      'https://harvest-stalkoverflow.herokuapp.com/api/private/',
      {
        method: 'POST',
        headers: {
          'Authorization' : 'Bearer ' + accessToken,
          'RequestType' : 'AddUser',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          UserID : user_id,
          Username : username,
          Email : email
        })
      }
    ).then((response) => response.text())
    .then((text) => {
      console.log(text)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  // Update the date_last_accessed field in the database
  const addLoginToDatabase = async () => {
    fetch(
      'https://harvest-stalkoverflow.herokuapp.com/api/private/',
      {
        method: 'POST',
        headers: {
          'Authorization' : 'Bearer ' + accessToken,
          'RequestType' : 'LoginUser',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'UserID' : user_id
        })
      }
    ).then((response) => response.text())
    .then((text) => {
      console.log(text)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  // Checks whether it is a user's first time using the app
  // and calls the appropriate function
  const addToDatabase = async (_callback) => {
    if (loginsCount == 1) {
      await addUserToDatabase();
    }
    else if (loginsCount != 1) {
      await addLoginToDatabase();
    }
    _callback();
  }

  // This function gets the user profile from
  // Auth0 to get their username, user_id, email and 
  // login count
  const getUserProfile = async (accTok, _callback) => {
    auth0.auth
      .userInfo({token: accTok})
      .then(Json => {
        username = String(Json['https://dev-q8h6rzir:us:auth0:com/username']);
        user_id = String(Json['https://dev-q8h6rzir:us:auth0:com/user_id']);
        loginsCount = parseInt(Json['https://dev-q8h6rzir:us:auth0:com/loginsCount'])
        email = String(Json['email']);
        _callback();
      })
      .catch(console.error);
  }

  // Function to log in the user
  const onLogin = async(_callback) => {
    auth0.webAuth
      .authorize({
        audience: "https://harvest-stalkoverflow.herokuapp.com/",
        scope: 'openid profile email',
      })
      .then(credentials => {
        accessToken = credentials.accessToken;
        idToken = credentials.idToken;
        _callback();
      })
      .catch(error => console.log(error));
  };

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.headingView}>
        <Text style={styles.textHeading}>
          <Text>stalk</Text>
          <Text style={{fontWeight: "bold"}}>overflow</Text>
        </Text>
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity 
        onPress={async () => {
          await onLogin(async function() {
            await getUserProfile(accessToken, async function() {
              await addToDatabase(async function() {
                await toNavigation();
              });
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