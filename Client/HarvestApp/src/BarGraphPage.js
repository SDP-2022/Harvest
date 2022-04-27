import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryAxis,
} from 'victory-native';

export default function BarGraphPage({navigation}) {
  const [filterIsApplied, setFilterIsApplied] = useState(false);
  const [categories, setCategories] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [legend, setLegend] = useState([]);

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

  const renderBarGraph = () => {
    createObjects(testData_1);
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
      </View>
      <View style={styles.graphView}>
        <Text>This button is temporary (testing)</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => renderBarGraph()}>
          <Text>Apply Filter</Text>
        </TouchableOpacity>

        {filterIsApplied ? (
          <VictoryChart
            domainPadding={20}
            animate={{duration: 1000, easing: 'linear'}}>
            <VictoryGroup
              offset={10}
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
              ]}>
              {graphData.map(item => {
                return (
                  <VictoryBar
                    categories={{
                      x: categories,
                    }}
                    data={item.harvestData}
                  />
                );
              })}
            </VictoryGroup>
            <VictoryAxis dependentAxis />
            <VictoryAxis
              style={{tickLabels: {angle: 30, transform: 'translate(3, 4)'}}}
            />
          </VictoryChart>
        ) : (
          <Text>Apply Filter Please</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  graphView: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
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
