import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useState } from 'react'; 
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity, TextInput} from 'react-native'; 

const ACCESS_TOKEN = '@save_token';

 export default function AddPage({navigation, route}){
  const {userIDToken, userAccessToken, authUsername, userID} = route.params;
  const [foodType, setFoodType] = useState("");
  const [weightAmt, setWeightAmt] = useState("");

  
  const submitData = async()=>{
    fetch("https://harvest-stalkoverflow.herokuapp.com/api/private/",{
        method:'POST',
        headers:{
          'Content-type': 'application/json',
          'Authorization' : 'Bearer '  + userAccessToken,
          'RequestType' : "AddFoodLog"
        },
        body:JSON.stringify({
          UserID : userID,
	        FoodName : foodType,
	        Weight : Number(weightAmt)      
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

const checkTextInput = () => {
  if(!foodType.trim() || !weightAmt.trim()){
    alert("Please enter all fields")
    }
  else{
    submitData();
    alert("Produce added to your log.")
  }
  };

  return (
    <SafeAreaView style = {styles.body}>
      <TextInput style = {styles.input_top} placeholder = 'Search for you item here' onChangeText={(value) => setFoodType(value)}/>
      <TextInput style = {styles.input_bottom} placeholder = 'Weight in grams' onChangeText={(value) => setWeightAmt(value)}/>
      <View style = {styles.buttonView}> 
       <TouchableOpacity style = {styles.button} onPress = {() => checkTextInput()}>
         <Text style = {styles.text}>Add Item</Text>
       </TouchableOpacity>
      </View>
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
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: '#A1E8AF',
  },
  buttonView: { 
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  input_top:{
    borderWidth: 1,
    marginLeft: 45,
    marginRight:45,
    marginTop: 200,
    borderRadius: 30,
    padding: 10,
    borderColor: '#A1E8AF',
  },
  input_bottom:{
    borderWidth: 1,
    marginLeft: 45,
    marginRight:45,
    marginTop: 50,
    borderRadius: 30,
    padding: 10,
    borderColor: '#A1E8AF',
  },
 });