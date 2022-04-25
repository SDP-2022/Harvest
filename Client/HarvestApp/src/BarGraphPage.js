import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';


import {
  VictoryBar,
  VictoryChart,
  VictoryGroup,
} from 'victory-native';

export default function BarGraphPage({navigation}) {
  let testData_0 = [
    ['January', ['Blueberry', 30], ['Blackberry', 10], ['Strawberry', 34]],
    ['February', ['Blueberry', 36], ['Blackberry', 17], ['Strawberry', 42]],
    ['March', ['Blueberry', 12], ['Blackberry', 20], ['Strawberry', 23]],
    ['April', ['Blueberry', 34], ['Blackberry', 34], ['Strawberry', 24]],
    ['May', ['Blueberry', 12], ['Blackberry', 12], ['Strawberry', 44]],
    ['June', ['Blueberry', 14], ['Blackberry', 53], ['Strawberry', 13]]
  ];

  let testData_1 = [
    ['Monday', ['Green Apple', 30], ['Red Apple', 10]],
    ['Tuesday', ['Green Apple', 36], ['Red Apple', 17]],
    ['Wednesday', ['Green Apple', 12], ['Red Apple', 20]],
    ['Thursday', ['Green Apple', 34], ['Red Apple', 34]],
    ['Friday', ['Green Apple', 12], ['Red Apple', 12]],
    ['Saturday', ['Green Apple', 12], ['Red Apple', 12]],
    ['Sunday', ['Green Apple', 14], ['Red Apple', 53]]
  ];

  // This function will process the data returned from the API
  const parseData = (data) => {
    let duration = data.length;
    let numberOfFoodItems = data[0].length - 1;
    
    let categories = [];
    for (let i = 0; i < duration; i++) {
      categories.push(data[i][0]);
    }

    // Will use a custom legend which will link to Atlas
    let legend = [];
    for (let i = 0; i < numberOfFoodItems; i++) {
      legend.push(data[0][i+1][0]);
    }

    let values = []
    for (let i = 0; i < numberOfFoodItems; i++) {
      let list = [];
      for (let j = 0; j < duration; j++) {
        list.push({x: categories[j], y: data[j][i+1][1]});
      }
      values.push(list);
    }

    return {categories, legend, values, duration, numberOfFoodItems};
  }

  const createObjects = (data) => {
    let {categories, legend, values, duration, numberOfFoodItems} = parseData(data);

    const graphData = [];

    for (let i = 0; i < numberOfFoodItems; i++) {
      let food = {
        name: legend[i],
        harvestData: values[i]
      }
      graphData.push(food);
    }
    console.log(graphData);
  } 

  createObjects(testData_0);

  // Working on it :)
  const createBarGraph = () => {
    return 1;
  }

  return (
    <SafeAreaView style={styles.body}>
      <Text>This is the Bar Graph Page</Text>

      <VictoryChart domainPadding={30}>
        <VictoryGroup offset={20} colorScale={["#A1E8AF", "#4DA87D", "#32612D"]}>
        <VictoryBar
            categories={{
              x: ['January', 'February', 'March', 'April', 'May', 'June'],
            }}
            data={[10, 17, 20, 34, 12, 53, 21]}
          />
          <VictoryBar
            categories={{
              x: ['January', 'February', 'March', 'April', 'May', 'June'],
            }}
            data={[30, 36, 12, 34, 12, 14, 13]}
          />
        </VictoryGroup>
      </VictoryChart>
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
