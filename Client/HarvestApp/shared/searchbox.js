import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {Node, useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  Button,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen'
export default function SearchBox({navigation, route}) {
  return (
    <View style= {styles.first_view}>
     
        <View style={styles.style_input}>
        <Image style={styles.search_icon} source={require('../assets/search.png')}></Image>
            <TextInput
               placeholder='Plant name....'
               placeholderTextColor={'white'}
                style={styles.search_plant}
            >
              
            </TextInput>
          
        </View>
           
        
      <View style={styles.second_view}>
      <Image style={styles.sort_icon} source={require('../assets/sort.png')}></Image>
      <Image style={styles.filter_icon} source={require('../assets/filter.png')}></Image>
      </View>
       
     
       
    </View>
  );
};

const styles = StyleSheet.create({
    first_view:{
        backgroundColor:'#A1E8AF',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft:100,
        paddingRight:150,
       
    },
    search_icon:{
        width:20,
        height:20,
        marginTop: 15,
        marginLeft: 15,
    },
    second_view:{
      flexDirection: 'row',
      marginLeft: 15,
  
     // backgroundColor:'black',

    },
   style_input:{
   
    flexDirection: 'row',  
    borderRadius:20,
    borderWidth:1,
    backgroundColor:'grey',
    marginLeft: 50,
    
    
   },
   search_plant:{
       marginHorizontal:10,
       width: 200,
   } ,
  
   
    sort_icon:{
        marginTop: 15,
        marginRight:10,
        marginLeft:15,
        width:20,
        height:20,
    },
    filter_icon:{
      marginTop: 15,
      marginLeft:15,
      width:20,
      height:20,
    },

});