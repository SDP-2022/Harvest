import React from 'react';
import {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';


const ACCESS_TOKEN = '@save_token';

export default function GardenPage({navigation, route}) {
  const {userIDToken, userAccessToken, authUsername, userID} = route.params;
  const [Food, setFood] = useState([]);
  const [FoodLen, setFoodLen] = useState(0);
  const [Loading, setLoading] = useState(true);
  const [Refresh, setRefresh] = useState(false);
  const [Data, setData] = useState([{key: 1, text: 'text'}]);

  // This function is used for testing
  const getVar = async () => {
    return fetch('https://harvest-stalkoverflow.herokuapp.com/api/private/', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + userAccessToken,
      },
    })
      .then(response => response.text())
      .then(text => {
        console.log(text);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // This function gets the log for the current user
  const getLog = async () => {
    return fetch('https://harvest-stalkoverflow.herokuapp.com/api/private/', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + userAccessToken,
        RequestType: 'GetHarvestLogs',
        UserID: userID,
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

  const formatFood = (json) => {
    let foodData = [];
    for (let i = 0; i < json.length; i++) {
      let date = new Date(json[i].Date_Logged.slice(0, 10));
      let food = json[i].Food_Name;
      let weight = json[i].Weight;
      let object = {
        DateLogged: date,
        FoodName: food, 
        Weight: weight
      }
      foodData.push(object)
    }

    foodData = foodData.sort((a, b) => b.DateLogged - a.DateLogged);

    let categorizedFoodData = [
      {
        DateLogged: new Date("1900-01-01"),
        FoodName: ["placeholder"],
        Weight: [0]
      }
    ]

    for (let i = 0; i < foodData.length; i++) {
      let isInList = false;
      for (let j = 0; j < categorizedFoodData.length; j++) {
        if (foodData[i].DateLogged.toDateString() === categorizedFoodData[j].DateLogged.toDateString()) {
          categorizedFoodData[j].FoodName.push(foodData[i].FoodName);
          categorizedFoodData[j].Weight.push(foodData[i].Weight);
          isInList = true;
          break;
        }
      }
      if (isInList == false) {
        let object = {
          DateLogged: foodData[i].DateLogged,
          FoodName: [foodData[i].FoodName],
          Weight: [foodData[i].Weight]
        }
        categorizedFoodData.push(object)
      }
    }
    categorizedFoodData.shift();
    console.log(categorizedFoodData)
  }

  // This function gets the weight of a specific food item
  const getWeight = async foodname => {
    return fetch('https://harvest-stalkoverflow.herokuapp.com/api/private/', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + userAccessToken,
        RequestType: 'GetFoodTotalWeight',
        UserID: userID,
        FoodName: foodname,
      },
    })
      .then(response => response.text())
      .then(text => {
        console.log(text);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // This ensures the appropriate functions run when the screen is accessed
  useEffect(() => {
    getLog().then(json => {
      setLoading(false);
      setFood(json);
      formatFood(json)
      setFoodLen(Object.keys(json).length);
      setRefresh(false);
    });
  }, [Refresh]);

  if (Loading == true) {
    return (
      <SafeAreaView style={styles.body}>
        <ActivityIndicator size="large" color="#A1E8Af" />
      </SafeAreaView>
    );
  } else if (Loading == false && FoodLen == 0) {
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

        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={Refresh}
              onRefresh={() => {
                setRefresh(true);
              }}
            />
          }
          showsVerticalScrollIndicator={false}
          style={styles.flatList}
          data={Data}
          ListHeaderComponent={() => (
            <View style={styles.header}>
              <Text style={styles.text}>Your Garden is Empty</Text>
              <Text style={styles.text}>¯\_(ツ)_/¯</Text>
            </View>
          )}
          // renderItem={({item}) => (
          // <View style={styles.foodView}>
          //   <Text style={styles.foodViewText}>{item.key}</Text>
          //   <Text style={styles.foodViewText}>{item.text}</Text>
          // </View>
          // )}
        />
      </SafeAreaView>
    );
  } else if (Loading == false && FoodLen > 0) {
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

        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={Refresh}
              onRefresh={() => {
                setRefresh(true);
              }}
            />
          }
          showsVerticalScrollIndicator={false}
          style={styles.flatList}
          data={Food}
          ListHeaderComponent={() => (
            <View style={styles.header}>
              <Text style={styles.text}>Your Garden:</Text>
            </View>
          )}
          renderItem={({item}) => (
            <View style={styles.foodView}>
              <Text style={styles.foodViewText}>{item.Food_Name}</Text>
              <Text style={styles.foodViewText}>Weight: {item.Weight}g</Text>
              <Text style={styles.foodViewText}>
                Date: {item.Date_Logged.slice(0, 10)}
              </Text>
            </View>
          )}
        />
      </SafeAreaView>
    );
  }
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
  flatList: {
    flex: 2,
    marginBottom: 50,
  },
  text: {
    color: '#000',
    fontSize: 25,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  userText: {
    color: '#000',
    marginLeft: 20,
    fontSize: 20,
    textAlign: 'left',
  },
  foodView: {
    width: 300,
    height: 125,
    margin: 10,
    padding: 10,
    backgroundColor: '#A1E8Af',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodViewText: {
    color: '#000',
    fontSize: 15,
  },
});
