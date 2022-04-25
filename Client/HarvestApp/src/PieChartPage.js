import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';


export default function PieChartPage({navigation}) {
    return (
        <SafeAreaView>
            <Text>This is the Pie Chart Page</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    body: {
      flex: 1,
    },
    headingView: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonView: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textHeading: {
      color: '#000',
      fontSize: 35,
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