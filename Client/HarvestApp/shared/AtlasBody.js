
import React from 'react';

import {
  
  StyleSheet,
  Image,
  View,
 Text,
} from 'react-native';

export default function AtlasBody({navigation, route}) {
  return (
    <View style= {styles.first_view}>
      
        <View style={styles.second_view}>
        <Image
            
            style={styles.img}
            source={{uri:'https://images.unsplash.com/photo-1562695530-ca03c4b98623?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=326&q=80'}} ></Image> 
        </View>
               
            
        <View style={styles.third_view}>

          
            <Text style= {styles.info}>Nutrional Info</Text>
         

            <View style={styles.fourth_view} >
                <Text>alpha-lipoic acid</Text>
                <Text>lycopene</Text>
                <Text>choline</Text>
                <Text>folic acid</Text>
                <Text>beta-carotene</Text>
                <Text>lutein</Text>
            </View>
            
           
              <Text style= {styles.info}>Planting Info</Text>
            
          
          
            <View style={styles.fifth_view}>
                <Text>Tomato plants are tender warm-season.</Text>
                <Text>Tomatoes take 60 days to more than 100 days to harvest.</Text>
                <Text> harvest.</Text>
            </View>
        </View>
       
     
       
    </View>
  );
};

const styles = StyleSheet.create({
    first_view:{
       flex: 1,
    },
    second_view:{
     // justifyContent: 'center',
    },
    third_view:{
     
    },
    fourth_view:{
      borderRadius:10,
      borderWidth:1,
      margin:25,
      alignItems:'center',
      backgroundColor:'#A1E8AF',
    }, 
    fifth_view:{
      borderRadius:10,
      borderWidth:1,
      alignItems:'center',
      margin:25,
      backgroundColor:'#A1E8AF',
    }, 
    img:{
        width:250,
        height: 250,
        borderRadius:20,
        marginTop:10,
      
    },
    info:{
      fontSize: 20,
      alignItems: 'center',
      justifyContent:'center',
    },
});