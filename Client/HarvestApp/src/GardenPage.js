import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {Node, useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  Button,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const ACCESS_TOKEN = '@save_token';

export default function GardenPage({navigation, route}) {
  const {userIDToken, userAccessToken, authUsername, userID} = route.params;

  // This function is used for testing
  const getVar = async() => {
    console.log(userAccessToken);
    return fetch(
      'https://harvest-stalkoverflow.herokuapp.com/api/private/',
      {
        method: 'GET',
        headers: {
          'Authorization' : 'Bearer '  + userAccessToken
        },
      },
    ).then((response) => response.text())
    .then((text)=>{
      console.log(text)
    })
    .catch((error)=>{
      console.log(error)
    })
  };

  // This function gets the log for the current user
  const getLog = async() => {
    return fetch(
      'https://harvest-stalkoverflow.herokuapp.com/api/private/',
      {
        method: 'GET', 
        headers: {
          'Authorization' : 'Bearer ' + userAccessToken,
          'RequestType' : 'GetHarvestLogs',
          'UserID' : 'A1'
        },
      },
    ).then((response) => response.json())
    .then((json) => {
      return json
    })
    .catch((error) => {
      console.log(error)
    })
  };

  // This function gets the weight of a specific food item
  const getWeight = async(foodname) => {
    return fetch(
      'https://harvest-stalkoverflow.herokuapp.com/api/private/',
      {
        method: 'GET',
        headers: {
          'Authorization' : 'Bearer ' + userAccessToken,
          'RequestType' : 'GetFoodTotalWeight',
          'UserID' : userID,
          'FoodName' : foodname
        }
      }
    ).then((response) => response.text())
    .then((text) => {
      console.log(text)
    })
    .catch((error) => {
      console.log(error)
    })
  };

  // This array contains dummy data
  const [Food, setFood] = useState([]);
  const [FoodLen, setFoodLen] = useState(0);
  const [Loading, setLoading] = useState(true);

  // This ensures the appropriate functions run when the screen is accessed
  useEffect(() => {
    getLog()
    .then((json) => {
      setLoading(false)
      console.log(json)
      setFood(json)
      setFoodLen(Object.keys(json).length)
    })
  }, []);
  

  if (Loading == true) {
    return(
      <SafeAreaView style={styles.body}>
        <ActivityIndicator size="large" color="#A1E8Af"/>
      </SafeAreaView>
    )
  }
  else if (Loading == false && FoodLen == 0) {
    return (
      <SafeAreaView style={styles.body}>
        <Text style={styles.text}>You haven't harvested anything</Text>
        <Text style={styles.text}>¯\_(ツ)_/¯</Text>
      </SafeAreaView>
    )
  }
  else if (Loading == false && FoodLen > 0) {
  return (
    <SafeAreaView style={styles.body}>

      <View style={styles.textView}>
          <Text style={styles.userText}>Hey User</Text>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
        data={Food}
        ListHeaderComponent={()=>
          <View style={styles.header}>
            <Text style={styles.text}>Your Garden:</Text>
          </View>
        }
        renderItem={({item}) => (
          <View style={styles.foodView}>
            <Text style={styles.foodViewText}>{item.Food_Name}</Text>
            <Text style={styles.foodViewText}>
              Weight: {item.Weight}g
            </Text>
            <Text style={styles.foodViewText}>Date: {item.Date_Logged.slice(0, 10)}</Text>
          </View>
        )}
      />

    </SafeAreaView>
  );
        }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  textView: {
    flex: 0.1,
    alignSelf: 'stretch',
  },
  flatList: {
    flex: 2,
    marginBottom: 50
  },
  text: {
    color: '#000',
    fontSize: 25
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  userText: {
    color: '#000',
    marginLeft: 20,
    fontSize: 20,
    textAlign: 'left'
  },
  foodView: {
    width: 300,
    height: 125,
    margin: 10,
    padding: 10,
    backgroundColor: '#A1E8Af',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodViewText: {
    color: '#000',
    fontSize: 15,
  },
});