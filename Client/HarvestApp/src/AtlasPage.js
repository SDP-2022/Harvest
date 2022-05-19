import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Node, useState, useCallback } from 'react';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import AtlasBody from '../shared/AtlasBody';

import SearchBox from '../shared/searchbox'
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

const ACCESS_TOKEN = '@save_token';


export default function AtlasPage({navigation, route}) {
  const {userIDToken, userAccessToken, authUsername, userID} = route.params;
  const [remoteDataSet, setRemoteDataSet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [foodtype, setFoodType] = useState("");

  const getSuggestions = useCallback(async q => {
    const filterToken = q.toLowerCase()
    //console.log('getSuggestions', filterToken)
    if (typeof q !== 'string' || q.length < 3) {
      setRemoteDataSet(null)
      return
    }
    setLoading(true)
    const response = await fetch("https://harvest-stalkoverflow.herokuapp.com/api/private/",{
      method:'GET',
          headers:{
            'Content-type': 'application/json',
            'Authorization' : 'Bearer '  + userAccessToken,
            'RequestType' : 'GetAllFoodNames'
          },
    })
    .then(
      data =>
        new Promise(res => {
          setTimeout(() => res(data), 2000) // imitate of a long response
        })
    )
    const items = await response.json()
    //console.log(items[0])

    const suggestions = items
      .filter(item => item.Food_Name.toLowerCase().includes(filterToken))
      .map(item => ({
        id: item.Food_Name,
        title: item.Food_Name
      }))
    setRemoteDataSet(suggestions)
    console.log(suggestions)
    setLoading(false)
  }, [])

  const handleChange = (value) => {
    getSuggestions(value);
    setFoodType(value);
  }

  const handleSelectedChange = (value) =>{
    if(value){
      setFoodType(value.title);
    }
  }

  
  return (
    <SafeAreaView style={styles.body}>
       <View>
      <AutocompleteDropdown
        dataSet={remoteDataSet}
        closeOnBlur={false}
        useFilter={false}
        clearOnFocus={false}
        inputContainerStyle = {styles.inputContainerStyle}
        suggestionsListContainerStyle = {styles.suggestionsListContainerStyle}
        textInputProps={{
          placeholder: 'Search for your item here',
          placeholderTextColor: "#808080",
          style: {
            color: "black"
          }
        }}
        onSelectItem={handleSelectedChange}
        loading={loading}
        onChangeText={(value) => handleChange(value)}
        suggestionsListTextStyle={{
          color: 'black'
        }}
        EmptyResultComponent={<Text style={{ padding: 10, fontSize: 15 }}>Oops ¯\_(ツ)_/¯</Text>}
      />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  suggestionsListContainerStyle:{
    flex:1,
    marginTop: 5,
    borderRadius: 25,
    padding: 1,
  },
  inputContainerStyle:{
    borderWidth: 1,
    marginLeft: 45,
    marginRight:45,
    marginTop: 10,
    borderRadius: 25,
    right:30,
    padding: 1,
    borderColor: '#A1E8AF',
    backgroundColor: "white",
  },
});