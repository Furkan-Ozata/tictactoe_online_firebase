import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp} from "@react-navigation/native-stack";
import { StackParams } from "../navigation/stackPramsType";
const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  
export default class ListOfGames extends React.PureComponent {
  
  constructor(props) {
    super(props);
    this.state = {
      listOfGamesState: null,
    };
  }
  joinUser2 = (tableID) => {
    const {currentUser} = auth();
    const {uid} = currentUser;
    const temp = ['', '', '', '', '', '', '', '', ''];
    firestore()
      .collection('listOfGames')
      .doc(tableID)
      .update({
        user2: uid
      })
      .then(() => {
        firestore().collection('markers').doc(tableID).update({
          user2: uid,
          temp: temp,
          sira: 'X'
        }).then(()=>{
          firestore().collection('Users').doc(uid).update({
            user: uid,
            tableID: tableID,
            sira: 'O'
          })
        })
      });
      navigation.navigate('Game')
  };
  componentDidMount() {
    const {currentUser} = auth();
    const {uid} = currentUser;

    firestore()
      .collection('listOfGames')
      .onSnapshot(snapshot => {
        const historiesMap = [];
        snapshot.forEach(doc => {
          historiesMap.push({...doc.data(), ref: doc.ref, id: doc.id});
        });
        historiesMap.sort((a, b) => a.createdAt - b.createdAt);
        this.setState({
          listOfGamesState: historiesMap,
        });
      });
  }
  render() {
    return (
      <View style={styles.container}>
          <FlatList
            data={this.state.listOfGamesState}
            extraData={this.state}
            numColumns={1}
           
            renderItem={({item, index}) => (
              <View style={styles.rowDay2} key={item.id}>
                  <Text style={styles.uidText}> {index+1}</Text>
                  <TouchableOpacity style={styles.button}onPress={() => this.joinUser2(item.id)}>
                    <Text style={styles.buttonText}>Oyuna Katıl</Text>
                  </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.id}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  rowDay2: {
    alignItems: 'center',
    borderBottomColor: '#8E8E93',
    marginBottom: 40,
  
  },
  button:{
    backgroundColor:'blue',
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        padding:10,
        borderRadius:20,
        margin:10,
        width:300,
  },
  buttonText:{
    fontSize:25,
    fontWeight:'bold',
    color:'#fff'
  },
  uidText:{
    fontSize:35,
    fontWeight:'bold',
    color:'red'
  }

});
