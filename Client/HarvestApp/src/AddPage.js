import React from 'react'; 
 import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity, TextInput } from 'react-native'; 
 
 const AddPage = () => {
   return (
     <SafeAreaView style = {styles.body}>
       <TextInput style = {styles.input_top} placeholder = 'Search for you item here'/>
       <TextInput style = {styles.input_bottom} placeholder = 'Weight in grams'/>
       <View style = {styles.buttonView}> 
        <TouchableOpacity style = {styles.button}>
          <Text style = {styles.text}>Add Item</Text>
        </TouchableOpacity>
       </View>
     </SafeAreaView>
   )
 }
 export default AddPage;

 const styles = StyleSheet.create({ 
  body: {
    flex: 1,
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