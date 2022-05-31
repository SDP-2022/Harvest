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
  Modal,
  TextInput,
} from 'react-native';

const ACCESS_TOKEN = '@save_token';

export default function GardenPage({navigation, route}) {
  // Variables are declared here
  const {userIDToken, userAccessToken, authUsername, userID} = route.params;
  const [Food, setFood] = useState([]);
  const [FoodLen, setFoodLen] = useState(0);
  const [Loading, setLoading] = useState(true);
  const [Refresh, setRefresh] = useState(false);
  const [Data, setData] = useState([{key: 1, text: 'text'}]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLog, setModalLog] = useState(false);
  const [CreatelogName, setCreatelogName] = useState("");
  const [logName, setlogName] = useState("");
  const [LogLen, setLogLen] = useState(0);
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

  // This function takes the data from the backend
  // and sorts by date, as well as parsing the data
  // so that it is in the appropriate format 
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

 const submitLogName = async()=>{ // this code is used to make a post request to the database and save the data on the database
  fetch("https://harvest-stalkoverflow.herokuapp.com/api/private/",{
      method:'POST',
      headers:{
        'Content-type': 'application/json',
        'Authorization' : 'Bearer '  + userAccessToken, // the authorization needed by Auth0 for the user 
        'RequestType' : "CreateLog" 
      },
      body:JSON.stringify({
        UserID : userID,
        LogName : CreatelogName,  
      })
  })
  .then(res=>res.text())
  .then(text=>{
      console.log(text)
      console.log("Success")
  })
  .catch(error=>{
    console.log(error)
    console.log("Failure")
});
}
const checkLogInput = () => { // this method is used to check if the fields are empty, if they are the process will not go through
  if(!CreatelogName.trim()){
    alert("Please enter all fields")
    }
  else{
    submitLogName();
    alert("New log created.");
  }
};

  const handleChange = (value) => {
    setCreatelogName(value);
  }

  const getLogName = async () => {
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

  const parseLogName = json => {
      let logList = [];
      for (let i = 0; i < json.length; i++) {
        let log = json[i].Log_Name;
        let object = {
        log_name : log,
        };
        logList.push(object);
      } 
      return logList;
      //setlogName(logList);
      
    
  }
  // This ensures the appropriate functions run when the screen is accessed
  useEffect(() => {
    getLog().then(json => {
      setLoading(false);
      setFood(formatFood(json));
      setFoodLen(Object.keys(json).length);
      setRefresh(false);
    });
   getLogName().then(json =>{
      setLoading(false);
      setlogName(parseLogName(json));
      setLogLen(Object.keys(json).length);
      setRefresh(false);
   });
  }, [Refresh]);

  if (Loading == true) {
    return (
      <SafeAreaView style={styles.body}>
        <ActivityIndicator size="large" color="#A1E8Af" />
      </SafeAreaView>
    );
  } else if (Loading == false && LogLen == 0) {
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

          {/* button to open a create  log page */}
          <TouchableOpacity onPress={() => setModalOpen(true)}>
            <Image
              style={{
                height: 30,
                width: 30,
                marginLeft: 330,
                marginBottom:10,
              }}
              source={require('../assets/plus-+-64.png')}
            />
          </TouchableOpacity>
        </View>

         {/* page for creating a new log */}
        <Modal visible={modalLog} animationType="fade" transparent={false}>
          <SafeAreaView style={styles.ModalLog}>
            
            <View style={{marginLeft:15,marginTop:15}}>
              <TouchableOpacity onPress={() => setModalLog(false)}>
                <Image
                  style={{
                    height: 20,
                    width: 20,
                  }}
                  source={require('../assets/back.png')}
                />
              </TouchableOpacity>
            </View>
            <Text style={{fontSize:20, marginLeft:90,color:'black'}}>Add New Log</Text>
            <TextInput style = {{ borderWidth: 1, marginLeft: 45, marginRight:45, marginTop: 30, borderRadius: 30, padding: 10,
                 borderColor: '#A1E8AF'}} placeholder = 'Log name' placeholderTextColor={"#808080"} 
                 onChangeText={(value) => handleChange(value)}/>
           
            <View style={{marginLeft:110, marginTop:30}}>
              <TouchableOpacity>
                <Text style={{fontSize:15}}>Create Log</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>

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
              <Text style={styles.text}>Your log is Empty</Text>
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
  } else if (Loading == false && LogLen > 0) {
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

          {/* button to open a create  log page */}
          <TouchableOpacity onPress={() => setModalLog(true)}>
            <Image
              style={{
                height: 30,
                width: 30,
                marginLeft: 330,
              }}
              source={require('../assets/plus-+-64.png')}
            />
          </TouchableOpacity>
        </View>

        {/* page for creating a new log */}
        <Modal visible={modalLog} animationType="fade" transparent={false}>
          <SafeAreaView style={styles.ModalLog}>
            <View style={{marginLeft:15,marginTop:15}}>
              <TouchableOpacity onPress={() => setModalLog(false)}>
                <Image
                  style={{
                    height: 20,
                    width: 20,
                  }}
                  source={require('../assets/back.png')}
                />
              </TouchableOpacity>
            </View>
            <Text style={{fontSize:20, marginLeft:80,color:'black'}}>Create New Log</Text>
            <TextInput style = {{ borderWidth: 1, marginLeft: 45, marginRight:45, marginTop: 30, borderRadius: 30, padding: 10,
                 borderColor: '#A1E8AF'}} placeholder = 'Log name' placeholderTextColor={"#808080"}
                 onChangeText={(value) => handleChange(value)} />
           
            <View style={{marginLeft:110, marginTop:30}}>
              <TouchableOpacity  onPress = {() => checkLogInput()}>
                <Text style={{fontSize:15}}>Create Log</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>

      {/* display multiple log names */}
        <FlatList
           refreshControl={
            <RefreshControl
              refreshing={Refresh}
              onRefresh={() => {
                setRefresh(true);
              }}
            />
          }
          style={{marginTop:50}}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View style={styles.header}>
              <Text style={styles.text}>Logs :</Text>
            </View>
          )}
          data = {logName}
          renderItem={({item}) => (
            <View style={styles.foodView}>
              <TouchableOpacity onPress={() => setModalOpen(true)}>
              <Text style={styles.foodViewName}>{item.log_name}</Text>
              </TouchableOpacity>
          </View>
          )}
          >
          </FlatList>

        {/* display details of the log */}
        <Modal visible={modalOpen} animationType="fade" transparent={true}>
          <SafeAreaView style={styles.modalView}>
            <View>
              <TouchableOpacity onPress={() => setModalOpen(false)}>
                <Image
                  style={{
                    height: 20,
                    width: 20,
                    marginRight: 320,
                    marginBottom: 30,
                    marginTop: 20,
                  }}
                  source={require('../assets/back.png')}
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
                <Text style={styles.text}>User 's Garden:</Text>
              </View>
              )}
              style={styles.list}
              stickySectionHeadersEnabled={false}
              sections={Food}
              keyExtractor={(item, index) => item + index}
              renderItem={({item}) => (
              <View style={styles.foodView}>
                <Text style={styles.foodViewName}>{item.FoodName}</Text>
                <Text style={styles.foodViewWeight}>{item.Weight}g</Text>
              </View>
              )}
              renderSectionHeader={({section: {title}}) => (
              <>
                {new Date().toDateString() === title.toDateString() ? (
                  <Text style={styles.sectionHeader}>Today</Text>
                ) : new Date().toDateString() - 1 === title.toDateString() ? (
                  <Text style={styles.sectionHeader}>Yesterday</Text>
                ) : (
                <Text style={styles.sectionHeader}>{title.toDateString()}</Text>
                )}
              </>
              )}
            /> 
          </SafeAreaView>
        </Modal>
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
    width: 325,
    height: 75,
    margin: 10,
    padding: 10,
    backgroundColor: '#A1E8Af',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodViewName: {
    color: '#000',
    fontSize: 18,
  },
  foodViewWeight: {
    color: '#000',
    fontSize: 15,
  },
  sectionHeader: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  modalView: {
    //alignSelf: 'center',
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    //height: 500,
    //width: 300,
    flex:1,
    borderRadius: 30,
    //marginTop: '50%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  ModalLog: {
    alignSelf: 'center',
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#fff',
    //height: 100,
    width: 300,
    flex:1,
    borderRadius: 30,
    marginTop: '10%',
    marginBottom: '50%',
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
