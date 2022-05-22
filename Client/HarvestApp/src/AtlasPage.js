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
  const [foodname, setFoodName] = useState("");
  const [image, setImage] = useState("");
  const [ph, setPH] = useState("");
  const [sun, setSun] = useState("");
  const [harvestTime, setHarvestTime] = useState("");
  const [sowTime, setSowTime] = useState("");
  const [plantTime, setPlantTime] = useState("");


  //This is the variable passed from the graph/chart page:
  const {foodItem} = route.params;
  /*
The getSuggestions method is used for the autocomplete, it will a
GET request to receive the information from the database and display it
in the drop-down list.
  */
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
    setLoading(false)
  }, [])

  const handleChange = (value) => {
    getSuggestions(value);
    setFoodType(value);
  }

  const handleSelectedChange = (value) =>{
    if(value){
      setFoodType(value.title);
      GetAtlasInformation(value.title);
    }
  }
/*
The GetAtlasInformation is used to get the atlass information 
*/
async function GetAtlasInformation(foodname){
  const response = await fetch("https://harvest-stalkoverflow.herokuapp.com/api/private/",{
    method:'GET',
    headers:{
      'Content-type': 'application/json',
      'Authorization' : 'Bearer '  + userAccessToken, // the authorization needed by Auth0 for the user 
      'RequestType' : "GetAtlas",
      'Foodname': foodname
    },
});

const items = await response.json();
setFoodName(items.Food_Name);
setImage(items.Image)
setPH(items.pH)
setSun(items.Sun)
setHarvestTime(items.Harvest_Time)
setSowTime(items.Sow_Time)
setPlantTime(items.Plant_Time)

}
const goToGardenPage = () => {
  console.log(foodtype + " - This is the foodtype from the atlas page")
  navigation.navigate('GardenNavigation', {
    screen: 'Bar Graphs',
    params: {
      userIDToken: userIDToken, userAccessToken: userAccessToken, authUsername: authUsername, userID: userID, foodType: foodname
    }
  })
};
console.disableYellowBox = true; // this code is used to block the warning messages that display on the page, they are not of any concern.
if (!foodtype){ // this statement is used set the default page. 
  GetAtlasInformation("Almond");
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
        uri: image,
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
      }}> {foodname}
      </Text>
      <View>
      <Text style={{ 
        fontSize: 20,
        top: 50,
        fontWeight:"600",
        textDecorationLine:"underline",
        alignSelf:"center",
        fontStyle:"italic",
        color:"#808080",
        }}> Planting information:
        </Text>
      <Text style={{ 
        fontSize: 17,
        top: 50,
        left:253,
        textAlign:"left",
        color:"#808080",
        }}> When to sow:{"\n"} {sowTime}
        </Text>
        <Text style={{ 
        fontSize: 17,
        top: 50,
        left:253,
        textAlign:"left",
        color:"#808080",
        }}> When to plant:{"\n"} {plantTime}
        </Text>
        <Text style={{ 
        fontSize: 17,
        top: 50,
        textAlign:"left",
        color:"#808080",
        }}> When to harvest: {harvestTime}
        </Text>
        <Text style={{ 
        fontSize: 17,
        bottom:60,
        textAlign:"left",
        color:"#808080",
        }}> How much sunglight {"\n "}
         needed: {sun}
        </Text>
        <Text style={{ 
        fontSize: 17,
        bottom:60,
        textAlign:"left",
        color:"#808080",
        }}> Needed pH of soil: {" \n"} {ph}
        </Text>
        <Text style={{ 
        fontSize: 20,
        color:"#808080",
        fontWeight:"600",
        textDecorationLine:"underline",
        alignSelf:"center",
        fontStyle:"italic",
        bottom:40,
        }}> User information:
        </Text>
        <Text style={{ 
        fontSize: 18,
        color:"#808080",
        textAlign:"left",
        bottom:38,
        }}> You have harvested x grams of {foodname} in one year.
        </Text>
        <View style = {styles.buttonView}> 
       <TouchableOpacity style = {styles.button}  onPress={() => {
         goToGardenPage();
         console.log(foodname + " Is this blank")
        }}> 
         <Image
         style={{
          height: 20,
          width: 20,
        }}
         source={require('../assets/bar-graph-icon.png')}
         />
       </TouchableOpacity>
      </View>
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
    width: 250, 
    height: 200,
    alignSelf:'center',
    top:30
  },
  button: {
    margin: 15,
    padding: 15,
    width: 50,
    height:50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: '#A1E8AF',
  },
  buttonView: { 
    left:330,
    bottom:330,
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