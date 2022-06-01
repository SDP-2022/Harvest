import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';

import {VictoryPie, VictoryLabel} from 'victory-native';

import SelectDropdown from 'react-native-select-dropdown';

export default function PieChartPage({navigation, route}) {
  // Here, the appropriate variables and arrays are declared
  const {userIDToken, userAccessToken, authUsername, userID} = route.params;

  const [filterIsApplied, setFilterIsApplied] = useState(false);
  const [renderGraph, setRenderGraph] = useState(false);
  const [dateLabels, setDateLabels] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const produceRef = useRef({});
  const TimePeriods = ['One Year', 'Six Months', 'Three Months'];
  const Levels = ['All', 'Supertype', 'Type', 'Subtype'];
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

  const [currLog, setCurrLog] = useState(null);
  const [timePeriod, setTimePeriod] = useState(null);
  const [level, setLevel] = useState(null);
  const [produce, setProduce] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [Logs, setLogs] = useState(null);
  const [logData, setLogData] = useState(null);

  const getUserLogs = async () => {
    return fetch('https://harvest-stalkoverflow.herokuapp.com/api/private', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + userAccessToken,
        RequestType: 'GetLogNames',
        userID: userID,
      },
    })
      .then(response => response.json())
      .then(json => {
        return json;
      })
      .catch(error => {
        console.log(error);
      });
  };

  const parseLogJson = () =>
    getUserLogs().then(json => {
      let logList = [];
      logList.push('All');
      for (let i = 0; i < json.length; i++) {
        logList.push(json[i].Log_Name);
      }
      setLogs(logList);
      setLogData(json);
    });

  // This function requests data from the API to generate the graph
  const getData = async () => {
    let headerLevel, headerTime, headerPeriod, headerProduce, headerLog;

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

    if (level === 'Food') {
      headerLevel = 'FoodName';
    } else if (level === 'All') {
      headerLevel = 'Superdupertype';
    } else {
      headerLevel = level;
    }

    if (currLog === 'All') {
      headerLog = null;
    } else {
      let container = logData.filter(item => {
        return item.Log_Name === 'Home';
      });
      headerLog = container[0].log_id;
    }

    headerProduce = produce;

    let headerValues;

    if (currLog === 'All') {
      headerValues = {
        Authorization: 'Bearer ' + userAccessToken,
        RequestType: 'GetPiechartLogs',
        userID: userID,
        Time: headerTime,
        Period: headerPeriod,
        Level: headerLevel,
        Produce: headerProduce,
      };
    } else {
      headerValues = {
        Authorization: 'Bearer ' + userAccessToken,
        RequestType: 'GetPiechartLogs',
        userID: userID,
        Time: headerTime,
        Period: headerPeriod,
        Level: headerLevel,
        Produce: headerProduce,
        LogID: headerLog,
      };
    }

    return fetch('https://harvest-stalkoverflow.herokuapp.com/api/private', {
      method: 'GET',
      headers: headerValues,
    })
      .then(response => response.json())
      .then(json => {
        console.log('This is the json object:');
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

  // This function will process the data returned from the API
  const parseData = data => {
    dataArr = [];
    let keys = [];

    let keyType;
    let keySum = 'sum';
    for (let i = 0; i < data.length; i++) {
      let obj = data[i];
      for (let dataKey in obj) {
        keyType = dataKey;
        break;
      }
      break;
    }

    for (let i = 0; i < data.length; i++) {
      keys.push(data[i][keyType]);
      dataArr.push({x: data[i][keyType], y: parseInt(data[i][keySum])});
    }

    console.log('This is the keys array:');
    console.log(keys);
    console.log('This is the data array');
    console.log(dataArr);
    setChartData(dataArr);
    setCategories(keys);
  };

  // This function will render the pie chart
  const renderBarGraph = () => {
    getData()
      .then(json => {
        parseData(json);
      })
      .then(() => {
        setFilterIsApplied(true);
      });
  };

  useEffect(() => {
    parseLogJson();
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
            <Text style={styles.filterText}>Log:</Text>

            <SelectDropdown
              data={Logs}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
                setCurrLog(selectedItem);
              }}
              defaultButtonText={'Select an option'}
              buttonTextAfterSelection={(selectedItem, index) => {
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
                level === 'All'
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

      <View style={styles.chartView}>
        {filterIsApplied && chartData.length > 0 ? (
          <>
            <View style={styles.chartTitleView}>
              <Text style={styles.textHeading}>{timePeriod}</Text>
            </View>
            <VictoryPie
              labelComponent={<VictoryLabel angle={0} />}
              animate={{duration: 1000, easing: 'linear'}}
              cornerRadius={({datum}) => datum.y * 0.005}
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
              padding={{left: 85, right: 85}}
              data={chartData}
            />
          </>
        ) : chartData.length == 0 ? (
          <Text>No Data to display</Text>
        ) : (
          <Text>Apply Filter Please</Text>
        )}
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
    margin: 20,
    borderRadius: 20,
    backgroundColor: 'black',
    width: 250,
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
  modalView: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 600,
    width: 300,
    borderRadius: 30,
    marginTop: '30%',
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
  chartTitleView: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
