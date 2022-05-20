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
  Image
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  Button,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { color } from 'react-native-reanimated';

const ACCESS_TOKEN = '@save_token';


export default function AtlasPage({navigation, route}) {
  const {userIDToken, userAccessToken, authUsername, userID} = route.params;
  const [remoteDataSet, setRemoteDataSet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [foodtype, setFoodType] = useState("");

  //This is the variable passed from the graph/chart page:
  const {foodItem} = route.params;

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
      <View>
      <Image style = {styles.imageStyle}
      source={{
        uri: 'https://i.ibb.co/C5Vh9GQ/apple-fruit.jpg',
        method: 'GET'
      }}
      />
      </View>
      <Text style={{ 
        fontSize: 30,
        top: 40,
        fontWeight: "bold",
        color:"#808080",
        alignSelf:"center"
      }}> Apple
      </Text>
      <View>
      <Text style={{ 
        fontSize: 20,
        top: 50,
        color:"#808080",
        }}> Planting information:
        </Text>
      <Text style={{ 
        fontSize: 18,
        top: 60,
        color:"#808080",
        }}> When to sow:
        </Text>
        <Text style={{ 
        fontSize: 18,
        top: 60,
        color:"#808080",
        }}> When to plant:
        </Text>
        <Text style={{ 
        fontSize: 18,
        top: 60,
        color:"#808080",
        }}> When to harvest:
        </Text>
        <Text style={{ 
        fontSize: 18,
        top: 60,
        color:"#808080",
        }}> How much sunglight {"\n "}
         needed:
        </Text>
        <Text style={{ 
        fontSize: 18,
        top: 60,
        color:"#808080",
        }}> Needed pH of soil:
        </Text>
        <Text style={{ 
        fontSize: 20,
        top: -120,
        color:"#808080",
        alignSelf:"center",
        left:80,
        }}> User information:
        </Text>
        <Text style={{ 
        fontSize: 18,
        top: -100,
        color:"#808080",
        alignSelf:"center",
        left:82,
        }}> You have harvested {"\n "}
        x grams of Apple {"\n"} in one year.
        </Text>
      <View style = {styles.buttonView}> 
       <TouchableOpacity style = {styles.button}>
         <Text style = {styles.text}>View Graph</Text>
       </TouchableOpacity>
      </View>
      </View>
      <View>
        <View
        style={{
        borderBottomColor: '#A1E8AF',
        borderBottomWidth: 1.5,
        marginLeft:30,
        marginRight:30,
        top:-220,
        }}
        ></View>
        <View
        style={{
        height: '100%',
        width: 1.5,
        backgroundColor: '#A1E8AF',
        alignSelf: "center",
        top: -210,
        right:5
        }}
        ></View>
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
    fontSize: 20,
  },
  imageStyle:{
    width: 180, 
    height: 200,
    alignSelf:'center',
    top:30
  },
  button: {
    margin: 15,
    padding: 15,
    width: 150,
    height:55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: '#A1E8AF',
  },
  buttonView: { 
    flex: 1,
    alignItems: 'center',
    top:-90,
    left:90
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