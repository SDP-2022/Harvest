
import React from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';


export default function SearchBox({navigation, route}) {
  return (
    <View style= {styles.first_view}>
      
        <View style={styles.style_input}>
        <Icon size={20} name='search' style= {styles.search}></Icon>
            <TextInput  
            placeholder='Plant name....'
            placeholderTextColor={'white'}
            style={styles.search_plant}
            >
              
            </TextInput>
          
        </View>
           
        
      <View style={styles.second_view}>
      <Icon size={35} name='sort' style={styles.sort}></Icon>
        <Icon size={35} name='filter' style={styles.filter}></Icon>
      </View>
       
     
       
    </View>
  );
};

const styles = StyleSheet.create({
    first_view:{
        backgroundColor:'#A1E8AF',
        justifyContent: 'space-between',
        flexDirection: 'row',
       
    },
    second_view:{
      flexDirection: 'row',
      marginRight: 15,
  
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
   search:{
    marginTop: 15,
    marginLeft: 20,
      
   },
    input:{
        
    },
    sort:{
        marginTop: 8,
        marginRight:10,
    },
    filter:{
      marginTop: 8,
    },

});