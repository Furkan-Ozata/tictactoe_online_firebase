import React, {Component} from 'react';
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
import {inject, observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParams} from '../navigation/stackPramsType';
import {
  deleteTable,
  markPosition,
  resetMarkers,
} from '../firebaseFunctions/gameFunctions';

const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
const windowWidth = Dimensions.get('window').width;

let TableID: any = undefined;
@inject('store')
@observer
export default class Game extends Component {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const {currentUser} = auth();
    const {uid} = currentUser;
    await firestore()
      .collection('Users')
      .doc(uid)
      .get()
      .then(history => {
        if (history.exists) {
          const historyData = history.data();
          TableID = historyData.tableID;
        }
      })
      .catch(err => console.log(err));
    var data: any = null;
    firestore()
      .collection('listOfGames')
      .doc(TableID)
      .onSnapshot(documentSnapshot => {
        data = documentSnapshot.data();

        if (data !== undefined) {
          this.props.store.markers = data.temp;
          this.props.store.active_player = data.sira;
        }
      });
  }

  markPositionGet = (position: any) => {
    markPosition(position, TableID);
  };

  deleteTableGet = () => {
    deleteTable();
    navigation.navigate('GameCreate');
  };

  resetMarkersGet = () => {
     resetMarkers();
  };

  calculateWinner = (squares: any) => {
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

  winnerFunc() {
    const winner = this.calculateWinner(this.props.store.markers);
    if (winner === 'X') {
      Alert.alert('Player X Won!');
       this.resetMarkersGet();
    } else if (winner === 'O') {
      Alert.alert('Player O Won!');
      this.resetMarkersGet();
    }
  }

  render() {
    this.winnerFunc();
    return (
      <SafeAreaView style={styles.body}>
        <View>
          <TouchableOpacity
            onPress={() => {
              this.deleteTableGet();
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
            {
              backgroundColor:
                this.props.store.active_player === 'X' ? '#FF0045' : '#009FF9',
            },
          ]}>
          <Text style={styles.playerTxt}>
            Player {this.props.store.active_player}'s turn
          </Text>
        </View>
        <View style={styles.mainContainer}>
          {/* Top Left Cell */}
          <Pressable
            style={styles.cell_top_left}
            onPress={() => this.markPositionGet(0)}>
            {this.props.store.markers[0] === 'X' && (
              <Image
                source={require('../assets/img/XICON.png')}
                style={styles.icon}
              />
            )}
            {this.props.store.markers[0] === 'O' && (
              <Image
                source={require('../assets/img/OICON.png')}
                style={styles.icon}
              />
            )}
          </Pressable>

          {/* Top Mid Cell */}
          <Pressable
            style={styles.cell_top_mid}
            onPress={() => this.markPositionGet(1)}>
            {this.props.store.markers[1] === 'X' && (
              <Image
                source={require('../assets/img/XICON.png')}
                style={styles.icon}
              />
            )}
            {this.props.store.markers[1] === 'O' && (
              <Image
                source={require('../assets/img/OICON.png')}
                style={styles.icon}
              />
            )}
          </Pressable>

          {/* Top Right Cell */}
          <Pressable
            style={styles.cell_top_right}
            onPress={() => this.markPositionGet(2)}>
            {this.props.store.markers[2] === 'X' && (
              <Image
                source={require('../assets/img/XICON.png')}
                style={styles.icon}
              />
            )}
            {this.props.store.markers[2] === 'O' && (
              <Image
                source={require('../assets/img/OICON.png')}
                style={styles.icon}
              />
            )}
          </Pressable>

          {/* Mid Left Cell */}
          <Pressable
            style={styles.cell_mid_left}
            onPress={() => this.markPositionGet(3)}>
            {this.props.store.markers[3] === 'X' && (
              <Image
                source={require('../assets/img/XICON.png')}
                style={styles.icon}
              />
            )}
            {this.props.store.markers[3] === 'O' && (
              <Image
                source={require('../assets/img/OICON.png')}
                style={styles.icon}
              />
            )}
          </Pressable>

          {/* Mid Mid Cell */}
          <Pressable
            style={styles.cell_mid_mid}
            onPress={() => this.markPositionGet(4)}>
            {this.props.store.markers[4] === 'X' && (
              <Image
                source={require('../assets/img/XICON.png')}
                style={styles.icon}
              />
            )}
            {this.props.store.markers[4] === 'O' && (
              <Image
                source={require('../assets/img/OICON.png')}
                style={styles.icon}
              />
            )}
          </Pressable>

          {/* Mid Right Cell */}
          <Pressable
            style={styles.cell_mid_right}
            onPress={() => this.markPositionGet(5)}>
            {this.props.store.markers[5] === 'X' && (
              <Image
                source={require('../assets/img/XICON.png')}
                style={styles.icon}
              />
            )}
            {this.props.store.markers[5] === 'O' && (
              <Image
                source={require('../assets/img/OICON.png')}
                style={styles.icon}
              />
            )}
          </Pressable>

          {/* Bottom Left Cell */}
          <Pressable
            style={styles.cell_bottom_left}
            onPress={() => this.markPositionGet(6)}>
            {this.props.store.markers[6] === 'X' && (
              <Image
                source={require('../assets/img/XICON.png')}
                style={styles.icon}
              />
            )}
            {this.props.store.markers[6] === 'O' && (
              <Image
                source={require('../assets/img/OICON.png')}
                style={styles.icon}
              />
            )}
          </Pressable>

          {/* Bottom Mid Cell */}
          <Pressable
            style={styles.cell_bottom_mid}
            onPress={() => this.markPositionGet(7)}>
            {this.props.store.markers[7] === 'X' && (
              <Image
                source={require('../assets/img/XICON.png')}
                style={styles.icon}
              />
            )}
            {this.props.store.markers[7] === 'O' && (
              <Image
                source={require('../assets/img/OICON.png')}
                style={styles.icon}
              />
            )}
          </Pressable>

          {/* Bottom Right Cell */}
          <Pressable
            style={styles.cell_bottom_right}
            onPress={() => this.markPositionGet(8)}>
            {this.props.store.markers[8] === 'X' && (
              <Image
                source={require('../assets/img/XICON.png')}
                style={styles.icon}
              />
            )}
            {this.props.store.markers[8] === 'O' && (
              <Image
                source={require('../assets/img/OICON.png')}
                style={styles.icon}
              />
            )}
          </Pressable>
        </View>
        <Pressable style={styles.cancleBTN} onPress={this.resetMarkersGet}>
          <Image
            source={require('../assets/img/REPLAY.png')}
            style={styles.cancelIcon}
          />
        </Pressable>
      </SafeAreaView>
    );
  }
}

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
    right: 20,
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
