import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useState, useEffect, useCallback } from 'react'; 
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity, TextInput} from 'react-native'; 
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ACCESS_TOKEN = '@save_token';

 export default function AddPage({navigation, route}){
  const {userIDToken, userAccessToken, authUsername, userID} = route.params;
  const [weightAmt, setWeightAmt] = useState("");
  const [foodtype, setFoodType] = useState("");
  const [remoteDataSet, setRemoteDataSet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [LogName, setLogName] = useState("");
  const [logID, setLogID] = useState();
  const [LogInfo, setLogInfo] = useState([]);


  const submitData = async()=>{ // this code is used to make a post request to the database and save the data on the database
    fetch("https://harvest-stalkoverflow.herokuapp.com/api/private/",{
        method:'POST',
        headers:{
          'Content-type': 'application/json',
          'Authorization' : 'Bearer '  + userAccessToken, // the authorization needed by Auth0 for the user 
          'RequestType' : "AddFoodLog" 
        },
        body:JSON.stringify({
          UserID : userID,
	        FoodName : foodtype,
	        Weight : Number(weightAmt),
          LogID: String(logID)
        })
    })
    .then(res=>res.text())
    .then(text=>{
        console.log(text)
        console.log("Success")
    })
    .catch(error=>{
      console.log(error)
      console.log("Failure")
  });
}

const checkTextInput = () => { // this method is used to check if the fields are empty, if they are the process will not go through
  if(!foodtype.trim() || !weightAmt.trim() || !LogName.trim()){
    alert("Please enter all fields")
    }
  else{
      submitData();
      alert("Produce added to " + LogName);
    }
  };

  const handleChange = (value) => {
    getSuggestions(value);
    setFoodType(value);
  }

  const handleSelectedChange = (value) =>{
    if(value){
      setFoodType(value.title);
    }
  }

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

  const getLogInfo = async () => { // this function is used to get the log names and log ids 
    return fetch('https://harvest-stalkoverflow.herokuapp.com/api/private', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + userAccessToken,
        RequestType: 'GetLogNames',
        userID: userID,
      },
    })
      .then(response => response.json())
      .then(json => {
        return json;
      })
      .catch(error => {
        console.log(error);
      });
  };

  const parseLogName = json => {
      let logList = [];
      for (let i = 0; i < json.length; i++) {
        let name = json[i].Log_Name;
        let id = json[i].log_id;
        let object = {
          log_id: id,
          log_name : name,
        };
        logList.push(object);
      } 
      return logList;
      //setlogName(logList);
  }

  useEffect(() => {
    getLogInfo().then(json =>{
      setLogInfo(parseLogName(json));
   });
  }, []);
  
  console.log(LogName)
  console.log(logID)

  return (
    <SafeAreaView style = {styles.body}>
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
        <Dropdown
          placeholder="Select log"
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          containerStyle = {styles.dropdownContainerStyle}
          iconStyle={styles.iconStyle}
          data={LogInfo}
          search = {false}
          maxHeight={300}
          labelField="log_name"
          value={LogName}
          onChange={item => {
            setLogName(item.log_name);
            setLogID(item.log_id)
          }}
          renderItem = {(item) => (
            <Text>{item.log_name}</Text>
           )}
        />
      <TextInput style = {styles.input_bottom} placeholder = 'Weight in grams' placeholderTextColor={"#808080"} onChangeText={(value) => setWeightAmt(value)}/>
       <TouchableOpacity style = {styles.button} onPress = {() => checkTextInput()}>
         <Text style = {styles.text}>Add Item</Text>
       </TouchableOpacity>
    </SafeAreaView>
  )
 }

 const styles = StyleSheet.create({ 
  body: {
    flex: 1,
    backgroundColor: '#fff'
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
    alignSelf:'center',
    top:100,
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: '#A1E8AF',
  },
  buttonView: { 
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  suggestionsListContainerStyle:{
    flex:1,
    marginTop: 110,
    borderRadius: 30,
    padding: 10,
  },
  inputContainerStyle:{
    borderWidth: 1,
    marginLeft: 45,
    marginRight:45,
    marginTop: 100,
    borderRadius: 30,
    padding: 10,
    borderColor: '#A1E8AF',
    backgroundColor: "white",
  },
  input_bottom:{
    borderWidth: 1,
    marginLeft: 45,
    marginRight:45,
    marginTop: 50,
    borderRadius: 30,
    padding: 15,
    bottom:30,
    borderColor: '#A1E8AF',
  },
  dropdown: {
    borderWidth: 1,
    margin: 16,
    height: 50,
    borderRadius:30,
    borderColor: '#A1E8AF',
    marginLeft:45,
    marginRight:45,
    padding: 15,
    top:10
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 25,
    height: 25,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  dropdownContainerStyle: {
    borderWidth: 1,
    borderRadius:30,
    borderColor: '#A1E8AF',
    padding: 15,
  },
 });