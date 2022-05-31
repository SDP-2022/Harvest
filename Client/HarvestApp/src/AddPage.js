import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useState, useEffect, useCallback } from 'react'; 
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity, TextInput} from 'react-native'; 
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ACCESS_TOKEN = '@save_token';

 export default function AddPage({navigation, route}){
  const {userIDToken, userAccessToken, authUsername, userID} = route.params;
  const [weightAmt, setWeightAmt] = useState("");
  const [foodtype, setFoodType] = useState("");
  const [remoteDataSet, setRemoteDataSet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [LogName, setLogName] = useState("");
  const [logID, setLogID] = useState();
  const logs = [];
  const objectlogs = [];
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
    for(let i = 0; i < objectlogs.length; i++){
      if(LogName == objectlogs[i].name){
        setLogID(objectlogs[i].id);
        submitData();
        alert("Produce added to " + LogName);
        break;
      }
      else{
        continue;
      }
    }
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

  async function getLogNames(){
    const response = await fetch("https://harvest-stalkoverflow.herokuapp.com/api/private/",{
    method:'GET',
        headers:{
          Authorization: 'Bearer ' + userAccessToken,
          RequestType: 'GetLogNames',
          userID: userID,
        },
  });
    const items = await response.json();
    
      for(let i = 0; i < items.length; i++){
        let log = items[i].Log_Name;
        let key = items[i].log_id;
        let object = {
        name : log,
        id: key
        };
        objectlogs.push(object);
        logs.push(items[i].Log_Name);
      }
  }
  getLogNames();
  
  

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
      <SelectDropdown
	      data={logs}
        defaultButtonText = {<Text style={styles.textDropDown}>Select log</Text>}
        buttonStyle = {styles.dropdownbuttonStyle}
        renderDropdownIcon={isOpened => {
          return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#808080'} size={15} />;
        }}
        dropdownIconPosition={'right'}
        dropdownStyle = {styles.dropdownStyle}
        onSelect={(selectedItem, index) => {
          setLogName(selectedItem)
          console.log(index)
        }}
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
  textDropDown: { 
    color: '#808080',
  },
  button: {
    margin: 15,
    padding: 15,
    width: 300,
    alignItems: 'center',
    alignSelf:'center',
    top:150,
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
  dropdownStyle:{
    borderWidth: 1,
    borderColor: '#A1E8AF',
    borderRadius: 30,
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
  dropdownbuttonStyle:{
    borderWidth: 1,
    borderColor: '#A1E8AF',
    borderRadius: 30,
    backgroundColor: "white", 
    alignSelf:"center",
    top:180
    
  },
  input_bottom:{
    borderWidth: 1,
    marginLeft: 45,
    marginRight:45,
    marginTop: 50,
    borderRadius: 30,
    padding: 15,
    bottom:50,
    borderColor: '#A1E8AF',
  },
 });