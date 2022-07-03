import React, { useState, useEffect, FC } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Pressable, Image, Alert, Dimensions, Button, TouchableOpacity, RefreshControlBase } from 'react-native'
import { ref, set, onValue, update, remove } from "firebase/database";
import { database, authentication } from '../config/firebase-config';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParams } from "../navigation/stackPramsType";


const windowWidth = Dimensions.get('window').width;
const Game: FC = () => {

  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const [active_player, setActive_player] = useState('X')
  const [count, setCount] = useState(0)

  const [markers, setMarkers] = useState([
    '', '', '',
    '', '', '',
    '', '', '',
  ])


  const markPosition = (position: any) => {
    const userId = authentication.currentUser?.uid;
    //
    var table1 = '';
    var userNumber = '';
    onValue(ref(database, '/users/' + userId), (snapshot) => {
      const table2 = (snapshot.val() && snapshot.val().table) || '';
      const userNumber1 = (snapshot.val() && snapshot.val().userNumber) || '';
      table1 = table2
      userNumber = userNumber1


      if (active_player === 'X') {
        if (userNumber === 'user1') {


          if (!markers[position]) {
            let temp: any = [...markers]
            temp[position] = active_player

            update(ref(database, '/markers/' + table1), {

              temp: temp,
              sira: 'O'
            });

            onValue(ref(database, '/markers/' + table1), (snapshot) => {
              const temp = (snapshot.val() && snapshot.val().temp) || '';

              setMarkers(temp)
            }, {
              onlyOnce: true
            }); //transfer chances to next player
            setActive_player('O')
          }
        }
      }
      if (active_player === 'O') {
        if (userNumber === 'user2') {
          if (!markers[position]) {
            let temp: any = [...markers]
            temp[position] = active_player

            update(ref(database, '/markers/' + table1), {

              temp: temp,
              sira: 'X'
            });

            onValue(ref(database, '/markers/' + table1), (snapshot) => {
              const temp = (snapshot.val() && snapshot.val().temp) || '';

              setMarkers(temp)
            }, {
              onlyOnce: true
            });
            setActive_player('X')
          }
        }
      }
    })
    //

  }

  const refresh = () => {
    const userId = authentication.currentUser?.uid;
    //
    var table1 = '';
    var userNumber = '';
    onValue(ref(database, '/users/' + userId), (snapshot) => {
      const table2 = (snapshot.val() && snapshot.val().table) || '';
      const userNumber1 = (snapshot.val() && snapshot.val().userNumber) || '';
      table1 = table2
      userNumber = userNumber1

    })
    onValue(ref(database, '/markers/' + table1), (snapshot) => {
      const table2 = (snapshot.val() && snapshot.val().table) || '';
      const temp = (snapshot.val() && snapshot.val().temp) || '';
      const sira = (snapshot.val() && snapshot.val().sira) || '';
      setMarkers(temp)

      setActive_player(sira)
    }, {
      onlyOnce: true
    });

  }


  const resetMarkers = () => {
    const userId = authentication.currentUser?.uid;
    //
    var table1 = '';
    var userNumber = '';
    onValue(ref(database, '/users/' + userId), (snapshot) => {
      const table2 = (snapshot.val() && snapshot.val().table) || '';
      const userNumber1 = (snapshot.val() && snapshot.val().userNumber) || '';
      table1 = table2
      userNumber = userNumber1


      set(ref(database, '/markers/' + table1), {
        temp: ([
          '', '', '',
          '', '', '',
          '', '', '',
        ]),
        sira: 'X'
      });
      onValue(ref(database, '/markers/' + table1), (snapshot) => {
        const temp = (snapshot.val() && snapshot.val().temp) || '';

        setMarkers(temp)
      }, {
        onlyOnce: true
      });
    })
    //

    setActive_player('X')
  }

  const calculateWinner = (squares: any) => {

    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  useEffect(() => {
    firstFunction()
    //
    const winner = calculateWinner(markers);
    if (winner === 'X') {
      Alert.alert("Player X Won!")
      resetMarkers()

    } else if (winner === 'O') {
      Alert.alert("Player O Won!")
      resetMarkers()

    }
  }, [markers])



  useEffect(() => {

    //
    //
    const userId = authentication.currentUser?.uid;
    //
    var table1 = '';
    var userNumber = '';
    const startFunction = onValue(ref(database, '/users/' + userId), (snapshot) => {
      const table2 = (snapshot.val() && snapshot.val().table) || '';
      const userNumber1 = (snapshot.val() && snapshot.val().userNumber) || '';
      table1 = table2
      userNumber = userNumber1

      onValue(ref(database, '/markers/' + table1), (snapshot) => {
        const temp = (snapshot.val() && snapshot.val().temp) || '';
        const sira = (snapshot.val() && snapshot.val().sira) || '';
        setMarkers(temp)
        setActive_player(sira)
      });
    })
    return () => {
      startFunction()
    }
  }, [])


  const firstFunction = () => {

    if (count === 0) {
      setCount(1)
      refresh()
      const userId = authentication.currentUser?.uid;
      var table1 = '';
      var userNumber = '';
      onValue(ref(database, '/users/' + userId), (snapshot) => {
        const table2 = (snapshot.val() && snapshot.val().table) || '';
        const userNumber1 = (snapshot.val() && snapshot.val().userNumber) || '';
        table1 = table2
        userNumber = userNumber1


      })
      update(ref(database, '/markers/' + table1), {

        sira: 'X'
      });
    }



  }


  const clearListUser = () => {

    const userId = authentication.currentUser?.uid;
    var table1 = '';
    var userNumber = '';
    var userName: any = '';
    onValue(ref(database, '/users/' + userId), (snapshot) => {
      const table2 = (snapshot.val() && snapshot.val().table) || '';
      const userNumber1 = (snapshot.val() && snapshot.val().userNumber) || '';
      userName = (snapshot.val() && snapshot.val().userName) || '';
      table1 = table2
      userNumber = userNumber1
    })
    if (userNumber === 'user1') {
      if (table1 !== '') {
        update(ref(database, '/listOfGame/' + table1), {
          user1: '',
          userName1: ''

        });
        update(ref(database, '/users/' + userId), {
          table: null,
          userNumber: ''
        });
      }
    }
    else if (userNumber === 'user2') {
      if (table1 !== '') {
        update(ref(database, '/listOfGame/' + table1), {

          user2: '',
          userName2: ''
        });
        update(ref(database, '/users/' + userId), {
          table: null,
          userNumber: ''
        });
      }
    }
    resetMarkers()
    navigation.navigate('ListOfGames')
  }





  return (
    <SafeAreaView style={styles.body}>

      <View>
        <TouchableOpacity onPress={() => { clearListUser() }}>
          <Image source={require('../assets/img/BACK.png')} style={styles.backIcon} />
        </TouchableOpacity>
      </View>
      <View style={[styles.playerInfo, { backgroundColor: active_player === 'X' ? '#FF0045' : '#009FF9' }]}>
        <Text style={styles.playerTxt}>Player {active_player}'s turn</Text>
      </View>
      <View style={styles.mainContainer}>

        {/* Top Left Cell */}
        <Pressable style={styles.cell_top_left} onPress={() => markPosition(0)}>
          {markers[0] === 'X' && <Image source={require('../assets/img/XICON.png')} style={styles.icon} />}
          {markers[0] === 'O' && <Image source={require('../assets/img/OICON.png')} style={styles.icon} />}
        </Pressable>

        {/* Top Mid Cell */}
        <Pressable style={styles.cell_top_mid} onPress={() => markPosition(1)}>
          {markers[1] === 'X' && <Image source={require('../assets/img/XICON.png')} style={styles.icon} />}
          {markers[1] === 'O' && <Image source={require('../assets/img/OICON.png')} style={styles.icon} />}
        </Pressable>

        {/* Top Right Cell */}
        <Pressable style={styles.cell_top_right} onPress={() => markPosition(2)}>
          {markers[2] === 'X' && <Image source={require('../assets/img/XICON.png')} style={styles.icon} />}
          {markers[2] === 'O' && <Image source={require('../assets/img/OICON.png')} style={styles.icon} />}
        </Pressable>

        {/* Mid Left Cell */}
        <Pressable style={styles.cell_mid_left} onPress={() => markPosition(3)}>
          {markers[3] === 'X' && <Image source={require('../assets/img/XICON.png')} style={styles.icon} />}
          {markers[3] === 'O' && <Image source={require('../assets/img/OICON.png')} style={styles.icon} />}
        </Pressable>

        {/* Mid Mid Cell */}
        <Pressable style={styles.cell_mid_mid} onPress={() => markPosition(4)}>
          {markers[4] === 'X' && <Image source={require('../assets/img/XICON.png')} style={styles.icon} />}
          {markers[4] === 'O' && <Image source={require('../assets/img/OICON.png')} style={styles.icon} />}
        </Pressable>

        {/* Mid Right Cell */}
        <Pressable style={styles.cell_mid_right} onPress={() => markPosition(5)}>
          {markers[5] === 'X' && <Image source={require('../assets/img/XICON.png')} style={styles.icon} />}
          {markers[5] === 'O' && <Image source={require('../assets/img/OICON.png')} style={styles.icon} />}
        </Pressable>

        {/* Bottom Left Cell */}
        <Pressable style={styles.cell_bottom_left} onPress={() => markPosition(6)}>
          {markers[6] === 'X' && <Image source={require('../assets/img/XICON.png')} style={styles.icon} />}
          {markers[6] === 'O' && <Image source={require('../assets/img/OICON.png')} style={styles.icon} />}
        </Pressable>

        {/* Bottom Mid Cell */}
        <Pressable style={styles.cell_bottom_mid} onPress={() => markPosition(7)}>
          {markers[7] === 'X' && <Image source={require('../assets/img/XICON.png')} style={styles.icon} />}
          {markers[7] === 'O' && <Image source={require('../assets/img/OICON.png')} style={styles.icon} />}
        </Pressable>

        {/* Bottom Right Cell */}
        <Pressable style={styles.cell_bottom_right} onPress={() => markPosition(8)}>
          {markers[8] === 'X' && <Image source={require('../assets/img/XICON.png')} style={styles.icon} />}
          {markers[8] === 'O' && <Image source={require('../assets/img/OICON.png')} style={styles.icon} />}
        </Pressable>
      </View>
      <Pressable style={styles.cancleBTN} onPress={resetMarkers}>
        <Image source={require('../assets/img/REPLAY.png')} style={styles.cancelIcon} />
      </Pressable>

    </SafeAreaView>
  )
}

export default Game

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
    marginTop: 30
  },
  playerTxt: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: '#fff'
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 60
  },
  cell_top_left: {
    width: windowWidth / 3.2,
    height: windowWidth / 3.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 6,
    borderBottomWidth: 6
  },
  cell_top_mid: {
    width: windowWidth / 3.2,
    height: windowWidth / 3.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 6
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
    width: 62
  },
  backIcon: {
    height: 45,
    width: 45
  },
  cancleBTN: {
    position: 'absolute',
    bottom: 20,
    right: 20
  },
  cancelIcon: {
    height: 80,
    width: 80
  }
})


