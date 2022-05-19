import React, {useState, useRef, useEffect} from 'react';

import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';

import {
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryAxis,
} from 'victory-native';

import SelectDropdown from 'react-native-select-dropdown';

export default function BarGraphPage({navigation, route}) {
  // Here, the appropriate variables and arrays are declared
  const {userIDToken, userAccessToken, authUsername, userID} = route.params;

  const [filterIsApplied, setFilterIsApplied] = useState(false);
  const [renderGraph, setRenderGraph] = useState(false);
  const [dateLabels, setDateLabels] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const produceRef = useRef({});
  const TimePeriods = [
    'One Year',
    'Six Months',
    'Three Months',
    'One Month',
    'One Week',
  ];
  const Levels = ['Superdupertype', 'Supertype', 'Type', 'Subtype', 'Food'];
  const Supertypes = ['Vegetable', 'Fruit', 'Herb', 'Flower'];
  const Types = [
    'Allium',
    'Berry',
    'Citrus',
    'Cruciferous',
    'Cucurbit',
    'False Fruit',
    'Flower',
    'Leaf',
    'Legume',
    'Nightshade',
    'Nut',
    'Pome Fruit',
    'Root',
    'Seed',
    'Soft Herb',
    'Stalk',
    'Stone Fruit',
    'Vine Fruit',
    'Hard Herb',
  ];
  const Subtypes = [
    'Almond',
    'Apple',
    'Artichoke',
    'Aubergine',
    'Basil',
    'Bean',
    'Beetroot',
    'Blackberry',
    'Blueberry',
    'Broccoli',
    'Cabbage',
    'Carrot',
    'Cauliflower',
    'Celery',
    'Chilli',
    'Chive',
    'Coriander',
    'Cucumber',
    'Curry Leaf',
    'Edible Flower',
    'Fennel',
    'Fig',
    'Ginger',
    'Gooseberry',
    'Granadilla',
    'Grape',
    'Grapefruit',
    'Jerusalem Artichoke',
    'Kale',
    'Kei Apple',
    'Leek',
    'Lemon',
    'Lemon Balm',
    'Lemon Verbena',
    'Lettuce',
    'Lime',
    'Marjoram',
    'Mint',
    'Mustard Leaf',
    'Naartjie',
    'Nasturtium',
    'Onion',
    'Orange',
    'Oregano',
    'Parsley',
    'Pea',
    'Peach',
    'Pepper',
    'Plum',
    'Pumpkin',
    'Radish',
    'Rhubarb',
    'Rosemary',
    'Sage',
    'Sorrel',
    'Spinach',
    'Squash',
    'Strawberry',
    'Sunflower Seed',
    'Sweet Potato',
    'Thyme',
    'Tomato',
    'Turmeric',
    'Turnip',
    'Zucchini',
  ];

  const Food = [
    'Almond',
    'Apple (Golden Delicious)',
    'Apple (Granny Smith)',
    'Artichoke',
    'Aubergine',
    'Basil',
    'Bean (Broad)',
    'Bean (Flat)',
    'Bean (Green)',
    'Bean (Yellow)',
    'Bean (Black)',
    'Bean (Black-Eyed)',
    'Bean (Purple)',
    'Beetroot',
    'Blackberry',
    'Blueberry',
    'Broccoli',
    'Butternut Squash',
    'Cabbage (Chinese)',
    'Cabbage (Purple)',
    'Carrot',
    'Cauliflower',
    'Cavolo Nero',
    'Celery',
    'Chilli (Birdseye)',
    'Chilli (Serrano)',
    'Chive',
    'Coriander',
    'Cucumber',
    'Curry Leaf',
    'Edible Flower',
    'Fennel',
    'Fig (Green)',
    'Fig (Purple)',
    'Gem Squash',
    'Ginger',
    'Gooseberry',
    'Granadilla',
    'Grape (Catawba)',
    'Grape (Hanepoot)',
    'Grape (Victoria)',
    'Grapefruit (Ruby)',
    'Jerusalem Artichoke',
    'Kale',
    'Kei Apple',
    'Leek',
    'Lemon',
    'Lemon Balm',
    'Lemon Verbena',
    'Lettuce',
    'Lime',
    'Marjoram',
    'Mint',
    'Mustard Leaf',
    'Naartjie',
    'Nasturtium',
    'Onion (Red)',
    'Onion (White)',
    'Orange (Cara Cara)',
    'Orange (Valencia)',
    'Oregano',
    'Parsley',
    'Pea',
    'Peach (White)',
    'Peach (Yellow)',
    'Pepper (Green California Wonder)',
    'Pepper (Red Santorini)',
    'Plum (Yellow)',
    'Plum (Red)',
    'Plum (Purple)',
    'Plum (Purple Leaf)',
    'Pumpkin (Boerpampoen)',
    'Pumpkin (Queensland Blue)',
    'Radish',
    'Rhubarb',
    'Rosemary',
    'Sage',
    'Shallot',
    'Sorrel',
    'Spinach',
    'Strawberry',
    'Sunflower Seed',
    'Sweet Potato (White)',
    'Sweet Potato (Orange)',
    'Thyme',
    'Tomato (Cherry)',
    'Tomato (Costoluto)',
    'Tomato (Floradade)',
    'Tomato (Moneymaker)',
    'Tomato (St. Pierre)',
    'Tomato (Yellow Baby)',
    'Turmeric',
    'Turnip',
    'Zucchini (Green)',
  ];

  const [timePeriod, setTimePeriod] = useState(null);
  const [level, setLevel] = useState(null);
  const [produce, setProduce] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // This function requests data from the API to generate the graph
  const getData = async () => {
    let headerLevel, headerTime, headerPeriod, headerProduce;

    if (timePeriod === 'One Year') {
      headerTime = 1;
      headerPeriod = 'year';
    } else if (timePeriod === 'Six Months') {
      headerTime = 6;
      headerPeriod = 'month';
    } else if (timePeriod === 'Three Months') {
      headerTime = 3;
      headerPeriod = 'month';
    } else if (timePeriod === 'One Month') {
      headerTime = 1;
      headerPeriod = 'month';
    } else if (timePeriod === 'One Week') {
      headerTime = 7;
      headerPeriod = 'day';
    }

    headerLevel = level;

    headerProduce = produce;

    return fetch('https://harvest-stalkoverflow.herokuapp.com/api/private', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + userAccessToken,
        RequestType: 'GetFilteredLogs',
        userID: userID,
        Time: headerTime,
        Period: headerPeriod,
        Level: headerLevel,
        Produce: headerProduce,
      },
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        if (json.Error === 'Time param not found.') {
          json = {};
        }
        return json;
      })
      .catch(error => {
        console.log(error);
      });
  };

  // This is some data that can be used for testing
  // User selects supertype
  let newTestData_0 = {
    Jan: 50,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 3,
    Jun: 0,
    Jul: 2,
    Aug: 0,
    Sep: 0,
    Oct: 2,
    Nov: 2,
    Dec: 0,
  };

  // User selects type
  let newTestData_1 = {
    January: 50,
    February: 60,
    March: 10,
    April: 34,
    May: 23,
    June: 21,
  };

  // User selects subtype
  let newTestData_2 = {
    January: 50,
    February: 60,
    March: 10,
    April: 34,
    May: 23,
    June: 21,
  };

  // User selects food
  let newTestData_3 = {
    January: 50,
    February: 78,
    March: 10,
    April: 123,
    May: 65,
    June: 111,
  };

  // This function will process the data returned from the API
  const parseData = data => {
    dataArr = [];

    const keys = Object.keys(data);

    keys.forEach((key, index) => {
      dataArr.push({x: key, y: data[key]});
    });
    setGraphData(dataArr);
    setCategories(keys);
  };

  // This function will render the bar graph
  const renderBarGraph = () => {
    getData()
      .then(json => {
        parseData(json);
      })
      .then(() => {
        setFilterIsApplied(true);
      });
  };

  // This ensures that a new bar graph is rendered whenever a user makes changes
  // to the filter
  useEffect(() => {
    console.log('Refreshing');
  }, [refresh]);

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.iconView}>
        <TouchableOpacity onPress={navigation.openDrawer}>
          <Image
            style={{
              height: 20,
              width: 20,
            }}
            source={require('../assets/hamburger-icon.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setModalOpen(true)}>
          <Image
            style={{
              height: 20,
              width: 20,
              marginRight: 20,
            }}
            source={require('../assets/filter.png')}
          />
        </TouchableOpacity>
      </View>
      {/*
        Here a modal view is created, which will contain the contents
        of the filter
      */}
      <Modal visible={modalOpen} animationType="fade" transparent={true}>
        <SafeAreaView style={styles.modalView}>
          <View>
            <TouchableOpacity onPress={() => setModalOpen(false)}>
              <Image
                style={{
                  height: 15,
                  width: 15,
                  marginLeft: 200,
                  marginBottom: 40,
                }}
                source={require('../assets/close-icon.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.filterView}>
            <Text style={styles.filterText}>Time Period:</Text>

            <SelectDropdown
              data={TimePeriods}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
                setTimePeriod(selectedItem);
              }}
              defaultButtonText={'Select an option'}
              buttonTextAfterSelection={(selectedItem, index) => {
                console.log('this is the date: ' + timePeriod);
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={{
                borderWidth: 2,
                borderColor: '#A1E8Af',
                backgroundColor: '#fff',
                borderRadius: 10,
              }}
              buttonTextStyle={{color: '#A1E8Af'}}
              dropdownOverlayColor={'rgba(255, 255, 255, 0)'}
              dropdownStyle={{
                marginTop: 1,
                borderRadius: 10,
                backgroundColor: '#fff',
                borderWidth: 2,
                borderColor: '#A1E8Af',
              }}
              rowStyle={{
                borderWidth: 0,
                borderColor: '#A1E8Af',
                backgroundColor: '#fff',
                borderBottomWidth: 0,
                borderTopWidth: 0,
                marginLeft: 10,
                marginRight: 10,
              }}
              rowTextStyle={{color: '#A1E8Af'}}
            />
          </View>
          <View style={styles.filterView}>
            <Text style={styles.filterText}>Level:</Text>
            <SelectDropdown
              data={Levels}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
                produceRef.current.reset();
                setLevel(selectedItem);
              }}
              defaultButtonText={'Select an option'}
              buttonTextAfterSelection={(selectedItem, index) => {
                console.log('this is the level: ' + level);
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={{
                borderWidth: 2,
                borderColor: '#A1E8Af',
                backgroundColor: '#fff',
                borderRadius: 10,
              }}
              buttonTextStyle={{color: '#A1E8Af'}}
              dropdownOverlayColor={'rgba(255, 255, 255, 0)'}
              dropdownStyle={{
                marginTop: 1,
                borderRadius: 10,
                backgroundColor: '#fff',
                borderWidth: 2,
                borderColor: '#A1E8Af',
              }}
              rowStyle={{
                borderWidth: 0,
                borderColor: '#A1E8Af',
                backgroundColor: '#fff',
                borderBottomWidth: 0,
                borderTopWidth: 0,
                marginLeft: 10,
                marginRight: 10,
              }}
              rowTextStyle={{color: '#A1E8Af'}}
            />
          </View>
          <View style={styles.filterView}>
            <Text style={styles.filterText}>Produce:</Text>
            <SelectDropdown
              data={
                level === 'Superdupertype'
                  ? ['All']
                  : level === 'Supertype'
                  ? Supertypes
                  : level === 'Type'
                  ? Types
                  : level === 'Subtype'
                  ? Subtypes
                  : level === 'Food'
                  ? Food
                  : ['---']
              }
              ref={produceRef}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
                setProduce(selectedItem);
              }}
              defaultButtonText={'Select an option'}
              buttonTextAfterSelection={(selectedItem, index) => {
                console.log('this is the produce: ' + produce);
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={{
                borderWidth: 2,
                borderColor: '#A1E8Af',
                backgroundColor: '#fff',
                borderRadius: 10,
              }}
              buttonTextStyle={{color: '#A1E8Af'}}
              dropdownOverlayColor={'rgba(255, 255, 255, 0)'}
              dropdownStyle={{
                marginTop: 1,
                borderRadius: 10,
                backgroundColor: '#fff',
                borderWidth: 2,
                borderColor: '#A1E8Af',
              }}
              rowStyle={{
                borderWidth: 0,
                borderColor: '#A1E8Af',
                backgroundColor: '#fff',
                borderBottomWidth: 0,
                borderTopWidth: 0,
                marginLeft: 10,
                marginRight: 10,
              }}
              rowTextStyle={{color: '#A1E8Af'}}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                console.log('Filter has been applied');
                setModalOpen(false);
                renderBarGraph();
                setRefresh(!refresh);
              }}>
              <Text style={styles.filterButton}>Apply Filter</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

      <View style={styles.graphView}>
        {filterIsApplied && graphData.length > 0 ? (
          <>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AtlasPage', {foodItem: produce});
              }}>
              <Text style={styles.textHeading}>{produce}</Text>
            </TouchableOpacity>
            <VictoryChart domainPadding={15}>
              <VictoryGroup
                offset={7.5}
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
                <VictoryBar
                  categories={{x: categories}}
                  barWidth={10}
                  data={graphData}
                />
              </VictoryGroup>
              <VictoryAxis dependentAxis tickFormat={t => `${t}g`} />
              <VictoryAxis
                style={{tickLabels: {angle: 30, transform: 'translate(3, 4)'}}}
              />
            </VictoryChart>
          </>
        ) : graphData.length == 0 ? (
          <Text>No Data to display</Text>
        ) : (
          <Text>Apply Filter Please</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  drop_down: {
    backgroundColor: 'black',
    borderRadius: 2,
    borderBottomWidth: 0.5,
    padding: 2,
  },
  Filter_View: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  Popup_View: {
    margin: 20,
    borderRadius: 20,
    backgroundColor: 'black',
    width: 230,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  filter: {
    marginTop: -20,
    height: 0,
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
  iconView: {
    flex: 0.1,
    flexDirection: 'row',
    paddingTop: 20,
    marginLeft: 20,
    alignSelf: 'stretch',
    justifyContent: 'space-between',
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
  modalView: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 500,
    width: 300,
    borderRadius: 30,
    marginTop: '50%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  filterText: {
    fontSize: 20,
    color: '#000',
    marginBottom: 5,
  },
  filterView: {
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButton: {
    marginTop: 10,
  },
});
