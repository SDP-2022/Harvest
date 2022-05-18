
import React from 'react';
import {useState, useRef, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
} from 'react-native';



export default function AtlasPage({navigation, route}) {
  const {userIDToken, userAccessToken, authUsername, userID} = route.params;
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <SafeAreaView style={{flex: 1,  alignItems: 'center', backgroundColor: '#fff'}}>
      {/* searchbox */}
      <View style={styles.first_view}>
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

    <Text style={{fontSize:20, fontStyle:'italic',color:'black'}}>Fruits</Text>
    <View style={styles.container}>

      <TouchableOpacity onPress={() => setModalOpen(true)}>
        <View style={styles.square} />
      </TouchableOpacity >
      
       <Modal visible={modalOpen} animationType="fade" transparent={true} >
      <SafeAreaView style={styles.modalView}>
        
        <View>
        <TouchableOpacity onPress={() => setModalOpen(false)}>
              <Image
                style={{
                  height: 15,
                  width: 15,
                 // marginLeft: 310,
                  //marginBottom: 50,
                }}
                source={require('../assets/close-icon.png')}
              />
            </TouchableOpacity>
        </View>
        <TouchableOpacity >
          <View style={{borderWidth:1,borderRadius:10,width:90,height:50,justifyContent:'center',
           alignItems: 'center',borderColor: '#A1E8AF',marginTop:500}}>
          <Text style={{fontSize:20}}>See log</Text>
          </View>
         
        </TouchableOpacity>
      </SafeAreaView>
      </Modal> 
      
       
      </View>
  
    
 
     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "flex-start", // ignore this - we'll come back to it
    justifyContent: "center", // ignore this - we'll come back to it
    flexDirection: "row",
   //position:'absolute',
  
  },
  square: {
    backgroundColor: "grey",
    width: 100,
    borderRadius: 10,
    height: 100,
    margin: 4,
  },
 
  first_view:{
    backgroundColor:'#A1E8AF',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
modalView: {
  alignSelf: 'center',
  flex: 1,
  //justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',
  height: 100,
  width: 380,
  borderRadius: 30,
  marginTop: '0%',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 0.5,
  },
  shadowOpacity: 0.4,
  shadowRadius: 3,
  elevation: 5,
},
});