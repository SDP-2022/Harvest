import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
} from 'react-native';

import {
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryPie,
  VictoryAxis,
} from 'victory-native';

export default function PieChartPage({navigation}) {
  const [filterIsApplied, setFilterIsApplied] = useState(false);
  const [categories, setCategories] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [legend, setLegend] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState();
  const [selectedType, setSelectedType] = useState();
  let testData_0 = [
    ['January', ['Blueberry', 30], ['Blackberry', 10], ['Strawberry', 34]],
    ['February', ['Blueberry', 36], ['Blackberry', 17], ['Strawberry', 42]],
    ['March', ['Blueberry', 12], ['Blackberry', 20], ['Strawberry', 23]],
    ['April', ['Blueberry', 34], ['Blackberry', 34], ['Strawberry', 24]],
    ['May', ['Blueberry', 12], ['Blackberry', 12], ['Strawberry', 44]],
    ['June', ['Blueberry', 14], ['Blackberry', 53], ['Strawberry', 13]],
  ];

  let testData_1 = [
    ['Monday', ['Green Apple', 30], ['Red Apple', 10]],
    ['Tuesday', ['Green Apple', 36], ['Red Apple', 17]],
    ['Wednesday', ['Green Apple', 12], ['Red Apple', 20]],
    ['Thursday', ['Green Apple', 34], ['Red Apple', 34]],
    ['Friday', ['Green Apple', 12], ['Red Apple', 12]],
    ['Saturday', ['Green Apple', 12], ['Red Apple', 12]],
    ['Sunday', ['Green Apple', 14], ['Red Apple', 53]],
  ];

  // This function will process the data returned from the API
  const parseData = data => {
    let duration = data.length;
    let numberOfFoodItems = data[0].length - 1;

    let parseCategories = [];
    for (let i = 0; i < duration; i++) {
      parseCategories.push(data[i][0]);
    }

    // Will use a custom legend which will link to Atlas
    let parseLegend = [];
    for (let i = 0; i < numberOfFoodItems; i++) {
      parseLegend.push(data[0][i + 1][0]);
    }

    let parseValues = [];
    for (let i = 0; i < numberOfFoodItems; i++) {
      let list = [];
      for (let j = 0; j < duration; j++) {
        list.push({x: parseCategories[j], y: data[j][i + 1][1]});
      }
      parseValues.push(list);
    }
    return {
      parseCategories,
      parseLegend,
      parseValues,
      duration,
      numberOfFoodItems,
    };
  };

  const createObjects = data => {
    let {
      parseCategories,
      parseLegend,
      parseValues,
      duration,
      numberOfFoodItems,
    } = parseData(data);

    const objGraphData = [];

    for (let i = 0; i < numberOfFoodItems; i++) {
      let food = {
        name: parseLegend[i],
        harvestData: parseValues[i],
      };
      objGraphData.push(food);
    }
    setCategories(parseCategories);
    setGraphData(objGraphData);
    setLegend(parseLegend);
  };

  const renderPieChart = () => {
    createObjects(testData_0);
    setFilterIsApplied(!filterIsApplied);
  };

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.burgerView}>
        <TouchableOpacity onPress={navigation.openDrawer}>
          <Image
            style={{
              height: 20,
              width: 20,
            }}
            source={require('../assets/hamburger-icon.png')}
          />
        </TouchableOpacity>

        <View style={styles.filter}>
       
       <Modal
          animationType='slide'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
        >
        <View style={styles.Filter_View}>
          <View style={styles.Popup_View}>
          <Text style={{marginLeft: 20 , marginTop: 10 , color:'white'}}>Time Period</Text>
               
               <Picker
       
                 selectedValue={selectedPeriod}
                 style={{ height: 50, width: 190,backgroundColor:"grey",marginLeft:20  }}
                 onValueChange={(itemValue, itemIndex) => setSelectedPeriod(itemValue)}
               >
                 <Picker.Item label="Please select an option..." value='0' />
                 <Picker.Item label="1 Year" value='1' />
                 <Picker.Item label="6 Months" value='2'/>
                 <Picker.Item label="3 Months" value='3'/>
                 <Picker.Item label="1 Month" value='4'/>
                 <Picker.Item label="1 Week"  value='5'/>
 
               </Picker>

       
               <Text style={{marginLeft: 20 , marginTop: 5 , color:'white'}}>Level</Text>
       
       <Picker
          selectedValue={selectedType}
          style={{ height: 50, width: 190,backgroundColor:"grey",marginLeft:20  }}
          onValueChange={(itemValue, itemIndex) => setSelectedType(itemValue)}
       >
         <Picker.Item label="Please select an option..." value='0' />
         <Picker.Item label="Supertype" value='1'/>
         <Picker.Item label="Subtype" value='2'/>
         <Picker.Item label="Food" value='3'/>
     </Picker>
     <Text style={{marginLeft: 20 , marginTop: 5 ,  color:'white'}}>Produce</Text>
      <TextInput
        placeholde = 'produce'
        placeholderTextColor={'black'}
        style={{height: 50, width: 190,backgroundColor:"grey",marginLeft:20 }}
       >
      </TextInput>     
    

  <Pressable
    style={{backgroundColor:'#A1E8AF' ,width:150,height: 35, 
                borderRadius:15, marginTop: 10, marginLeft: 50
                ,marginBottom: 15}}
    onPress={() => {setModalVisible(!modalVisible);renderPieChart()} }
    >
    <Text style={{fontSize: 20 , marginLeft: 20, color:'black'}}>Apply Filter</Text>
    </Pressable>
      </View>
    </View>
  </Modal>

    <Pressable
      onPress={() => setModalVisible(true)}
    >
      <Image
          style={{
            height: 25,
            width: 25,
          }}
          source={require('../assets/filter.png')}
          />
    </Pressable>

   </View>

  </View>

      <View style={styles.chartView}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>This button is temporary (testing)</Text>

          <TouchableOpacity
           // style={styles.button}
           //</ScrollView> onPress={() => renderPieChart()}
           >
            <Text>Apply Filter</Text>
          </TouchableOpacity>

          {filterIsApplied ? (
            graphData.map(item => {
              return (
                <>
                  <Text style={styles.textHeading}>{item.name}</Text>
                  <VictoryPie
                    animate={{duration: 1000, easing: 'linear'}}
                    cornerRadius={({datum}) => datum.y * 0.5}
                    colorScale={[
                      '#A1E8AF',
                      '#4A7C59',
                      '#A5BE00',
                      '#717744',
                      '#245501',
                      '#73A942',
                      '#AAD576',
                      '#1A4301',
                      '#909955',
                      '#4F772D',
                      '#33772C',
                      '#132A13',
                    ]}
                    padding={{left: 75, right: 75}}
                    data={item.harvestData}
                  />
                </>
              );
            })
          ) : (
            <>
              <Text>Apply Filter Please</Text>
            </>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
 
 
  Filter_View: {
     justifyContent: 'center',
     alignItems: 'flex-end',
   },
   Popup_View: {
     margin:20,
     borderRadius:20,
     backgroundColor: 'black',
     width:250,
     alignItems: 'flex-start',
     shadowColor: "#000",
     shadowOffset: {
       width: 0,
       height: 5
  },
     shadowOpacity: 0.25,
     shadowRadius: 4,
     elevation: 5
  },
  filter:{
    marginTop:-20,
    height:0,
    width: 0,
    marginLeft: 350,
    backgroundColor: 'red',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  burgerView: {
    flex: 0.1,
    paddingTop: 20,
    marginLeft: 20,
    alignSelf: 'stretch',
  },
  chartView: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
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
    fontSize: 25,
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
