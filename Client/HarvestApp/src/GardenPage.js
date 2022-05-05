import React from 'react';
import {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SectionList,
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

  const formatFood = json => {
    let foodData = [];
    for (let i = 0; i < json.length; i++) {
      let date = new Date(json[i].Date_Logged.slice(0, 10));
      let food = json[i].Food_Name;
      let weight = json[i].Weight;
      let object = {
        DateLogged: date,
        FoodName: food,
        Weight: weight,
      };
      foodData.push(object);
    }

    foodData = foodData.sort((a, b) => b.DateLogged - a.DateLogged);

    let categorizedFoodData = [
      {
        title: new Date('1900-01-01'),
        data: [{FoodName: 'placeholder', Weight: 0}],
      },
    ];

    for (let i = 0; i < foodData.length; i++) {
      let isInList = false;
      for (let j = 0; j < categorizedFoodData.length; j++) {
        if (
          foodData[i].DateLogged.toDateString() ===
          categorizedFoodData[j].title.toDateString()
        ) {
          let object = {
            FoodName: foodData[i].FoodName,
            Weight: foodData[i].Weight,
          };
          categorizedFoodData[j].data.push(object);
          isInList = true;
          break;
        }
      }
      if (isInList == false) {
        let object = {
          title: foodData[i].DateLogged,
          data: [
            {
              FoodName: foodData[i].FoodName,
              Weight: foodData[i].Weight,
            },
          ],
        };
        categorizedFoodData.push(object);
      }
    }
    categorizedFoodData.shift();
    return categorizedFoodData;
  };

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
      setFood(formatFood(json));
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
          style={styles.list}
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
    {
      console.log(Food);
    }
    {
      console.log(Food[2]);
    }
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

        <SectionList
          refreshControl={
            <RefreshControl
              refreshing={Refresh}
              onRefresh={() => {
                setRefresh(true);
              }}
            />
          }
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View style={styles.header}>
              <Text style={styles.text}>Your Garden:</Text>
            </View>
          )}
          style={styles.list}
          sections={Food}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => (
            <View>
              <Text>{item.FoodName}</Text>
              <Text>{item.Weight}</Text>
            </View>
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text style={{fontSize: 24}}>{title.toDateString()}</Text>
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
  list: {
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
