
import React from 'react';

import  SearchBox from '../shared/searchbox'; 
import AtlasBody from '../shared/AtlasBody';
import {
 
  StyleSheet,

} from 'react-native';



export default function AtlasPage({navigation, route}) {
  const {userIDToken, userAccessToken, authUsername, userID} = route.params;

  return (
   <> 
    <SearchBox/>
   <AtlasBody/>
   </>
  
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  buttonView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});