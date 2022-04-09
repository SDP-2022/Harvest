import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
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
  TouchableOpacity,
  FlatList,
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
    ).then((response) => response.text())
    .then((text) => {
      console.log(text)
    })
    .catch((error) => {
      console.log(error)
    })
  };

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

  const readData = async () => {
    try {
      const userTok = await AsyncStorage.getItem(ACCESS_TOKEN)
      console.log(userTok)
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }

  // This array contains dummy data
  const [Food, setFood] = useState([
    {key: '1', food: 'Cabbage', weight: '1kg', date: '01/04/2022'},
    {key: '2', food: 'Onions', weight: '2kg', date: '02/03/2022'},
    {key: '3', food: 'Tomatoes', weight: '500g', date: '01/03/2022'},
    {key: '4', food: 'Strawberries', weight: '200g', date: '01/03/2022'},
    {key: '5', food: 'Bananas', weight: '450g', date: '19/01/2022'},
    {key: '6', food: 'Grapes', weight: '100g', date: '09/02/2022'},
    {key: '7', food: 'Spinach', weight: '50g', date: '09/01/2022'},
    {key: '8', food: 'Grapefruit', weight: '200g', date: '09/01/2022'},
    {key: '9', food: 'Oranges', weight: '1kg', date: '09/02/2022'},
    {key: '10', food: 'Lemons', weight: '500g', date: '09/02/2022'},
  ]);

  

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.textView}>
          <Text style={styles.text}>Hey {authUsername}</Text>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
        data={Food}
        ListHeaderComponent={()=>
          <View style={styles.user}>
          <Text style={styles.text}>Your Garden:</Text>
        </View>
        }
        renderItem={({item}) => (
          <View style={styles.foodView}>
            <Text style={styles.foodViewText}>{item.food}</Text>
            <Text style={styles.foodViewText}>
              Amount Harvested: {item.weight}
            </Text>
            <Text style={styles.foodViewText}>Date Harvested: {item.date}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  textView: {
    flex: 0.1,
  },
  flatList: {
    flex: 2,
  },
  text: {
    color: '#000',
    fontSize: 25,
  },
  user: {
    alignItems: 'center',
    justifyContent: 'center',
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