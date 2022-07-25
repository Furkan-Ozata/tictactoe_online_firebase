import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  Alert,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParams} from '../navigation/stackPramsType';

const windowWidth = Dimensions.get('window').width;
let TableID: any = undefined;
const Game = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

  const [active_player, setActive_player] = useState('X');
  const [markers, setMarkers] = useState(['', '', '', '', '', '', '', '', '']);

  // read instant data
  useEffect(() => {
    const temp = ['', '', '', '', '', '', '', '', ''];
    const {currentUser} = auth();
    const {uid} = currentUser;
    var historiesMap: any = undefined;
    var getTable: any = undefined;

    setTimeout(() => {  fetchData() }, 1000);
    async function fetchData() {
      // You can await here
      const response = await firestore()
        .collection('Users')
        .doc(uid)
        .get()
        .then(history => {
          if (history.exists) {
            const historyData = history.data();
            TableID = historyData.tableID;
          }
          var data: any = {temp: ['', '', '', '', '', '', '', '', '']};
          firestore()
            .collection('markers')
            .doc(TableID)
            .onSnapshot(documentSnapshot => {
              data = documentSnapshot.data();

              if (data !== undefined) {
                setMarkers(data.temp);
                setActive_player(data.sira);
              }
            });
        })
        .catch(err => console.log(err));
    }


    // Stop listening for updates when no longer required
  }, []);

  const markPosition = (position: any) => {
    const {currentUser} = auth();
    const {uid} = currentUser;
    let tableGet: any = null;
    let sira: any = null;
    async function fetchData() {
      await firestore()
        .collection('Users')
        .doc(uid)
        .get()
        .then(history => {
          if (history.exists) {
            const historyData: any = history.data();
            tableGet = historyData.tableID;
            sira = historyData.sira;
          }
          getMarkers();
        })
        .catch(err => console.log(err));
    }
    fetchData();
    function getMarkers() {
      if (active_player === 'X') {
        if (uid === TableID) {
          if (!markers[position]) {
            let temp: any = [...markers];
            temp[position] = active_player;
            //set marker firestore
            firestore()
              .collection('markers')
              .doc(tableGet)
              .set({
                temp: temp,
                sira: 'O',
              })
              .then(() => {
                console.log('markers added!');
              });

            setMarkers(temp);
            setActive_player('O');
          }
        }
      } else if (active_player === 'O') {
        if (uid !== TableID) {
          if (!markers[position]) {
            let temp: any = [...markers];
            temp[position] = active_player;
            //set marker firestore
            firestore()
              .collection('markers')
              .doc(tableGet)
              .set({
                temp: temp,
                sira: 'X',
              })
              .then(() => {
                console.log('markers added!');
              });

            setMarkers(temp);

            setActive_player('X');
          }
        }
      }
    }
  };
  const deleteTable = () => {
    const {currentUser} = auth();
    const {uid} = currentUser;
    let tableGet: any = null;
    let sira: any = null;
    async function fetchData() {
      await firestore()
        .collection('Users')
        .doc(uid)
        .get()
        .then(history => {
          if (history.exists) {
            const historyData: any = history.data();
            tableGet = historyData.tableID;
          }
          getMarkers();
        })
        .catch(err => console.log(err));
    }
    fetchData()
    function getMarkers() {
      if (uid === tableGet) {
        console.log(tableGet)
        firestore().collection('listOfGames').doc(tableGet).delete().then(() => {
          firestore().collection('markers').doc(tableGet).delete()

        }
         
        );
      }
    }
    
    navigation.navigate('GameCreate')
  };
  const resetMarkers = () => {
    const temp = ['', '', '', '', '', '', '', '', ''];
    //reset firestore markers
    const {currentUser} = auth();
    const {uid} = currentUser;
    let tableGet: any = null;
    let sira: any = null;
    async function fetchData() {
      await firestore()
        .collection('Users')
        .doc(uid)
        .get()
        .then(history => {
          if (history.exists) {
            const historyData: any = history.data();
            tableGet = historyData.tableID;
          }
          getMarkers();
        })
        .catch(err => console.log(err));
    }
    fetchData();
    function getMarkers() {
      firestore()
        .collection('markers')
        .doc(tableGet)
        .set({
          temp: temp,
          sira: 'X',
        })
        .then(() => {
          console.log('markers added!');
        });
    }
    // reset markers
    setMarkers(temp);
    setActive_player('X');
  };

  const calculateWinner = (squares: any) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  useEffect(() => {
    const winner = calculateWinner(markers);
    if (winner === 'X') {
      Alert.alert('Player X Won!');
      resetMarkers();
    } else if (winner === 'O') {
      Alert.alert('Player O Won!');
      resetMarkers();
    }
  }, [markers]);
  return (
    
      <SafeAreaView style={styles.body}>
          <View>
        <TouchableOpacity
          onPress={() => {
            deleteTable();
          }}>
          <Image
            source={require('../assets/img/BACK.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
      </View>
        <View
          style={[
            styles.playerInfo,
            {backgroundColor: active_player === 'X' ? '#FF0045' : '#009FF9'},
          ]}>
          <Text style={styles.playerTxt}>Player {active_player}'s turn</Text>
        </View>
        <View style={styles.mainContainer}>
          {/* Top Left Cell */}
          <Pressable
            style={styles.cell_top_left}
            onPress={() => markPosition(0)}>
            {markers[0] === 'X' && (
              <Image
                source={require('../assets/img/XICON.png')}
                style={styles.icon}
              />
            )}
            {markers[0] === 'O' && (
              <Image
                source={require('../assets/img/OICON.png')}
                style={styles.icon}
              />
            )}
          </Pressable>

          {/* Top Mid Cell */}
          <Pressable
            style={styles.cell_top_mid}
            onPress={() => markPosition(1)}>
            {markers[1] === 'X' && (
              <Image
                source={require('../assets/img/XICON.png')}
                style={styles.icon}
              />
            )}
            {markers[1] === 'O' && (
              <Image
                source={require('../assets/img/OICON.png')}
                style={styles.icon}
              />
            )}
          </Pressable>

          {/* Top Right Cell */}
          <Pressable
            style={styles.cell_top_right}
            onPress={() => markPosition(2)}>
            {markers[2] === 'X' && (
              <Image
                source={require('../assets/img/XICON.png')}
                style={styles.icon}
              />
            )}
            {markers[2] === 'O' && (
              <Image
                source={require('../assets/img/OICON.png')}
                style={styles.icon}
              />
            )}
          </Pressable>

          {/* Mid Left Cell */}
          <Pressable
            style={styles.cell_mid_left}
            onPress={() => markPosition(3)}>
            {markers[3] === 'X' && (
              <Image
                source={require('../assets/img/XICON.png')}
                style={styles.icon}
              />
            )}
            {markers[3] === 'O' && (
              <Image
                source={require('../assets/img/OICON.png')}
                style={styles.icon}
              />
            )}
          </Pressable>

          {/* Mid Mid Cell */}
          <Pressable
            style={styles.cell_mid_mid}
            onPress={() => markPosition(4)}>
            {markers[4] === 'X' && (
              <Image
                source={require('../assets/img/XICON.png')}
                style={styles.icon}
              />
            )}
            {markers[4] === 'O' && (
              <Image
                source={require('../assets/img/OICON.png')}
                style={styles.icon}
              />
            )}
          </Pressable>

          {/* Mid Right Cell */}
          <Pressable
            style={styles.cell_mid_right}
            onPress={() => markPosition(5)}>
            {markers[5] === 'X' && (
              <Image
                source={require('../assets/img/XICON.png')}
                style={styles.icon}
              />
            )}
            {markers[5] === 'O' && (
              <Image
                source={require('../assets/img/OICON.png')}
                style={styles.icon}
              />
            )}
          </Pressable>

          {/* Bottom Left Cell */}
          <Pressable
            style={styles.cell_bottom_left}
            onPress={() => markPosition(6)}>
            {markers[6] === 'X' && (
              <Image
                source={require('../assets/img/XICON.png')}
                style={styles.icon}
              />
            )}
            {markers[6] === 'O' && (
              <Image
                source={require('../assets/img/OICON.png')}
                style={styles.icon}
              />
            )}
          </Pressable>

          {/* Bottom Mid Cell */}
          <Pressable
            style={styles.cell_bottom_mid}
            onPress={() => markPosition(7)}>
            {markers[7] === 'X' && (
              <Image
                source={require('../assets/img/XICON.png')}
                style={styles.icon}
              />
            )}
            {markers[7] === 'O' && (
              <Image
                source={require('../assets/img/OICON.png')}
                style={styles.icon}
              />
            )}
          </Pressable>

          {/* Bottom Right Cell */}
          <Pressable
            style={styles.cell_bottom_right}
            onPress={() => markPosition(8)}>
            {markers[8] === 'X' && (
              <Image
                source={require('../assets/img/XICON.png')}
                style={styles.icon}
              />
            )}
            {markers[8] === 'O' && (
              <Image
                source={require('../assets/img/OICON.png')}
                style={styles.icon}
              />
            )}
          </Pressable>
        </View>
        <Pressable style={styles.cancleBTN} onPress={resetMarkers}>
          <Image
            source={require('../assets/img/REPLAY.png')}
            style={styles.cancelIcon}
          />
        </Pressable>
      </SafeAreaView>
  );
};

export default Game;

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  playerInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 20,
    marginTop: 30,
  },
  playerTxt: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: '#fff',
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 60,
  },
  cell_top_left: {
    width: windowWidth / 3.2,
    height: windowWidth / 3.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 6,
    borderBottomWidth: 6,
  },
  cell_top_mid: {
    width: windowWidth / 3.2,
    height: windowWidth / 3.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 6,
  },
  cell_top_right: {
    width: windowWidth / 3.2,
    height: windowWidth / 3.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 6,
    borderLeftWidth: 6,
  },
  cell_mid_left: {
    width: windowWidth / 3.2,
    height: windowWidth / 3.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 6,
  },
  cell_mid_mid: {
    width: windowWidth / 3.2,
    height: windowWidth / 3.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell_mid_right: {
    width: windowWidth / 3.2,
    height: windowWidth / 3.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 6,
  },
  cell_bottom_left: {
    width: windowWidth / 3.2,
    height: windowWidth / 3.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 6,
    borderTopWidth: 6,
  },
  cell_bottom_mid: {
    width: windowWidth / 3.2,
    height: windowWidth / 3.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 6,
  },
  cell_bottom_right: {
    width: windowWidth / 3.2,
    height: windowWidth / 3.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 6,
    borderTopWidth: 6,
  },
  icon: {
    height: 62,
    width: 62,
  },
  cancleBTN: {
    position: 'absolute',
    bottom: 20,
    right: 20
  },
  cancelIcon: {
    height: 80,
    width: 80,
  },
  backIcon: {
    height: 45,
    width: 45,
  },
});
